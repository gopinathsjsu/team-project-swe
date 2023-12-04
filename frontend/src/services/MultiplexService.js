import axios from 'axios';
import authHeader from './auth/auth-header';

import api from './backend-api/api';

const MULTIPLEXES_BASE_URL = '/api/multiplexes';

class MultiplexService {

    async getMultiplexesByLocationId(locationId) {
        try {
            const response = await api.get(`${MULTIPLEXES_BASE_URL}/get/${locationId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching multiplexes:', error);
            throw error; 
        }
    };

}

export default new MultiplexService();
