import axios from 'axios';

const USERS_BASE_URL = 'http://localhost:8080/api/users';

class UserService {

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