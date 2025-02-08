//create a class externding error class for custom error message
class ApiError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

class ValidationError extends ApiError {
    constructor(message) {
        super(message, 400);
    }
}

class DatabaseError extends ApiError {
    constructor(message) {
        super(message, 500);
    }
}
module.exports = {
    ApiError,
    ValidationError,
    DatabaseError
};