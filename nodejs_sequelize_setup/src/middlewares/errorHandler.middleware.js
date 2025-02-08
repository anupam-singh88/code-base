import createNewApiResponse from "../utils/ApiResposne.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import logger from "../utils/logger.js";

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    logger.error("Global Error: ", {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      userId: req.user?.id || "Unauthenticated",
    });
  }

  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json(
    createNewApiResponse({
      statusCode,
      message,
      data: null,
    })
  );
};

export default errorHandler;
