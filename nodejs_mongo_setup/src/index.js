import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectToDB from "./db/dbConnect.js";
import { connectRedis } from "./utils/redisClient.js"; // Import Redis connection
import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./config/index.js";

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception! Shutting down...", {
    error: err.stack,
  });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection:", { reason, promise });
});

// Constants for retry logic
const MAX_RETRIES = 5;
const INITIAL_RETRY_DELAY = 5000; // 5 seconds

const startServer = async () => {
  try {
    let retries = MAX_RETRIES;
    let delay = INITIAL_RETRY_DELAY;

    // Database connection with retry logic
    while (retries) {
      try {
        await connectToDB();
        // await connectRedis(); // Connect to Redis
        break;
      } catch (err) {
        logger.error(
          `DB or Redis Connection Failed! Retries left: ${retries - 1}`
        );
        retries--;
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      }
    }

    if (!retries) {
      throw new Error(
        "Database or Redis connection failed after multiple attempts"
      );
    }

    // Start the server
    const PORT = parseInt(config.PORT, 10) || 8000;
    if (isNaN(PORT)) {
      logger.error("Invalid PORT value in configuration");
      process.exit(1);
    }

    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      logger.info("Shutting down server...");
      server.close(async () => {
        logger.info("Server closed.");
        await redisClient.quit(); // Close Redis connection
        process.exit(0);
      });

      // Force shutdown if server doesn't close in time
      setTimeout(() => {
        logger.error("Forcing server shutdown...");
        process.exit(1);
      }, 10000); // 10 seconds timeout
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    logger.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
