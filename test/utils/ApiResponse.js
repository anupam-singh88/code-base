class ApiResponse {
  constructor({ message, data, statusCode }) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}

const createApiResponse = ({ message, data, statusCode }) => {
  return new ApiResponse({ message, data, statusCode });
};

module.exports = { ApiResponse, createApiResponse };
