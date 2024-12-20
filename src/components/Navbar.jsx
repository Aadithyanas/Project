import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isDarkMode, toggleTheme, handleLogout }) => {
  const navigate = useNavigate();

  const logout = () => {
    // Perform logout actions here
    localStorage.removeItem('userId'); // Remove userId from localStorage (if user is logged in)
    localStorage.removeItem('adminId'); // Remove adminId from localStorage (if admin is logged in)
    handleLogout(); // Update state to remove user from app
    navigate('/'); // Redirect to homepage after logout
  };

  const userId = localStorage.getItem('userId'); // Get userId from localStorage to check if logged in as user
  const adminId = localStorage.getItem('adminId'); // Get adminId from localStorage to check if logged in as admin
  console.log(adminId)
  return (
    <header className="header">
      <div className="logo-container">
        <img
          src="/images/logo.jpeg"
          alt="Library Logo"
          style={{
            width: '80px',
            borderRadius: '50%',
            marginRight: '10px',
          }}
        />
        <h1 className="logo">
          LIBRA<span>MAX</span>
        </h1>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#catalog">Catalog</a>
          </li>
          <li>
            <a href="#events">Events</a>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <div className="nav-buttons">
          {/* Conditionally render User Login/Logout button */}
          {userId ? (
            <button className="btn-login" onClick={logout}>
              User Logout
            </button>
          ) : (
            <Link to="/userlogin">
              <button className="btn-login">User Login</button>
            </Link>
          )}

          {/* Conditionally render Admin Login/Logout button */}
          {adminId ? (
            <button className="btn-login" onClick={logout}>
              Admin Logout
            </button>
          ) : (
            <Link to="/admin-signup">
              <button className="btn-login">Admin Login</button>
            </Link>
          )}

          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            className={isDarkMode ? 'btn-dark' : 'btn-white'}
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;