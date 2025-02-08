import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectToDB from "./db/dbConnect.js";
import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./config/index.js";
import GoogleSheetService from "./services/googleSheet.service.js";

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception! Shutting down...", { error: err.stack });
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection:", { reason, promise });
});

// Initialize Google Sheets service
const googleSheetService = new GoogleSheetService();

const startServer = async () => {
  try {
    await googleSheetService.init();
    logger.info("Google Sheet API client initialized");

    let retries = 5;
    let delay = 5000;

    while (retries) {
      try {
        await connectToDB();
        break;
      } catch (err) {
        logger.error(`DB Connection Failed! Retries left: ${retries - 1}`);
        retries--;
        await new Promise((res) => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      }
    }

    if (!retries) {
      throw new Error("Database connection failed after multiple attempts");
    }

    const PORT = parseInt(config.PORT, 10) || 8000;
    if (isNaN(PORT)) {
      logger.error("Invalid PORT value in configuration");
      process.exit(1);
    }

    const server = app.listen(PORT, () => {
      logger.info(`SERVER IS RUNNING ON PORT ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      logger.info("Shutting down server...");
      server.close(() => {
        logger.info("Server closed.");
        process.exit(0);
      });

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

// Export instance for reuse in routes
export { googleSheetService };
