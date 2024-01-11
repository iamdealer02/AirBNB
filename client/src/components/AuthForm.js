import React, { useState } from 'react';
import axios from 'axios';

export const AuthForm = ({action}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

   const handleForm = async (e) => {
    e.preventDefault();

    try {
        let url;
        if (action === 'login'){
            url = 'http://localhost:8080/authentication/login'
        } else if (action === 'register'){
            url = 'http://localhost:8080/authentication/register'
        }
        
      const response = await axios.post(url, {
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
          {action === 'login' ? 'Login' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};
