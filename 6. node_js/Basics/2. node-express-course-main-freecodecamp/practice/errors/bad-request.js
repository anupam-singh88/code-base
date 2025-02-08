const CustomAPIError = require("./custom-api.js");

class BadRequestError extends CustomAPIError {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createBadRequestError = (message, statusCode) => {
    return new BadRequestError(message, statusCode)
}

module.exports = { BadRequestError, createBadRequestError };