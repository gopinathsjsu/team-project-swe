import api from '../services/backend-api/api';

const BASE_URL = 'api/users';

const MembershipAccountInfo = {
  getUser: async (id) => {
    try {
      const response = await api.get(`${BASE_URL}/getUser`, {
        params: {
          userId: id,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

    getMembership: async (userId) => {
      try {
        const response = await api.get(`api/memberships/getMembership/user`, {
          params: {
            userId: userId,
          },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching membership:', error);
        return null;
      }
  },

  getTicketData: async (ticketId) => {
    try {
      const response = await api.get(`api/tickets/getTicket`, {
        params: {
          ticketId:ticketId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  },
  
  getMoviesWatched: async (userId) => {
    try {
      const response = await api.get(`/api/tickets/watched/${userId}`); 
      return response.data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  },

  getRewardPoints: async (userId) => {
    try {
      const response = await api.get(`api/users/${userId}/getRewardPoints`);  
        return response.data;
      } catch (error) {
        console.error('Error fetching reward points:', error);
      return null;
    }
  },
};

export default MembershipAccountInfo;
