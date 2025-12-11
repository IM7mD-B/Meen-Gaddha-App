import api from './axiosInstance';

const apiRequests = {
    //get
    getMostSelectedCategory: () => api.get('/api/categoryGames/most-selected-category'),

    getExclusiveCategory: () => api.get('/api/category/exclusive-category'),

    getAllCategories: () => api.get('/api/getAllCategories'),

    getCollection: () => api.get('/api/collection'),


};

export default apiRequests;
