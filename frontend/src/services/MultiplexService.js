import axios from 'axios';

const MULTIPLEXES_BASE_URL = 'http://localhost:8080/api/multiplexes';

class MoviesService {

    async getMultiplexesByLocationId(locationId) {
        try {
            const response = await axios.get(`${MULTIPLEXES_BASE_URL}/get/${locationId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching multiplexes:', error);
            throw error; 
        }
    };

}

export default new MoviesService();
