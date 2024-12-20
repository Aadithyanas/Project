import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
        password: '',
        adminKey: '' // Field to store generated key
    });

    const generateAdminKey = () => {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 8)}`; // Unique key using timestamp and random string
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const adminKey = generateAdminKey(); // Generate admin key
        const adminData = { ...formData, adminKey };

        try {
            await axios.post('https://libarayms-default-rtdb.firebaseio.com/Admin.json', adminData);
            alert(`Signup successful! Your admin key is: ${adminKey}`);
            setFormData({ name: '', number: '', email: '', password: '', adminKey: '' });
        } catch (error) {
            console.error('Error signing up:', error);
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <div className='signup-container'>
            <h2>Admin Signup</h2>
            <form onSubmit={handleSignup}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="number" placeholder="Number" value={formData.number} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
      
            <p className="redirect">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default Signup;
