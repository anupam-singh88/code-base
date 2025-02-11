const asyncHandler = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log("🚀 ~ return ~ error:", error);
      next(error); // Pass the error to Express error handling middleware
    }
  };
};

module.exports = asyncHandler;
