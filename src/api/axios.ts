// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3003', // Adjust if your backend uses a different port
});

// Automatically attach Authorization header with token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
