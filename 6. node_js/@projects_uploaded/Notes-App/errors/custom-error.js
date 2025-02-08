class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            data: this.data,
            message: this.message,
            success: this.success,
            errors: this.errors,
        };
    }
}

const createCustomApiError = (statusCode, message, errors = []) => {
    return new ApiError(statusCode, message, errors);
}

export { createCustomApiError };

export default ApiError;