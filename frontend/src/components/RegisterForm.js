import React from 'react';
import { Component } from 'react';
import pic_2 from '../assets/pic_2.png';
import Button from '@mui/material/Button';


class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };
}
handleInputChange = (e) => {
  const { name, value } = e.target;
  this.setState({
    [name]: value,
    [`${name}Error`]: '', // Clear previous error message
  });
};

handleSubmit = (e) => {
  e.preventDefault();

  // Email validation
  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(this.state.email)) {
    this.setState({ emailError: 'Invalid email format' });
    return;
  }

  // Password validation
  const passwordPattern = /^(?![0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#^%*?&])[A-Za-z\d@$!#^%*?&]{8,}$/;
  if (!passwordPattern.test(this.state.password)) {
    this.setState({
      passwordError:
        'Password must have at least one uppercase letter, one lowercase letter, one number(should not be the first character), and one special character. It must be at least 8 characters long.',
    });
    return;
  }
  //confirm Password validation
  if (this.state.password !== this.state.confirmPassword) {
    this.setState({
      confirmPasswordError: 'Passwords do not match',
    });
    return;
  }

  // If both email and password are valid and confirm password is same as password , we can proceed with registration logic.
  // Submit the form or perform other actions.

  console.log('Registration successful');
};
render() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
        <h2 className="text-2xl text-center mb-6">Registration Page</h2>
        <img  className="mx-auto mb-4 max-w-md w-full p-4" src={pic_2} alt="symbol1" />
        <br />

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username:</label>
          <input
           className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />
          <br />
          </div>


        <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="firstName">First Name:</label>
          <input
            className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="firstName"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
            required
          /><br />
          </div>

          <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">Last Name:</label>
          <input
          className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="lastName"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
            required
          /><br />
          </div>

        {/* <label for="username">Username:</label>
        <input type="text" id="username" name="username" required /><br /> */}

        {/* <label for="fullname">Full Name:</label>
        <input type="text" id="fullname" name="fullname" required /><br />

        <label for="lastname">Last Name:</label>
        <input type="text" id="lastname" name="lastname" required /><br /> */}
        
        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="email">Email:</label>
        <input
            type="text"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        <span className="text-red-500 text-xs italic error">{this.state.emailError}</span><br />
        <p>Password criteria : Atleast One A-Z/a-z, Atleast one number, Atleast one special character from "@$!#^%*?&"</p>
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password (8 characters minimum):</label>
        <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            minLength="8"
            required
          />
        <span className="text-red-500 text-xs italic error">{this.state.passwordError}</span><br />
        </div>

        <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            required
          />
          <span className="text-red-500 text-xs italic error">{this.state.confirmPasswordError}</span><br />
        </div>

        {/* <label for="email">Email:</label>
        <input type="text" id="email" name="email "required /><br />

        <label for="password">Password:(8 characters minimum):</label>
        <input type="password" id="password" name="password" minlength="8" required /><br /> */}

        {/* <label for="confirmPassword">Confirm Password:(8 characters minimum)</label>
        <input type="password" id="confirmPassword" name="confirmPassword" minlength="8" required /><br /> */}
          
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={this.state.dob}
            onChange={this.handleInputChange}
            required
          /><br />
        </div>

        <div className="mb-4"> 
          <label className="block text-gray-700 text-sm font-bold mb-2"  htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={this.state.phone}
            onChange={this.handleInputChange}
            required
          /><br />
         </div>

        {/* <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob" required /><br />
        <label for="phone">Phone Number:</label>
        <input type="text" id="phone" name="phone" required /><br /> */}
        {/* we need not have Preferred Movie Genres (optional): */}
        {/* <label for="movieGenres">Preferred Movie Genres (optional):</label>
        <input type="text" id="movieGenres" name="movieGenres" /><br /> */}
        <div className="mb-6 text-center">
        <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         type="submit" color="warning" value="Register">
            Register </Button>
         </div>
      </form>
    </div>
   );
  }
}

// need not use this as a function included the same in return.
// function RegisterForm() {
//   return (
//     <form id="registrationForm">
//       <h2>Registration Page</h2>
//       <img src={pic_2} alt="symbol1" />
//       <br />
//       <label for="username">Username:</label>
//       <input type="text" id="username" name="username" required /><br />

//       <label for="fullname">Full Name:</label>
//       <input type="text" id="fullname" name="fullname" required /><br />

//       <label for="lastname">Last Name:</label>
//       <input type="text" id="lastname" name="lastname" required /><br />

//       <label for="email">Email:</label>
//       <input type="text" id="email" name="email " required /><br />

//       <label for="password">Password:(8 characters minimum):</label>
//       <input type="password" id="password" name="password" minlength="8" required /><br />

//       <label for="confirmPassword">Confirm Password:(8 characters minimum)</label>
//       <input type="password" id="confirmPassword" name="confirmPassword" minlength="8" required /><br />

//       <label for="dob">Date of Birth:</label>
//       <input type="date" id="dob" name="dob" required /><br />
//       <label for="phone">Phone Number:</label>
//       <input type="text" id="phone" name="phone" required /><br />
//       <label for="movieGenres">Preferred Movie Genres (optional):</label>
//       <input type="text" id="movieGenres" name="movieGenres" /><br />
//       <input type="submit" value="Register" />
//     </form>

//   );
// }

export default RegisterForm;
