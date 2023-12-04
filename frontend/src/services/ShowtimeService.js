import authHeader from './auth/auth-header';
import api from './backend-api/api';

const SHOWTIMES_BASE_URL = '/api/showtimes/';

class ShowtimesService {


  // TODO: add auth header
  async addShowtime(movieId, newShowtime) {
    const {showDatetime, theaterId, multiplexId} = newShowtime;
    return await api.post(SHOWTIMES_BASE_URL + 'create', {
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
    const response = await api.put(
        `${SHOWTIMES_BASE_URL}/update?movieId=${movieId}&showDateTime=${showDateTime}`
    );
    // TODO: add auth header
    // { headers: authHeader() });
    return response;
  }


  // TODO: add auth header
  async deleteShowtime(showtimeId) {
    return await api.delete(SHOWTIMES_BASE_URL + `delete/${showtimeId}`);
  }

}



export default new ShowtimesService();