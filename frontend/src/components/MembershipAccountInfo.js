import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users';

const MembershipAccountInfo = {
  getUser: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/getUsers`, {
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
        const response = await axios.get(`http://localhost:8080/api/memberships/getMembership/user`, {
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

  getTicketData: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/tickets/user/{userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  },
  

  getMoviesWatched: async (userId) => {
    try {
      const response = await axios.get('http://localhost:8080/api/tickets/watched/{userId}'); 
      return response.data;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  },

  getRewardPoints: async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/{userId}/getRewardPoints`);  
        return response.data;
      } catch (error) {
        console.error('Error fetching reward points:', error);
      return null;
    }
  },
};

export default MembershipAccountInfo;
