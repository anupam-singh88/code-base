const { CustomAPIError } = require("./custom-api");

class NotFoundError extends CustomAPIError {
    constructor(message, statusCode = 404) {
        super(message);
        this.statusCode = statusCode;
    }
}
const createNotFoundError = (message, statusCode) => {
    return new NotFoundError(message, statusCode);
}

module.exports = { createNotFoundError, NotFoundError }