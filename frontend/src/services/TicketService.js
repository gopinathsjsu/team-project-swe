import axios from 'axios';
import authHeader from './auth/auth-header';

import api from './backend-api/api';

const TICKETS_BASE_URL = '/api/tickets';

class TicketsService {
    async getTicket(ticketId) {
        try {
            const response = await api.get(`${TICKETS_BASE_URL}/getTicket`, {
                params: {
                    ticketId
                },
                headers: authHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching ticket:', error);
            return null;
        }
    }
}

const ticketsServiceInstance = new TicketsService();

export default ticketsServiceInstance;
