import api from '../backend-api/api';

const API_URL = "/api/auth/";

const register = (username, email, password, firstName, lastName, dob, phone) => {
  return api.post(API_URL + "signup", {
    username,
    email,
    password,
    firstName,
    lastName,
    dob,
    phone
  });
};

const login = async (username, password) => {
    const response = await api
        .post(API_URL + "signin", {
            username,
            password,
        });
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
