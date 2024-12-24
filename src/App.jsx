import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css'; // Ensure to include your styles

// Lazy-loaded components
const Homepage = lazy(() => import('./components/Homepage'));
const BookDetails = lazy(() => import('./components/BookDetails'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const Signup = lazy(() => import('./components/AdminSignup'));
const UserSignup = lazy(() => import('./components/UserSignup'));
const UserLogin = lazy(() => import('./components/UserLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const ForgotPassword = lazy(() => import('./components/ForgotPassword'));
const AdminProfilePage = lazy(() => import('./components/AdminProfilePage'));
const BookCatalog = lazy(() => import('./components/BookCatalog'));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : { id: null, role: null };
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  const handleLogin = (id, role) => {
    setAuth({ id, role });
    localStorage.setItem('auth', JSON.stringify({ id, role }));
  };

  const handleLogout = () => {
    setAuth({ id: null, role: null });
    localStorage.removeItem('auth');
  };

  const ProtectedRoute = ({ children, role }) => {
    if (role && auth.role !== role) return <Navigate to="/userlogin" />;
    if (!auth.id) return <Navigate to="/userlogin" />;
    return children;
  };

  return (
    <Router>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} handleLogout={handleLogout} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Homepage />} />

          {/* Protected Routes */}
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="user">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute role="admin">
                <AdminProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage setAuth={handleLogin} />} />
          <Route path="/usersignup" element={<UserSignup />} />
          <Route path="/userlogin" element={<UserLogin setAuth={handleLogin} />} />
          <Route path="/admin-signup" element={<Signup />} />
          <Route path="/BookCatalog" element={<BookCatalog />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
