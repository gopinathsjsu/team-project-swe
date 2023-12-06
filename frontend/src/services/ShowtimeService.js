import api from './backend-api/api';
import authHeader from './auth/auth-header';
import axios from 'axios';

const SHOWTIMES_BASE_URL = 'http://localhost:8080/api/showtimes/';

class ShowtimesService {


  // TODO: add auth header
  async addShowtime(movieId, newShowtime) {
    const {showDatetime, theaterId, multiplexId} = newShowtime;
    return await axios.post(SHOWTIMES_BASE_URL + 'create', {
        parameters: {
            movieId,
            showDatetime,
            theaterId,
            multiplexId
        }
      }
    );
  }

  async updateShowtime(movieId, editedShowtime) {
    console.log("MOVIEID:", movieId);
    const { showDateTime } = editedShowtime; // Fix here
    const response = await axios.put(
        `${SHOWTIMES_BASE_URL}/update?movieId=${movieId}&showDateTime=${showDateTime}`
    );
    // TODO: add auth header
    // { headers: authHeader() });
    return response;
  }


  // TODO: add auth header
  async deleteShowtime(showtimeId) {
    return await axios.delete(SHOWTIMES_BASE_URL + `delete/${showtimeId}`);
  }

}



export default new ShowtimesService();