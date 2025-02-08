import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectToDB from "./db/dbConnect.js";
import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./config/index.js";

const startServer = async () => {
  try {
    let retries = 5;
    while (retries) {
      try {
        await connectToDB();
        break;
      } catch (err) {
        logger.error(`DB Connection Failed! Retries left: ${retries - 1}`);
        retries--;
        await new Promise((res) => setTimeout(res, 5000));
      }
    }
    if (!retries)
      throw new Error("Database connection failed after multiple attempts");

    const PORT = config.PORT || 8000;
    const server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

    const shutdown = () => {
      logger.info("Shutting down server...");
      server.close(() => {
        logger.info("Server closed.");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
    process.on("uncaughtException", (err) => {
      logger.error("Uncaught Exception! Shutting down...", err);
      process.exit(1);
    });

    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Promise Rejection:", reason);
    });
  } catch (error) {
    logger.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
