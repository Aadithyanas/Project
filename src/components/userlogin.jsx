import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation
import './Auth.css';

const API_URL = 'https://libarayms-default-rtdb.firebaseio.com/User.json';

const UserLogin = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous message

    try {
      const response = await axios.get(API_URL);
      const users = response.data;

      // Check if a user exists with the given username and password
      const user = Object.values(users || {}).find(
        (user) => user.username === formData.username && user.password === formData.password
      );

      if (user) {
        setMessage('Login successful!');
        setUser(user); // Set user info in state

        // Store the user ID in localStorage for persistence
        localStorage.setItem('userId', user.userId);
        console.log(user.userId)

        // Redirect to the user's home page with user ID in the URL
        navigate(`/${user.userId}/home`);
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      setMessage('Error logging in. Please try again.');
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default UserLogin;
