const CustomAPIError = require("./custom-api");

class UnauthorizedError extends CustomAPIError {
    constructor(message, statusCode = 403) {
        super(message);
        this.statusCode = statusCode;
    }
}

const CreateUnauthorizedError = (message, statusCode) => {
    return new UnauthorizedError(message, statusCode)
}

module.exports = { UnauthorizedError, CreateUnauthorizedError };