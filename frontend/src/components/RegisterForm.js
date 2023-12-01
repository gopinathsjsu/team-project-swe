import React, {useState, useRef} from "react";
import Button from "@mui/material/Button";

import pic_2 from "../assets/pic_2.png";
import AuthService from "../services/auth/auth.service";

const RegisterForm = () => {

  const form = useRef();
  const [successful, setSuccessful] = useState(false);

  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [`${name}Error`]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(formData.email)) {
      setFormData({ ...formData, emailError: 'Invalid email format' });
      return;
    }
    
    const passwordPattern =
      /^(?![0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#^%*?&])[A-Za-z\d@$!#^%*?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      setFormData({
        ...formData,
        passwordError:
          'Password must have at least one uppercase letter, one lowercase letter, one number(should not be the first character), and one special character. It must be at least 8 characters long.',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        confirmPasswordError: 'Passwords do not match',
      });
      return;
    }

    // console.log(formData);

    /* collect user data to be passed to backend 
      to create a user record in the database */
    const userSignUpData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      username: formData.username,
      password: formData.password,
    };

    // call AuthService endpoint to post user data
    // log the result success or failure
    AuthService.register(userSignUpData.username, userSignUpData.email, userSignUpData.password, userSignUpData.firstName, userSignUpData.lastName, userSignUpData.dob, userSignUpData.phone)
      .then((response) => {
        console.log(response);
        setSuccessful(true);
      })
      .catch((error) => {
        console.log(error);
        setSuccessful(false);
      });

  };

    return (
      <div className="min-h-screen flex items-center justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          ref={form}
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center mb-6">Registration Page</h2>
          <img
            className="mx-auto mb-4 max-w-md w-full p-4"
            src={pic_2}
            alt="symbol1"
          />
          <br />

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <span className="text-red-500 text-xs italic error">
              {formData.emailError}
            </span>
            <br />
            <p>
              Password criteria : Atleast One A-Z/a-z, Atleast one number,
              Atleast one special character from "@$!#^%*?&"
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password (8 characters minimum):
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              minLength="8"
              required
            />
            <span className="text-red-500 text-xs italic error">
              {formData.passwordError}
            </span>
            <br />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <span className="text-red-500 text-xs italic error">
              {formData.confirmPasswordError}
            </span>
            <br />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dob"
            >
              Date of Birth:
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone Number:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <br />
          </div>

          <div className="mb-6 text-center">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              color="warning"
              value="Register"
            >
              Register{" "}
            </Button>
          </div>
        </form>

        {successful && (
          <div>
            <h4>You have registered successfully!</h4>
            <a href="/login">Click here to login</a>
          </div>
        )}
      </div>
    );
  }

export default RegisterForm;
