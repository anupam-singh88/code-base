import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskForm = () => {
    const { addTask } = useTaskContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask({ title, description, status });
        setTitle('');
        setDescription('');
        setStatus('todo');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
            >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
            </select>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Add Task</button>
        </form>
    );
};

export default TaskForm;
