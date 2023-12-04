import axios from 'axios';

import api from './backend-api/api';

// const NEW_RELEASES_BASE_URL = 'api/movies/getNewReleases';

class NewReleasesService {

    async getAllNewReleases() {
        try {
            const response = await api.get(`/movies/getNewReleases`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all new releases:', error);
            throw error;
        }
    }
}

export default new NewReleasesService();
