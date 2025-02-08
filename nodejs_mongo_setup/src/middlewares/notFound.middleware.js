import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import logger from "../utils/logger.js";

// Middleware to handle 404 (Not Found) errors
const notFoundHandler = (req, res, next) => {
  logger.warn(`Not Found: ${req.method} ${req.originalUrl} from ${req.ip}`, {
    headers: req.headers, // Optionally log request headers
  });

  next(
    new ApiError({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: `Route not found: ${req.originalUrl}`,
    })
  );
};

export default notFoundHandler;
