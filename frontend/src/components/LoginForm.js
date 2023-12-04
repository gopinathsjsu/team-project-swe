import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import pic_1 from "../assets/pic_1.png";
import Button from "@mui/material/Button";

import AuthService from "../services/auth/auth.service";

const LoginForm = () => {

  const form = useRef();
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
  
    AuthService.login(username, password)
      .then((loginResponse) => {
        const userRole = loginResponse.role;
  
        if (userRole === 'ROLE_ADMIN') {
          navigate('/admin', { replace: true });
        } else {
          navigate('/membershipPage', { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


    return (
      <div className="min-h-screen flex items-center justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          ref={form}
          onSubmit={handleLogin}
          id="LoginForm"
        >
          <h2 className="text-2xl text-center mb-6">Login Page</h2>
          <img
            className="mx-auto mb-4 max-w-md w-full p-4"
            src={pic_1}
            alt="symbol1"
          />
          <br />
          <div className="mb-4 block text-gray-700 text-sm font-bold mb-2">
            <label htmlFor="username">Username:</label>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter your username"
              id="username"
              name="username"
              value={username}
              onChange={onChangeUsername}
              required
            />
            <br />

            <label htmlFor="password">Password:(8 characters minimum):</label>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              minLength="8"
              required
            />
            <br />
          </div>
          <div className="mb-6 text-center">
            {/* {error && <div>{error}</div>} */}
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              color="warning"
              value="Login"
            >
              Login{" "}
            </Button>
          </div>
        </form>
      </div>
    );
  };

export default LoginForm;
