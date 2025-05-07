import { createContext, useContext, useState, useEffect } from "react";

// Create auth context
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: (email, password) => {},
  register: (name, email, password) => {},
  logout: () => {},
});

// Custom hook 
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (storedUser && storedAuth) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(JSON.parse(storedAuth));
    }
  }, []);

  // Update localStorage 
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  // Login function
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({ name: foundUser.name, email: foundUser.email });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Register function
  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return false;
    }

    // Add new user
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after registration
    setUser({ name, email });
    setIsAuthenticated(true);
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
