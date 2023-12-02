import axios from 'axios';
import authHeader from './auth/auth-header';

const UPCOMING_MOVIES_BASE_URL = 'http://localhost:8080/api/movies/getUpcomingMovies';

class UpcomingMoviesService {

    async getAllUpcomingMovies() {
        try {
            const response = await axios.get(`${UPCOMING_MOVIES_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all upcoming movies:', error);
            throw error;
        }
    }

    

}

export default new UpcomingMoviesService();
