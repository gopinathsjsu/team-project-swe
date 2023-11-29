import axios from 'axios';


const SCHEDULE_BASE_URL = 'http://localhost:8080/api/schedules/';

class ScheduleService { 

    // TODO: add auth header
    async removeMovieFromSchedule(movieId, scheduleId) {
        return await axios.delete(SCHEDULE_BASE_URL + 
            `removeMovie/${movieId}/${scheduleId}`,
        )
    }

}

export default new ScheduleService();

// endpoint for rmoving movie from schedule
