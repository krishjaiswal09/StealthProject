import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

// Create auth context with default values
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => Promise.resolve(false),
  register: () => Promise.resolve(false),
  logout: () => {},
  loading: true,
  error: null,
});

// Custom hook for using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const { data } = await authAPI.getProfile();
          setUser(data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('token');
          setError('Your session has expired. Please login again.');
        }
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await authAPI.login({ email, password });
      
      setUser(data.user || data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
      setLoading(false);
      return false;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data } = await authAPI.register({ name, email, password });
      
      setUser(data.user || data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
