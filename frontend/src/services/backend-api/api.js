import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.TEAM_SWE_BACKEND_API_URL,
    timeout: 10000, // requests can take up to 10 seconds before timing out
});

export default instance;
