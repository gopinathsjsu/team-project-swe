import axios from 'axios';
import api from './backend-api/api';


const SCHEDULE_BASE_URL = 'http://localhost:8080/api/schedules/';

class ScheduleService { 

    // TODO: add auth header
    async removeMovieFromSchedule(movieId, scheduleId) {
        return await axios.delete(SCHEDULE_BASE_URL + 
            `${scheduleId}/movies/${movieId}`,
        )
    }

    async getMovieByMultiplexId(multiplexId) {
        return await axios.get(SCHEDULE_BASE_URL + `multiplex/${multiplexId}`);
    }

    async addMovieToSchedule(movieId, scheduleId) {
        return await axios.post(SCHEDULE_BASE_URL + `${scheduleId}/addMovie/${movieId}`);
    }
}

export default new ScheduleService();

// endpoint for rmoving movie from schedule
