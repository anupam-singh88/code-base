import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = () => {
    const { state = [], modifyTask, removeTask } = useTaskContext();
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    // useEffect(() => {
    //     fetchTasks();
    // }, []);

    if (state.loading) return <div>Loading...</div>;
    if (state.error) return <div>Error: {state.error}</div>;

    const handleUpdate = async (taskId, updates) => {
        await modifyTask(taskId, updates);
    };

    const handleDelete = async (taskId) => {
        await removeTask(taskId);
    };

    const tasks = state.tasks || [];

    const filteredTasks = tasks
        .filter((task) =>
            task.title.toLowerCase().includes(filter.toLowerCase()) ||
            task.description.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });


    return (
        <div>
            <div className='mb-5'>
                <input
                    type="text"
                    placeholder="Filter tasks"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className='border border-gray-300 rounded-md p-2 w-auto mr-5 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            {filteredTasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
