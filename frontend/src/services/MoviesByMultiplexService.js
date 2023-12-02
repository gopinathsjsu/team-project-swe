import axios from 'axios';

const NEW_RELEASES_BASE_URL = 'http://localhost:8080/api/movies/multiplex/';

class MoviesByMultiplexService {

    async getMoviesByMultiplex(multiplexId) {
        try {
            const response = await axios.get(`${NEW_RELEASES_BASE_URL}${multiplexId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all movies:', error);
            throw error;
        }
    }
}

export default new MoviesByMultiplexService();
