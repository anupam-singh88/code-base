class ApiError extends Error {
  constructor({
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack,
    data = null,
    success = false,
  }) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.data = data;
    this.success = success;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
      data: this.data,
      ...(process.env.NODE_ENV === "development" && { stack: this.stack }),
    };
  }

  static badRequest(message = "Bad Request", errors = []) {
    return new ApiError({ statusCode: 400, message, errors });
  }

  static unauthorized(message = "Unauthorized", errors = []) {
    return new ApiError({ statusCode: 401, message, errors });
  }

  static forbidden(message = "Forbidden", errors = []) {
    return new ApiError({ statusCode: 403, message, errors });
  }

  static notFound(message = "Resource not found", errors = []) {
    return new ApiError({ statusCode: 404, message, errors });
  }

  static internal(message = "Internal Server Error", errors = []) {
    return new ApiError({ statusCode: 500, message, errors });
  }

  // Log error details for debugging or error monitoring
  logError() {
    console.error(`[${this.statusCode}] ${this.message}:`, this.errors);
    if (this.stack) {
      console.error(this.stack);
    }
  }
}

export default ApiError;
