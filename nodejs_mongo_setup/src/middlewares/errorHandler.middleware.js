import createNewApiResponse from "../utils/ApiResposne.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import logger from "../utils/logger.js";

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log detailed error information in non-production environments
  if (process.env.NODE_ENV !== "production") {
    logger.error("Global Error: ", {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      userId: req.user?.id || "Unauthenticated",
    });
  } else {
    // In production, just log the error message and status code
    logger.error(
      `Error occurred: ${err.message}, Status Code: ${err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR}`
    );
  }

  // Set default status code to internal server error
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  // Additional custom logic for specific errors
  // (e.g., validation or database errors can have unique status codes or messages)

  return res.status(statusCode).json(
    createNewApiResponse({
      statusCode,
      message,
      data: null,
      errorCode: err.code || "UNKNOWN_ERROR", // Add error code for client-side handling
    })
  );
};

export default errorHandler;
