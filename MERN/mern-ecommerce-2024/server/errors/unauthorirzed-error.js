const { ApiError } = require("./custom-error.js");

class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized Error", errors = []) {
        super(401, message, errors);
    }
}

const createUnauthorizedError = (message, errors) => {
    return new UnauthorizedError(message, errors);
};

module.exports = {
    createUnauthorizedError
};
