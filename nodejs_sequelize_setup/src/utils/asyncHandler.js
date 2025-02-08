import logger from "../utils/logger.js"; 

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      if (process.env.NODE_ENV === "development") {
        logger.error("AsyncHandler Error:", {
          message: error.message,
          stack: error.stack,
        });
      } else {
        logger.error("AsyncHandler Error:", {
          message: error.message,
          stack: error.stack,
        }); 
      }
      next(error); 
    });
  };
};

export default asyncHandler;
