const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { validateCreateTask, validateUpdateTask } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', validateCreateTask, createTask);
router.put('/tasks/:taskId', validateUpdateTask, updateTask);
router.delete('/tasks/:taskId', deleteTask);

module.exports = router;
