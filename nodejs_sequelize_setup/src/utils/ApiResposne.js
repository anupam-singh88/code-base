class ApiResponse {
  constructor({ statusCode, data = null, message = "Success", metadata = {} }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode >= 200 && statusCode < 400;
    this.metadata = metadata;
  }

  static success(data, message = "Success", metadata = {}) {
    return new ApiResponse({ statusCode: 200, data, message, metadata });
  }

  static created(
    data,
    message = "Resource created successfully",
    metadata = {}
  ) {
    return new ApiResponse({ statusCode: 201, data, message, metadata });
  }

  static noContent(message = "No content", metadata = {}) {
    return new ApiResponse({ statusCode: 204, message, metadata });
  }

  static error(
    statusCode,
    message = "An error occurred",
    data = null,
    metadata = {}
  ) {
    if (statusCode < 400 || statusCode > 599) {
      console.warn("Invalid status code for error response:", statusCode);
      statusCode = 500;
    }
    return new ApiResponse({ statusCode, data, message, metadata });
  }
}

const createNewApiResponse = ({ statusCode, data, message, metadata }) => {
  return new ApiResponse({ statusCode, data, message, metadata });
};


export default createNewApiResponse;
