import api from './axiosInstance';

const apiRequests = {
    //get
    getMostSelectedCategory: () => api.get('/api/categoryGames/most-selected-category'),

    getExclusiveCategory: () => api.get('/api/category/exclusive-category'),

    getAllCategories: () => api.get('/api/getAllCategories'),

    getCollection: () => api.get('/api/collection'),


    //Post
    postLogin: (data) => api.post('/api/login',data),

    postRegister: (data) => api.post('/api/register',data),
    
    postQuestions: (data) => api.post('/api/questions',data),
    
    postAnswer: (data) => api.post('/api/questions/answer',data),
    
    postPoint: (data) => api.post('/api/games/point',data),
    
    postTotalPoint: (data) => api.post('/api/games/total-point',data),
};

export default apiRequests;
