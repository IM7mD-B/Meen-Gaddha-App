import api from './axiosInstance';

const apiRequests = {
    //get
    getMostSelectedCategory: () => api.get('/api/categoryGames/most-selected-category'),

    getCollection: () => api.get('/api/collection'),

};

export default apiRequests;
