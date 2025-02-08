import { createClient } from "redis";
import logger from "./logger.js";
import config from "../config/index.js";

const redisClient = createClient({
  url: config.REDIS_URL, // Ensure this is in your .env file
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        logger.error(
          "Too many retries on Redis connection. Connection terminated"
        );
        return new Error("Too many retries");
      }
      return Math.min(retries * 100, 5000); // Exponential backoff with a max of 5 seconds
    },
  },
});

redisClient.on("error", (err) => {
  logger.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
  logger.info("Connected to Redis");
});

redisClient.on("reconnecting", () => {
  logger.info("Reconnecting to Redis...");
});

redisClient.on("end", () => {
  logger.info("Redis connection ended");
});

// Connect to Redis
const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    logger.error("Redis connection failed:", err);
    process.exit(1);
  }
};

export { redisClient, connectRedis };
