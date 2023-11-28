import axios from 'axios';
import authHeader from '../services/auth/auth-header';

const THEATER_BASE_URL = 'http://localhost:8080/api/theaters/';

class TheaterService { 

    async getTheaterByMovieIdAndMultiplexId(movieId, multiplexId) {
        return await axios.get(THEATER_BASE_URL + 
            `getTheaterByMovieIdAndMultiplexId/${movieId}/${multiplexId}`);
    }

    async assignTheaterToMovie(theaterId, movieId) {
        return await axios.post(THEATER_BASE_URL + 
            `${theaterId}/assignMovie/${movieId}`,
                // TODO: add auth header
                // { headers: authHeader() }
            );
    }

    async updateTheaterCapacity(theaterId, capacity) {
        return await axios.put(THEATER_BASE_URL + 
            `${theaterId}/updateCapacity/${capacity}`,
            // TODO: add auth header
            // { headers: authHeader() }
        );
    }

}

export default new TheaterService();