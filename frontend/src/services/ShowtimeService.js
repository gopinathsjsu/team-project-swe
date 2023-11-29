import axios from 'axios';
import authHeader from './auth/auth-header';

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
    const {showDatetime, theaterId, multiplexId} = editedShowtime;
    return await axios.put(SHOWTIMES_BASE_URL + 'update', {
        parameters: {
            movieId,
            showDatetime,
            theaterId,
            multiplexId
        }
      } 
    // TODO: add auth header
    // { headers: authHeader() });
    );
  }


  // TODO: add auth header
  async deleteShowtime(showtimeId) {
    return await axios.delete(SHOWTIMES_BASE_URL + `delete/${showtimeId}`);
  }

}



export default new ShowtimesService();