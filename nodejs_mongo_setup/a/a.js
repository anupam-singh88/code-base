// redisManager.js
import { createClient } from "redis";
import logger from "./logger.js";

// Configuration constants
const REDIS_CONFIG = {
  url: process.env.REDIS_URL || "redis://localhost:6379",
  password: process.env.REDIS_PASSWORD,
  database: parseInt(process.env.REDIS_DB || "0"),
  socket: {
    connectTimeout: 10000, // Connection timeout in ms
    keepAlive: 5000, // Keep-alive interval in ms
    reconnectStrategy: (retries) => {
      const delay = Math.min(retries * 100, 3000); // Exponential backoff with max delay
      return delay;
    },
  },
  commandsQueueMaxLength: 100, // Limit command queue to prevent memory issues
};

// Connection health check intervals
const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
let healthCheckInterval;

class RedisManager {
  constructor() {
    this.client = createClient(REDIS_CONFIG);
    this.isConnecting = false;
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.client
      .on("error", (err) => {
        logger.error("Redis error:", err);
        this.handleError(err);
      })
      .on("connect", () => {
        logger.info("Redis client connecting");
      })
      .on("ready", () => {
        logger.info("Redis client ready");
        this.startHealthCheck();
      })
      .on("end", () => {
        logger.warn("Redis connection closed");
        this.stopHealthCheck();
      })
      .on("reconnecting", () => {
        logger.info("Redis client reconnecting");
      });
  }

  async connect() {
    if (this.isConnecting) {
      logger.warn("Redis connection already in progress");
      return;
    }

    if (this.client.isOpen) {
      logger.info("Redis client already connected");
      return;
    }

    try {
      this.isConnecting = true;
      await this.client.connect();
    } catch (err) {
      logger.error("Failed to connect to Redis:", err);
      throw err;
    } finally {
      this.isConnecting = false;
    }
  }

  async disconnect() {
    try {
      this.stopHealthCheck();
      await this.client.quit();
      logger.info("Redis client disconnected gracefully");
    } catch (err) {
      logger.error("Error during Redis disconnect:", err);
      throw err;
    }
  }

  handleError(error) {
    // Implement specific error handling based on error types
    if (error.code === "ECONNREFUSED") {
      logger.error(
        "Redis connection refused. Check if Redis server is running."
      );
    } else if (error.code === "ENOTFOUND") {
      logger.error("Redis host not found. Check your Redis URL configuration.");
    } else if (error.code === "ETIMEDOUT") {
      logger.error("Redis connection timed out. Check network connectivity.");
    }
  }

  startHealthCheck() {
    this.stopHealthCheck(); // Clear any existing interval
    healthCheckInterval = setInterval(async () => {
      try {
        const pong = await this.client.ping();
        logger.debug(`Redis health check: ${pong}`);
      } catch (err) {
        logger.error("Redis health check failed:", err);
      }
    }, HEALTH_CHECK_INTERVAL);
    healthCheckInterval.unref(); // Don't prevent app from exiting
  }

  stopHealthCheck() {
    if (healthCheckInterval) {
      clearInterval(healthCheckInterval);
    }
  }

  // Getter for the Redis client instance
  getClient() {
    if (!this.client.isOpen) {
      throw new Error("Redis client is not connected");
    }
    return this.client;
  }

  // Method to check Redis memory usage
  async getMemoryInfo() {
    try {
      const info = await this.client.info("memory");
      logger.info("Redis memory info:", info);
      return info;
    } catch (err) {
      logger.error("Failed to get Redis memory info:", err);
      throw err;
    }
  }
}

// Create singleton instance
const redisManager = new RedisManager();

// Graceful shutdown handler
process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, closing Redis connection...");
  await redisManager.disconnect();
});

export default redisManager;

//app.js
// Initialize Redis connection
const initializeRedis = async () => {
  try {
    await redisManager.connect();
    app.locals.redisClient = redisManager.getClient();
  } catch (err) {
    logger.error("Failed to initialize Redis:", err);
    process.exit(1);
  }
};

//server.js
import { createServer } from "http";
import redisManager from "./utils/redis.js";
import logger from "./utils/logger.js";
import app from "./app.js";
import config from "./config/index.js";
import connectToDB from "./db/dbConnect.js";

// Configuration constants
const SERVER_CONFIG = {
  MAX_RETRIES: 5,
  INITIAL_RETRY_DELAY: 1000,
  SHUTDOWN_TIMEOUT: 10000,
  HEALTH_CHECK_INTERVAL: 30000,
  KEEP_ALIVE_TIMEOUT: 65000, // Slightly higher than ELB's default 60s
};

class ServerManager {
  constructor() {
    this.isShuttingDown = false;
    this.healthCheckInterval = null;
    this.connections = new Set();
  }

  async retryConnection(connectionFn, options = {}) {
    const {
      retries = SERVER_CONFIG.MAX_RETRIES,
      delay = SERVER_CONFIG.INITIAL_RETRY_DELAY,
      service = connectionFn.name,
    } = options;

    let currentDelay = delay;
    let attemptsLeft = retries;

    while (attemptsLeft) {
      try {
        await connectionFn();
        logger.info(`Successfully connected to ${service}`);
        return true;
      } catch (err) {
        attemptsLeft--;
        logger.error(
          `${service} connection failed! Retries left: ${attemptsLeft}`,
          err
        );

        if (!attemptsLeft) {
          throw new Error(
            `${service} connection failed after ${retries} attempts`
          );
        }

        logger.info(`Retrying ${service} connection in ${currentDelay}ms...`);
        await new Promise((res) => setTimeout(res, currentDelay));
        currentDelay *= 2; // Exponential backoff
      }
    }
  }

  setupServer(port) {
    const server = createServer(app);

    // Configure keep-alive timeout
    server.keepAliveTimeout = SERVER_CONFIG.KEEP_ALIVE_TIMEOUT;
    server.headersTimeout = SERVER_CONFIG.KEEP_ALIVE_TIMEOUT + 1000;

    // Track all connections
    server.on("connection", (connection) => {
      this.connections.add(connection);
      connection.on("close", () => this.connections.delete(connection));
    });

    return new Promise((resolve, reject) => {
      server.listen(port, () => {
        logger.info(`Server running on port ${port}`);
        this.startHealthCheck();
        resolve(server);
      });

      server.on("error", (error) => {
        if (error.code === "EADDRINUSE") {
          logger.error(`Port ${port} is already in use`);
        }
        reject(error);
      });
    });
  }

  startHealthCheck() {
    this.healthCheckInterval = setInterval(() => {
      this.checkHealth().catch((err) =>
        logger.error("Health check failed:", err)
      );
    }, SERVER_CONFIG.HEALTH_CHECK_INTERVAL);

    this.healthCheckInterval.unref(); // Don't prevent app from exiting
  }

  async checkHealth() {
    try {
      const redisHealth = await redisManager.getClient().ping();
      // Add more health checks as needed (DB, external services, etc.)
      logger.debug("Health check passed:", { redis: redisHealth === "PONG" });
    } catch (error) {
      logger.error("Health check failed:", error);
      throw error;
    }
  }

  async shutdown(signal) {
    if (this.isShuttingDown) {
      logger.info("Shutdown already in progress...");
      return;
    }

    this.isShuttingDown = true;
    logger.info(`${signal} received. Starting graceful shutdown...`);

    // Clear health check interval
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }

    // Create a shutdown timeout
    const shutdownTimeout = setTimeout(() => {
      logger.error("Forced shutdown due to timeout");
      process.exit(1);
    }, SERVER_CONFIG.SHUTDOWN_TIMEOUT);

    try {
      // Close all existing connections
      for (const connection of this.connections) {
        connection.end();
      }

      // Close Redis connection
      await redisManager.disconnect();
      logger.info("Redis disconnected");

      // Close database connection (assuming it returns a promise)
      await connectToDB.disconnect?.();
      logger.info("Database disconnected");

      // Clear the timeout and exit gracefully
      clearTimeout(shutdownTimeout);
      logger.info("Graceful shutdown completed");
      process.exit(0);
    } catch (error) {
      logger.error("Error during shutdown:", error);
      process.exit(1);
    }
  }
}

// Server initialization
const startServer = async () => {
  const serverManager = new ServerManager();

  try {
    // Validate port
    const PORT = Number(config.PORT) || 8000;
    if (isNaN(PORT)) {
      throw new Error("Invalid PORT value in configuration");
    }

    // Initialize services
    await serverManager.retryConnection(() => redisManager.connect(), {
      service: "Redis",
    });
    await serverManager.retryConnection(connectToDB, { service: "Database" });

    // Start server
    const server = await serverManager.setupServer(PORT);

    // Handle shutdown signals
    const shutdownHandler = (signal) => serverManager.shutdown(signal);
    process.on("SIGTERM", shutdownHandler);
    process.on("SIGINT", shutdownHandler);

    // Handle uncaught errors
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception:", error);
      serverManager.shutdown("UNCAUGHT_EXCEPTION");
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
      serverManager.shutdown("UNHANDLED_REJECTION");
    });

    return server;
  } catch (error) {
    logger.error("Fatal error during server startup:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// export default startServer;

//cache.middleware.js
import logger from "../utils/logger.js";
import redisManager from "../utils/redis.js";

// Cache configuration
const CACHE_CONFIG = {
  DEFAULT_TTL: 3600, // 1 hour in seconds
  MAX_KEY_LENGTH: 256,
  MAX_VALUE_SIZE: 1024 * 1024, // 1MB
  EXCLUDED_PATHS: ["/auth", "/webhook", "/health"],
  EXCLUDED_QUERY_PARAMS: ["timestamp", "nonce", "signature"],
  EXCLUDED_BODY_FIELDS: ["password", "token", "secret"],
};

class CacheMiddleware {
  constructor(options = {}) {
    this.ttl = options.ttl || CACHE_CONFIG.DEFAULT_TTL;
    this.keyPrefix = options.keyPrefix || "cache:";
    this.excludedPaths = options.excludedPaths || CACHE_CONFIG.EXCLUDED_PATHS;
    this.excludedQueryParams =
      options.excludedQueryParams || CACHE_CONFIG.EXCLUDED_QUERY_PARAMS;
    this.excludedBodyFields =
      options.excludedBodyFields || CACHE_CONFIG.EXCLUDED_BODY_FIELDS;
  }

  shouldCache(req) {
    // Don't cache if path is excluded
    if (this.excludedPaths.some((path) => req.path.startsWith(path))) {
      return false;
    }

    // Don't cache non-GET methods by default
    if (req.method !== "GET") {
      return false;
    }

    // Don't cache if Cache-Control header indicates no-cache
    const cacheControl = req.headers["cache-control"];
    if (
      cacheControl &&
      (cacheControl.includes("no-cache") || cacheControl.includes("no-store"))
    ) {
      return false;
    }

    return true;
  }

  generateCacheKey(req) {
    try {
      const { originalUrl, method, query, body } = req;

      // Filter out excluded query parameters
      const filteredQuery = { ...query };
      this.excludedQueryParams.forEach((param) => delete filteredQuery[param]);

      // Filter out excluded body fields
      const filteredBody = { ...body };
      this.excludedBodyFields.forEach((field) => delete filteredBody[field]);

      // Create base key components
      const keyComponents = [
        this.keyPrefix,
        method,
        originalUrl.split("?")[0], // Base URL without query params
        Object.keys(filteredQuery).length > 0
          ? JSON.stringify(filteredQuery)
          : "",
        Object.keys(filteredBody).length > 0
          ? JSON.stringify(filteredBody)
          : "",
      ];

      // Join and hash if necessary
      let key = keyComponents.filter(Boolean).join(":");

      // Ensure key doesn't exceed max length
      if (key.length > CACHE_CONFIG.MAX_KEY_LENGTH) {
        const crypto = require("crypto");
        key = crypto.createHash("sha256").update(key).digest("hex");
      }

      return key;
    } catch (error) {
      logger.error("Error generating cache key:", error);
      return null;
    }
  }

  async getCachedResponse(key) {
    try {
      const client = redisManager.getClient();
      const data = await client.get(key);

      if (!data) return null;

      try {
        return {
          data: JSON.parse(data),
          metadata: {
            hit: true,
            key,
            timestamp: Date.now(),
          },
        };
      } catch (parseError) {
        logger.error("Error parsing cached data:", parseError);
        await client.del(key); // Remove invalid cached data
        return null;
      }
    } catch (error) {
      logger.error("Error fetching from cache:", error);
      return null;
    }
  }

  async setCachedResponse(key, value, customTTL) {
    try {
      const client = redisManager.getClient();
      const stringValue = JSON.stringify(value);

      // Check value size
      if (stringValue.length > CACHE_CONFIG.MAX_VALUE_SIZE) {
        logger.warn(`Cache value exceeds size limit for key: ${key}`);
        return false;
      }

      await client.set(key, stringValue, {
        EX: customTTL || this.ttl,
        NX: true, // Only set if key doesn't exist
      });

      return true;
    } catch (error) {
      logger.error("Error setting cache:", error);
      return false;
    }
  }

  middleware() {
    return async (req, res, next) => {
      // Skip caching if conditions aren't met
      if (!this.shouldCache(req)) {
        return next();
      }

      const cacheKey = this.generateCacheKey(req);
      if (!cacheKey) {
        return next();
      }

      try {
        // Try to get cached response
        const cachedResponse = await this.getCachedResponse(cacheKey);

        if (cachedResponse) {
          // Set cache headers
          res.setHeader("X-Cache", "HIT");
          res.setHeader("X-Cache-Key", cacheKey);
          return res.json(cachedResponse.data);
        }

        // Cache miss - modify response
        const originalJson = res.json;
        res.json = async (body) => {
          // Restore original json method
          res.json = originalJson;

          // Set cache headers
          res.setHeader("X-Cache", "MISS");
          res.setHeader("X-Cache-Key", cacheKey);

          // Cache the response
          await this.setCachedResponse(cacheKey, body);

          // Send response
          return res.json(body);
        };

        next();
      } catch (error) {
        logger.error("Cache middleware error:", error);
        // Fail gracefully - continue without caching
        next();
      }
    };
  }

  // Utility method to clear cache
  async clearCache(pattern = "*") {
    try {
      const client = redisManager.getClient();
      const keys = await client.keys(`${this.keyPrefix}${pattern}`);

      if (keys.length > 0) {
        await client.del(keys);
        logger.info(`Cleared ${keys.length} cache entries`);
      }

      return keys.length;
    } catch (error) {
      logger.error("Error clearing cache:", error);
      throw error;
    }
  }
}

// Create middleware instance with default options
const cacheMiddleware = new CacheMiddleware();

// Export both the class and default instance
export { CacheMiddleware, cacheMiddleware };

// Export default middleware function
export default (options) => {
  if (options) {
    const customCache = new CacheMiddleware(options);
    return customCache.middleware();
  }
  return cacheMiddleware.middleware();
};


//usage
// Basic usage
import cache from "./cache-middleware.js";
app.use(cache());

// Custom configuration
app.use(
  cache({
    ttl: 1800, // 30 minutes
    keyPrefix: "api:cache:",
    excludedPaths: ["/private", "/admin"],
    excludedQueryParams: ["token"],
    excludedBodyFields: ["password"],
  })
);

// Using the class directly
import { CacheMiddleware } from "./cache-middleware.js";
const customCache = new CacheMiddleware({
  ttl: 3600,
});

// Clear cache programmatically
await customCache.clearCache("users:*");

import { Router } from "express";
import userRouter from "./user.routes.js";
import { CacheMiddleware } from "../../middlewares/cache.middleware.js";

// Create custom cache configurations for different routes
const cacheMiddleware = new CacheMiddleware({
  routes: {
    users: {
      ttl: 1800, // 30 minutes for user routes
      excludedPaths: [
        "/users/login",
        "/users/logout",
        "/users/register",
        "/users/profile/update",
      ],
      // Only cache GET requests for specific paths
      includedPaths: [
        "/users/profile",
        "/users/settings",
        "/users/preferences",
      ],
    },
  },
});

// Create router instance
const v1Router = Router();

// Health check route (no cache)
v1Router.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API Documentation route (long cache)
v1Router.get(
  "/docs",
  cacheMiddleware.routeCache({ ttl: 86400 }), // 24 hours
  (req, res) => {
    res.json({
      /* API documentation */
    });
  }
);

// User routes with custom cache configuration
v1Router.use("/users", cacheMiddleware.routeCache(), userRouter);

// Error handling for router
v1Router.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid JSON payload",
    });
  }
  next(err);
});

// export default v1Router;
