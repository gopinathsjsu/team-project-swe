import axios from 'axios';

const NEW_RELEASES_BASE_URL = 'http://localhost:8080/api/movies/getNewReleases';

class NewReleasesService {

    async getAllNewReleases() {
        try {
            const response = await axios.get(`${NEW_RELEASES_BASE_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all new releases:', error);
            throw error;
        }
    }
}

export default new NewReleasesService();
