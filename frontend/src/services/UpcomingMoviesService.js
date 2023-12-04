import axios from 'axios';
import authHeader from './auth/auth-header';

import api from './backend-api/api';

// const UPCOMING_MOVIES_BASE_URL = '/api/movies/getUpcomingMovies';

class UpcomingMoviesService {

    async getAllUpcomingMovies() {
        try {
            const response = await api.get(`api/movies/getUpcomingMovies`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all upcoming movies:', error);
            throw error;
        }
    }

    

}

export default new UpcomingMoviesService();
