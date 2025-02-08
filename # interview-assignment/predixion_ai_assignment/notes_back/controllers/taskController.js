const { Task } = require('../models');
const asyncHandler = require('../utils/asncHandler.js');
const { ValidationError, DatabaseError } = require('../utils/customeError.js');
const { createTaskSchema, updateTaskSchema } = require('../utils/validationSchemas.js');
const ApiResponse = require('../middlewares/ApiResponse');

exports.getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    if (tasks.length === 0) {
        return res.status(200).send(new ApiResponse(200, false, 'No Tasks Found! Please Add Some!!'));
    }
    return res.status(200).send(new ApiResponse(200, true, 'Tasks Found', tasks));
});

exports.createTask = asyncHandler(async (req, res) => {
    const { error } = createTaskSchema.validate(req.body);
    if (error) {
        throw new ValidationError(error.details[0].message);
    }

    const { title, description, status } = req.body;



    try {
        const task = await Task.create({ title, description, status });
        return res.status(201).send(new ApiResponse(201, true, 'Task Created', task));
    } catch (err) {
        throw new DatabaseError('Error creating task');
    }
});

exports.updateTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { error } = updateTaskSchema.validate(req.body);
    if (error) {
        throw new ValidationError(error.details[0].message);
    }

    const { status, title, description } = req.body;
    const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).send(new ApiResponse(404, false, 'Task Not Found!'));
    }

    task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;

    try {
        await task.save();
        return res.status(200).send(new ApiResponse(200, true, 'Task Updated', task));
    } catch (err) {
        throw new DatabaseError('Error updating task');
    }
});

exports.deleteTask = asyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);

    if (!task) {
        return res.status(404).send(new ApiResponse(404, false, 'Task Not Found!'));
    }

    try {
        await task.destroy();
        return res.status(200).send(new ApiResponse(200, true, 'Task Deleted'));
    } catch (err) {
        throw new DatabaseError('Error deleting task');
    }
});
