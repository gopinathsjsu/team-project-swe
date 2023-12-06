import api from './backend-api/api';
import authHeader from '../services/auth/auth-header';
import axios from 'axios';

const USERS_BASE_URL = 'http://localhost:8080/api/users';

class UserService {

    getPublicContent() {
        return axios.get(USERS_BASE_URL + 'all');
    }

    getUserBoard() {
        return axios.get(USERS_BASE_URL + 'user', { headers: authHeader() });
    }

    getMemberBoard() { 
        return api.get(USERS_BASE_URL + 'member', { headers: authHeader() });
    }

    getAdminBoard() {
        return api.get(USERS_BASE_URL + 'admin', { headers: authHeader() });
    }

    async getAllUsers() {
        return await api.get(USERS_BASE_URL + '/getUsers').catch(function (error) {
            console.log(error);
        });
    }

    async getUser(id) {
        const res = await api.get(USERS_BASE_URL + '/getUser', {
            params: {
                userId: id
            }
        });

        return res;        
    }

    async getUserByUsername(username) {
        const res = await api.get(USERS_BASE_URL + '/getUserByUsername', {
            params: {
                username: username
            }
        });

        return res;   
    }

    async updateUser(usernameToUpdate, userData) {
        const { 
            firstName,
            lastName,
            email,
            phone,
            dob,
            username,
            password
        } = userData;

        const res = await api.put(USERS_BASE_URL + '/update', 
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            dateOfBirth: dob,
            username: username,
            password: password
            }, {
                headers: authHeader(),
                params: {
                    username: usernameToUpdate
                }
            })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        return res;
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

        const res = await api.post(USERS_BASE_URL + '/create', {
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

const userServiceInstance = new UserService();

export default userServiceInstance;