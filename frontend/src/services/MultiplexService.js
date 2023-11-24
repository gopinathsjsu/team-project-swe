import axios from 'axios';
import authHeader from './auth/auth-header';

const MULTIPLEXES_BASE_URL = 'http://localhost:8080/api/multiplexes';

class MoviesService {

    async getMultiplexesByLocationId(locationId) {
        try {
            const response = await axios.get(`${MULTIPLEXES_BASE_URL}/get/${locationId}`, { headers: authHeader() });
            return response.data;
        } catch (error) {
            console.error('Error fetching multiplexes:', error);
            throw error; 
        }
    };

}

export default new MoviesService();
