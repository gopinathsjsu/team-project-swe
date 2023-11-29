import axios from 'axios';

const LOCATIONS_BASE_URL = 'http://localhost:8080/api/locations';

class LocationService {

    async getAllLocations() {
        try {
            const response = await axios.get(`${LOCATIONS_BASE_URL}/getAll`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all locations:', error);
            throw error;
        }
    }

    async getLocationByName(locationName) {
        try {
          const response = await axios.get(`${LOCATIONS_BASE_URL}/getByName/${locationName}`);
          return response.data;
        } catch (error) {
          console.error('Error fetching location by name:', error);
          throw error;
        }
    };

}

export default new LocationService();
