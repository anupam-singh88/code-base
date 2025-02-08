const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('todo', 'in_progress', 'done').required()
});

const updateTaskSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string().valid('todo', 'in_progress', 'done').required()
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};
