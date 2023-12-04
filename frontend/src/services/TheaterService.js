import api from './backend-api/api';
import authHeader from '../services/auth/auth-header';

const THEATER_BASE_URL = '/api/theaters/';

class TheaterService { 

    async getTheaterByMovieIdAndMultiplexId(movieId, multiplexId) {
        return await api.get(THEATER_BASE_URL + 
            `getTheaterByMovieIdAndMultiplexId/${movieId}/${multiplexId}`);
    }

    async assignTheaterToMovie(theaterId, movieId) {
        return await api.post(THEATER_BASE_URL + 
            `${theaterId}/assignMovie/${movieId}`,
                // TODO: add auth header
                // { headers: authHeader() }
            );
    }

    async updateTheaterCapacity(theaterId, capacity) {
        return await api.put(THEATER_BASE_URL + 
            `${theaterId}/updateCapacity/${capacity}`,
            // TODO: add auth header
            // { headers: authHeader() }
        );
    }

}

export default new TheaterService();