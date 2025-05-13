import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

// Create auth context
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {},
  register: (name, email, password) => {},
  logout: () => {},
  loading: true,
});

// Custom hook 
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const { data } = await authAPI.getProfile();
          setUser(data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('token');
        }
      }
      
      setLoading(false);
    };
    
    loadUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login({ email, password });
      
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      
      return true;
    } catch (error) {
      console.error('Login failed', error);
      return false;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const { data } = await authAPI.register({ name, email, password });
      
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('token', data.token);
      
      return true;
    } catch (error) {
      console.error('Registration failed', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
