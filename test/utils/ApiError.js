class ApiError extends Error {
  constructor({ message, data, statusCode, error }) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
  }
  toJSON() {
    return {
      msg: this.message,
    };
  }
}

const createApiErr = ({ message, data, statusCode, error }) => {
  return new ApiError({ message, data, statusCode, error });
};

module.exports = { ApiError, createApiErr };
