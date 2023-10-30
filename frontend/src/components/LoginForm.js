import React from 'react';
import pic_1 from '../assets/pic_1.jpg';
const LoginForm = () => {
  return (
    <form id="LoginForm">
    <h2>Login Page</h2>
   <img src={pic_1} alt="symbol1" />
    <br />
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required /><br />

    <label for="password">Password:(8 characters minimum):</label>
    <input type="password" id="password" name="password" minlength="8" required /><br />

    <input type="submit" value="Login" />
</form>

  );
}

export default LoginForm;
