import api from './axiosInstance';

const apiRequests = {
    //get
    getMostSelectedCategory: () => api.get('/api/categoryGames/most-selected-category'),

    getExclusiveCategory: () => api.get('/api/category/exclusive-category'),

    getCollection: () => api.get('/api/collection'),


    //Post
    postLogin: (data) => api.post('/api/login',data),

    postRegister: (data) => api.post('/api/register',data),

};

export default apiRequests;