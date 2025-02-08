import axiosInstance from './axiosConfig';

export const getTasks = async () => {
    const response = await axiosInstance.get('/tasks');
    // console.log("🚀 ~ getTasks ~ response:", response);
    return response.data?.data;
};

export const createTask = async (task) => {
    const response = await axiosInstance.post('/tasks', task);
    return response.data?.data;
};

export const updateTask = async (taskId, task) => {
    const { id, ...updateData } = task;  // Exclude the `id` field
    console.log("🚀 ~ updateTask ~ updateData:", updateData);
    const createPayload = {
        title: updateData?.title,
        description: updateData?.description,
        status: updateData?.status
    }
    const response = await axiosInstance.put(`/tasks/${taskId}`, createPayload);
    return response.data.data;
};

export const deleteTask = async (taskId) => {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response.data?.data;
};
