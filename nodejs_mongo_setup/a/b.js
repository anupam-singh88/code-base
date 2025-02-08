import { createClient } from "redis";
import logger from "./logger.js";
import Joi from "joi";

// Redis configuration schema
const redisConfigSchema = Joi.object({
  url: Joi.string().uri().required(),
  password: Joi.string().optional(),
  database: Joi.number().default(0),
  socket: Joi.object({
    connectTimeout: Joi.number().default(10000),
    keepAlive: Joi.number().default(5000),
    reconnectStrategy: Joi.function().default((retries) =>
      Math.min(retries * 100, 3000)
    ),
  }).default(),
  commandsQueueMaxLength: Joi.number().default(100),
});

// Validate and load Redis configuration
const REDIS_CONFIG = {
  url: process.env.REDIS_URL || "redis://localhost:6379",
  password: process.env.REDIS_PASSWORD,
  database: parseInt(process.env.REDIS_DB || "0"),
  socket: {
    connectTimeout: 10000,
    keepAlive: 5000,
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
  commandsQueueMaxLength: 100,
};

const { error } = redisConfigSchema.validate(REDIS_CONFIG);
if (error) {
  throw new Error(`Invalid Redis configuration: ${error.message}`);
}

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

  getClient() {
    if (!this.client.isOpen) {
      throw new Error("Redis client is not connected");
    }
    return this.client;
  }

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

  async acquireLock(key, ttl = 10000) {
    try {
      const result = await this.client.set(key, "locked", {
        NX: true,
        EX: ttl,
      });
      return result === "OK";
    } catch (err) {
      logger.error("Error acquiring lock:", err);
      throw err;
    }
  }

  async releaseLock(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      logger.error("Error releasing lock:", err);
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



// ****************************
import logger from "../utils/logger.js";
import redisManager from "../utils/redis.js";
import crypto from "crypto";

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
    this.excludedQueryParams = options.excludedQueryParams || CACHE_CONFIG.EXCLUDED_QUERY_PARAMS;
    this.excludedBodyFields = options.excludedBodyFields || CACHE_CONFIG.EXCLUDED_BODY_FIELDS;
  }

  shouldCache(req) {
    if (this.excludedPaths.some((path) => req.path.startsWith(path))) {
      return false;
    }

    if (req.method !== "GET") {
      return false;
    }

    const cacheControl = req.headers["cache-control"];
    if (cacheControl && (cacheControl.includes("no-cache") || cacheControl.includes("no-store"))) {
      return false;
    }

    return true;
  }

  generateCacheKey(req) {
    try {
      const { originalUrl, method, query, body } = req;

      const filteredQuery = { ...query };
      this.excludedQueryParams.forEach((param) => delete filteredQuery[param]);

      const filteredBody = { ...body };
      this.excludedBodyFields.forEach((field) => delete filteredBody[field]);

      const hash = crypto.createHash("sha256");
      hash.update(JSON.stringify({
        url: originalUrl.split("?")[0],
        method,
        query: filteredQuery,
        body: filteredBody,
      }));

      const key = `${this.keyPrefix}${hash.digest("hex")}`;
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
        await client.del(key);
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

      if (stringValue.length > CACHE_CONFIG.MAX_VALUE_SIZE) {
        logger.warn(`Cache value exceeds size limit for key: ${key}`);
        return false;
      }

      await client.set(key, stringValue, {
        EX: customTTL || this.ttl,
        NX: true,
      });

      return true;
    } catch (error) {
      logger.error("Error setting cache:", error);
      return false;
    }
  }

  middleware() {
    return async (req, res, next) => {
      if (!this.shouldCache(req)) {
        return next();
      }

      const cacheKey = this.generateCacheKey(req);
      if (!cacheKey) {
        return next();
      }

      try {
        const cachedResponse = await this.getCachedResponse(cacheKey);

        if (cachedResponse) {
          res.setHeader("X-Cache", "HIT");
          res.setHeader("X-Cache-Key", cacheKey);
          return res.json(cachedResponse.data);
        }

        const originalJson = res.json;
        res.json = async (body) => {
          res.json = originalJson;
          res.setHeader("X-Cache", "MISS");
          res.setHeader("X-Cache-Key", cacheKey);
          await this.setCachedResponse(cacheKey, body);
          return res.json(body);
        };

        next();
      } catch (error) {
        logger.error("Cache middleware error:", error);
        next();
      }
    };
  }

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


//middleware
import express from "express";
import cacheMiddleware from "./middlewares/cache.middleware.js";

const app = express();

// Apply caching middleware
app.use(cacheMiddleware());

// Example route
app.get("/api/data", (req, res) => {
  res.json({ message: "This response is cached!" });
});

export default app;


//server.js
import { createServer } from "http";
import redisManager from "./utils/redisManager.js";
import logger from "./utils/logger.js";
import app from "./app.js";
import config from "./config/index.js";
import connectToDB from "./db/dbConnect.js";

const startServer = async () => {
  try {
    // Initialize Redis
    await redisManager.connect();

    // Start the server
    const PORT = config.PORT || 8000;
    const server = createServer(app);

    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down server...");
      await redisManager.disconnect();
      server.close(() => {
        logger.info("Server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    logger.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();