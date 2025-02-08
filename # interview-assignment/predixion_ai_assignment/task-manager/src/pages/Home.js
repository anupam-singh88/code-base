import React, { Suspense } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const Home = () => {


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
                <TaskForm />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-2">Task List</h2>
                <Suspense fallback={<div>Loading tasks...</div>}>
                    <TaskList />
                </Suspense>
            </div>
        </div>
    );
};

export default Home;
