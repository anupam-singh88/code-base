import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Determine log level based on environment
const logLevel = process.env.NODE_ENV === "production" ? "info" : "debug";

// Create a logger instance
const logger = winston.createLogger({
  level: logLevel, // Set log level based on environment
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, ...meta }) => {
      let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
      if (Object.keys(meta).length) {
        logMessage += ` ${JSON.stringify(meta)}`;
      }
      return logMessage;
    })
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),

    // File transport for production logs with log rotation
    new DailyRotateFile({
      filename: "logs/%DATE%-server.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// // Example usage of the logger
// logger.info("This is an info message");
// logger.error(new Error("This is an error message"));
// logger.warn("This is a warning message");
// logger.debug("This is a debug message");

// // You can also log with additional metadata
// logger.info("User login successful", { userId: 12345, ip: "192.168.0.1" });

export default logger;
