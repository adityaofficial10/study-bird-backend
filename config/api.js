const axios = require('axios');

const instance = axios.create({
    baseURL:'http://localhost:4000/',
    port: 4000,
    headers:{
        "Content-Type" : 'multipart/form-data'
    }
});

module.exports = instance;