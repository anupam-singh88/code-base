import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://predixionai-notes-backend.onrender.com/api', // Replace with your backend API base URL
    // baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
