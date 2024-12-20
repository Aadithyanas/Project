import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://libarayms-default-rtdb.firebaseio.com/User.json';

// Function to generate a random unique userId
const generateUserId = () => {
  return Math.floor(Math.random() * 1000000000); // Generates a random 9-digit number
};

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    username: '',
    userId: '', // Added userId field
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // Check if all fields are filled
    if (!formData.name || !formData.address || !formData.phone || !formData.email || !formData.password || !formData.username) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      // Generate a unique userId before sending the request
      const newUserId = generateUserId();

      // Create the user data with the unique userId
      const userData = {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        userId: newUserId, // Added userId to the data
      };

      // Send data to Firebase
      await axios.post(API_URL, userData);

      // Update the message and reset the form
      setMessage('Signup successful! Please log in.');
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        password: '',
        username: '',
        userId: '', // Reset userId after submission
      });

      // Navigate to login page after successful signup
      navigate('/userlogin');
    } catch (error) {
      setMessage('Error signing up. Please try again.');
    }
  };

  return (
    <div className="auth-box">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
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
        <button type="submit">Signup</button>
      </form>
      <p className="message">{message}</p>
      <p className="redirect">
        Already have an account? <Link to="/userlogin">Login here</Link>
      </p>
    </div>
  );
};

export default UserSignup;
