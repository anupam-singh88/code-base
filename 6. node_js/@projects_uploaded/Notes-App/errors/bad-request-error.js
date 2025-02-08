import ApiError from "./custom-error.js";

class BadRequestError extends ApiError {
    constructor(message = "Bad Request", errors = []) {
        super(400, message, errors)
    }
}

const createBadRequestError = (message, errors = []) => {
    return new BadRequestError(message, errors)
}

export { createBadRequestError }

export default BadRequestError;