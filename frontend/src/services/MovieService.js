import axios from 'axios';
import authHeader from './auth/auth-header';

const MOVIES_BASE_URL = 'http://localhost:8080/api/movies';

class MoviesService {

  async fetchShowtimesByMovieId(movieId) {
    try {
      const response = await axios.get(`${MOVIES_BASE_URL}/getShowTimes?movieId=${movieId}`, { headers: authHeader() });
      return response.data;
    } catch (error) {
      console.error('Error fetching showtimes:', error);
      return [];
    }
  };

}



export default new MoviesService();
