import axios from 'axios';
import authHeader from './auth/auth-header';

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

    // async getLocationByName(locationName) {
    //     try {
    //       const response = await axios.get(`${LOCATIONS_BASE_URL}/getByName/${locationName}`);
    //       return response.data;
    //     } catch (error) {
    //       console.error('Error fetching location by name:', error);
    //       throw error;
    //     }
    // };

}

export default new NewReleasesService();
