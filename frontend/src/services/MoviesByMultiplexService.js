import api from './backend-api/api';

const NEW_RELEASES_BASE_URL = 'api/movies/multiplex/';

class MoviesByMultiplexService {

    async getMoviesByMultiplex(multiplexId) {
        try {
            const response = await api.get(`${NEW_RELEASES_BASE_URL}${multiplexId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all movies:', error);
            throw error;
        }
    }
}

export default new MoviesByMultiplexService();
