import axios from 'axios';
import authHeader from './auth/auth-header';

const TICKETS_BASE_URL = 'http://localhost:8080/api/tickets';

class TicketsService {

    async getTicket(ticketId) {
        try {
            const response = await axios.get(`${TICKETS_BASE_URL}/getTicket`, {
                params: {
                    ticketId
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching ticket:', error);
            throw error; 
        }
    };

}

export default new TicketsService();