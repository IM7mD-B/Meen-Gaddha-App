import api from './axiosInstance';

const apiRequests = {
    //get
    getMostSelectedCategory: () => api.get('/api/categoryGames/most-selected-category'),

    getExclusiveCategory: () => api.get('/api/category/exclusive-category'),

    getAllCategories: () => api.get('/api/getAllCategories'),

    getCollection: () => api.get('/api/collection'),

    getProfile: () => api.get('/api/profile'),


    //Post
    postLogin: (data) => api.post('/api/login',data),

    postRegister: (data) => api.post('/api/register',data),

    postCreationGroup: (data) => api.post('/api/group/creation-group',data),

};

export default apiRequests;
