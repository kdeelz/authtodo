import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const register = (username, password) => {
    localStorage.setItem(username, JSON.stringify({ username, password, todos: [] }));
    setIsAuthenticated(true);
    setCurrentUser(username);
    alert('Registration successful! You are now logged in.'); // Alert for registration success
  };

  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      alert('Login successful! Welcome back.'); // Alert for login success
    } else {
      alert('Invalid username or password. Please try again.'); // Alert for login failure
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    alert('You have successfully logged out.'); // Alert for logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
