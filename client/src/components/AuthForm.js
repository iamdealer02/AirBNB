import React, { useState } from 'react';
import axios from 'axios';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleForm = async (e) => {
    e.preventDefault();

    try {
        console.log(email, password)
      const response = await axios.post('http://localhost:8080/authentication/login', {
        email: email,
        password: password,
      });

      // Handle the response as needed
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form method='GET' onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="email" className="h5 mb-2">
            What is your email?
          </label>
          <input
            className="form-control bg-light"
            type="text"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control bg-light"
            id="password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-dark btn-block">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
