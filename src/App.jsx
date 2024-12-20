import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import BookDetails from './components/BookDetails';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';
import Signup from './components/AdminSignup';
import UserSignup from './components/userSignup';
import UserLogin from './components/userlogin';
import AdminDashboard from './components/AdminDashboard';
import BookCatalog from './components/BookCatalog';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(null); // Store user info

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Fetch user from localStorage if it exists
  useEffect(() => {
    const savedUser = localStorage.getItem('userId');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  // ProtectedRoute Component to handle authentication
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/userlogin" />; // Redirect to login if not authenticated
  };

  // HomepageRedirect Component for redirection
  const HomepageRedirect = () => {
    if (user) {
      return <Navigate to={`/${user}/home`} />;
    } else {
      return <Homepage />;
    }
  };

  // Handle login and logout
  const handleLogin = (userId) => {
    setUser(userId);
    localStorage.setItem('userId', userId);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userId');
  };

  return (
    <Router>
      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        handleLogout={handleLogout} // Pass handleLogout function to Navbar
      />
      <Routes>
        {/* Redirect to homepage based on login status */}
        <Route path="/" element={<HomepageRedirect />} />

        {/* Book Details Page (Protected) */}
        <Route
          path="/book/:id"
          element={
            user ? <BookDetails /> : <Navigate to="/userlogin" replace />
          }
        />

        {/* Other Routes */}
        <Route path="/login" element={<LoginPage setUser={handleLogin} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/BookCatalog" element={<BookCatalog />} />
        <Route path="/admin-signup" element={<Signup />} />
        <Route path="/userlogin" element={<UserLogin setUser={handleLogin} />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/admin" element={<AdminDashboard />} />

        
        {/* Dynamic Route for Home Page with UserId */}
        <Route path="/:userId/home" element={<Homepage />} />

        {/* Redirect to login page if user is not authenticated */}
        <Route path="*" element={<Navigate to="/userlogin" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
