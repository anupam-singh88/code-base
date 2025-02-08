import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskApi';

const TaskContext = createContext();

const initialState = {
    tasks: [],
    loading: false,
    error: null,
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_TASKS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_TASKS_SUCCESS':
            return { ...state, loading: false, tasks: action.payload };
        case 'FETCH_TASKS_FAILURE':
            return { ...state, loading: false, error: action.payload, tasks: [] };
        case 'CREATE_TASK':
            return { ...state, tasks: [...(state.tasks || []), action.payload] };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: (state.tasks || []).map((task) =>
                    task.id === action.payload.id ? action.payload : task
                ),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: (state.tasks || []).filter((task) => task.id !== action.payload),
            };
        default:
            return state;
    }
};


export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const [edit, setEdit] = useState(true)

    const fetchTasks = async () => {
        dispatch({ type: 'FETCH_TASKS_REQUEST' });
        try {
            const data = await getTasks();
            dispatch({ type: 'FETCH_TASKS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_TASKS_FAILURE', payload: error.message });
        }
    };

    const addTask = async (task) => {
        dispatch({ type: 'CREATE_TASK_REQUEST' });
        try {
            const newTask = await createTask(task);
            dispatch({ type: 'CREATE_TASK', payload: newTask });
        } catch (error) {
            dispatch({ type: 'CREATE_TASK_FAILURE', payload: error.message });
        }
    };

    const modifyTask = async (taskId, task) => {
        try {
            const updatedTask = await updateTask(taskId, task);
            dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
        } catch (error) {
            dispatch({ type: 'UPDATE_TASK_FAILURE', payload: error.message });
        }
    };

    const removeTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            dispatch({ type: 'DELETE_TASK', payload: taskId });
        } catch (error) {
            dispatch({ type: 'DELETE_TASK_FAILURE', payload: error.message });
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ state, fetchTasks, addTask, modifyTask, removeTask, edit, setEdit }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => useContext(TaskContext);
