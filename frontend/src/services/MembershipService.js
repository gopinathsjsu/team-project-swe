import api from './backend-api/api';
import authHeader from './auth/auth-header';

const MEMBERSHIP_BASE_URL = 'http://localhost:8080/api/memberships';

class MembershipService {

    async createMembership(userId, membershipData) {
        const {
            expirationDate,
            membershipType
        } = membershipData;

        const res = await api.post(MEMBERSHIP_BASE_URL + '/create', {
            params: {
                userId: userId
            }
        },
        {    
            expirationDate: expirationDate,
            membershipType: membershipType
        }, 
        // { headers: authHeader() } TODO: uncomment
        );

        return res;
    }

    async getMembership(id) {
        try {
          const response = await api.get(MEMBERSHIP_BASE_URL + '/getMembership/user', {
            params: {
              userId: id
            }
          });
          return response.data;
        } catch (error) {
          console.error(error);
          throw error;
        }
      }
      

    async updateMembership(userId, membershipData) {
        const {
            expirationDate,
            membershipType
        } = membershipData;

        const res = await api.put(`${MEMBERSHIP_BASE_URL}/update`,
          {
              expirationDate: expirationDate,
              membershipType: membershipType
          },
          {
              params: {
                  userId: userId
              }
              // headers: authHeader() // TODO: uncomment
          }
      );
  
      return res.data;
  }

}



export default new MembershipService();
