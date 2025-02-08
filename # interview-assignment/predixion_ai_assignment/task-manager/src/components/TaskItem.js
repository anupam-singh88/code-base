import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
    const { removeTask, modifyTask } = useTaskContext();

    const handleDelete = () => {
        removeTask(task.id);
    };

    const handleUpdateStatus = () => {
        const newStatus = task.status === 'todo' ? 'in_progress' : 'done';
        modifyTask(task.id, { ...task, status: newStatus });
    };

    return (
        <div className="p-4 border border-gray-300 rounded mb-2 flex justify-between items-center">
            <div>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <span className={`badge ${task.status}`}>{task.status}</span>
            </div>
            <div className="space-x-2">
                {/* <button onClick={editTask} className="p-2 bg-green-500 text-white rounded">Edit Task</button> */}
                <button onClick={handleUpdateStatus} className="p-2 bg-green-500 text-white rounded">Update Status</button>
                <button onClick={handleDelete} className="p-2 bg-red-500 text-white rounded">Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
