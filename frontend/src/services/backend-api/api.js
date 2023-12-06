import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.TEAM_SWE_BACKEND_API_URL,
    timeout: 10000, // requests can take up to 10 seconds before timing out
});

instance.interceptors.request.use((config) => {
    config.url = config.url.replace(/\/+$/, ''); // removing trailing slash causing 404
    return config;
});

export default instance;