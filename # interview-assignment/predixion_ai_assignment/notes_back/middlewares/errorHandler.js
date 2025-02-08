const { ValidationError, DatabaseError } = require('../utils/customeError.js');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ValidationError || err instanceof DatabaseError) {
        return res.status(err.statusCode).send(new ApiResponse(err.statusCode, false, err.message));
    }

    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).send(new ApiResponse(400, false, 'Validation error', err.errors.map(error => error.message)));
    }

    if (err.name === 'SequelizeDatabaseError') {
        return res.status(500).send(new ApiResponse(500, false, 'Database error', err.message));
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).send(new ApiResponse(statusCode, false, err.message || 'Internal Server Error'));
};

module.exports = errorHandler;
