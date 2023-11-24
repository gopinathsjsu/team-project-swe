import axios from 'axios';
import authHeader from '../services/auth/auth-header';

const USERS_BASE_URL = 'http://localhost:8080/api/users';

class UserService {

    // methods to check auth backend
    getPublicContent() {
        return axios.get(USERS_BASE_URL + 'all');
    }

    getUserBoard() {
        return axios.get(USERS_BASE_URL + 'user', { headers: authHeader() });
    }

    getMemberBoard() { 
        return axios.get(USERS_BASE_URL + 'member', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(USERS_BASE_URL + 'admin', { headers: authHeader() });
    }

    async getAllUsers() {
        return await axios.get(USERS_BASE_URL + '/getUsers').catch(function (error) {
            console.log(error);
        });
    }

    async getUser(id) {
        const res = await axios.get(USERS_BASE_URL + '/getUser', {
            params: {
                userId: id
            }
        });

        console.log(res);        
    }

    async createUser(userData) {
        const { 
            firstName,
            lastName,
            email,
            phone,
            dob,
            username,
            password
        } = userData;

        const res = await axios.post(USERS_BASE_URL + '/create', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            dateOfBirth: dob,
            username: username,
            password: password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        return res;
    }

    

}

export default new UserService();