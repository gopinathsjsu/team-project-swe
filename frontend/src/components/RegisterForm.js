import React from 'react';
import pic_2 from '../assets/pic_2.jpg';
const RegisterForm = () => {
  return (
    <form id="registrationForm">
    <h2>Registration Page</h2>
   <img src={pic_2} alt="symbol1" />
    <br />
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required /><br />

    <label for="fullname">Full Name:</label>
    <input type="text" id="fullname" name="fullname" required /><br />

    <label for="lastname">Last Name:</label>
    <input type="text" id="lastname" name="lastname" required /><br />

    <label for="email">Email:</label>
    <input type="text" id="email" name="email "required /><br />

    <label for="password">Password:(8 characters minimum):</label>
    <input type="password" id="password" name="password" minlength="8" required /><br />

    <label for="confirmPassword">Confirm Password:(8 characters minimum)</label>
    <input type="password" id="confirmPassword" name="confirmPassword" minlength="8" required /><br />

    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob" required /><br />
    <label for="phone">Phone Number:</label>
    <input type="text" id="phone" name="phone" required /><br />
    <label for="movieGenres">Preferred Movie Genres (optional):</label>
    <input type="text" id="movieGenres" name="movieGenres" /><br />
    <input type="submit" value="Register" />
</form>

  );
}

export default RegisterForm;
