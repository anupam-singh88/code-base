const { createApiErr } = require("../utils/ApiError");

const globalErrorHandler = (err, req, res, next) => {
  console.error("🚀 ~ globalErrorHandler ~ err:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  return res.status(statusCode).json(
    createApiErr({
      message,
      statusCode,
    })
  );
};

module.exports = globalErrorHandler;
