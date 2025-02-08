import ApiError from "./custom-error.js";

class UnAuthenticatedError extends ApiError {
    constructor(message = "Unauthenticated", errors = []) {
        super(403, message, errors)
    }
}


const createUnAuthenticatedError = (message, errors) => {
    return new UnAuthenticatedError(message, errors)
}

export { createUnAuthenticatedError }

export default UnAuthenticatedError;