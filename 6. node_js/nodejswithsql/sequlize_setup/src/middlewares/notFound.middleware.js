import ApiError from "../utils/ApiError.js";
import { HTTP_STATUS } from "../utils/httpStatus.js";
import logger from "../utils/logger.js"; 

// Middleware to handle not found routes
const notFoundHandler = (req, res, next) => {
  logger.warn(`Not Found: ${req.method} ${req.originalUrl}`);

  const error = new ApiError({
    statusCode: HTTP_STATUS.NOT_FOUND,
    message: `Route not found: ${req.originalUrl}`,
  });

  next(error); 
};

export default notFoundHandler;
