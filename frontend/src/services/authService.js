import axiosInstance from '../api/axios';

const authService = {
    register: async (data) => {
        const response = await axiosInstance.post('/api/auth/register', data);
        return response.data;
    },

    login: async (data) => {
        const response = await axiosInstance.post('/api/auth/login', data);
        return response.data;
    },

    verifyEmail: async (token) => {
        const response = await axiosInstance.get(`/api/auth/verify-email?token=${token}`);
        return response.data;
    }
};

export default authService;