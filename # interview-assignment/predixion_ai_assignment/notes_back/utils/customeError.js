class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class DatabaseError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}

module.exports = {
    CustomError,
    ValidationError,
    DatabaseError
};
