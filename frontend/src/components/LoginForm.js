import React from 'react';
import pic_1 from '../assets/pic_1.png';
import Button from '@mui/material/Button';
const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" id="LoginForm">
    <h2 className="text-2xl text-center mb-6">Login Page</h2>
   <img  className="mx-auto mb-4 max-w-md w-full p-4" src={pic_1} alt="symbol1" />
    <br />
    <div className="mb-4 block text-gray-700 text-sm font-bold mb-2">
    <label for="username">Username:</label>
    <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="username" name="username" required /><br />

    <label for="password">Password:(8 characters minimum):</label>
    <input className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" name="password" minlength="8" required /><br />
    </div>
    {/* using tailwind css button */}
    {/* <input type="submit" value="Login" /> */} 
    <div className="mb-6 text-center">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         type="submit" color="warning" value="Login">
            Login </Button>
    </div>
</form>
</div>
  );
}

export default LoginForm;
