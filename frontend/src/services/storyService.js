import axiosInstance from '../api/axios';

const storyService = {
    getAllStories: async (page = 1, limit = 10) => {
        const response = await axiosInstance.get(`/api/stories?page=${page}&limit=${limit}`);
        return response.data;
    },

    getStoryById: async (id) => {
        const response = await axiosInstance.get(`/api/stories/${id}`);
        return response.data;
    },

    toggleBookmark: async (id) => {
        const response = await axiosInstance.post(`/api/stories/${id}/bookmark`);
        return response.data;
    },

    triggerScrape: async () => {
        const response = await axiosInstance.post('/api/scrape');
        return response.data;
    },
};

export default storyService;