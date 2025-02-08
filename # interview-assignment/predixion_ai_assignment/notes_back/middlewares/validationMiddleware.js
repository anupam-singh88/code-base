const { createTaskSchema, updateTaskSchema } = require('../utils/validationSchemas');
const ApiResponse = require('./ApiResponse');
const { ValidationError } = require('../utils/customeError');

const validateCreateTask = (req, res, next) => {
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).send(new ApiResponse(400, false, error.details[0].message));
    }
    next();
};

const validateUpdateTask = (req, res, next) => {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).send(new ApiResponse(400, false, error.details[0].message));
    }
    next();
};

module.exports = {
    validateCreateTask,
    validateUpdateTask
};
