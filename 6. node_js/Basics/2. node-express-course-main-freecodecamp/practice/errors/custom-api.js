class CustomAPIError extends Error {
    constructor(message) {
        super(message);
    }
}

const createCustomApiError = msg => new CustomAPIError(msg);

module.exports = { CustomAPIError, createCustomApiError };