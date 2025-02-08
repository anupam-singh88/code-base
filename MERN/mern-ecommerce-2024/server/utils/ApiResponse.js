class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.status = statusCode;
        this.success = statusCode >= 200 && statusCode <= 299;
        this.data = data;
        this.message = message;
    }
}

const createApiResponse = (statusCode, data, message) => {
    return new ApiResponse(statusCode, data, message);
};

module.exports = { createApiResponse, ApiResponse };
