import React, { createContext, useContext, useState } from 'react';

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const register = (username, password) => {
    localStorage.setItem(username, JSON.stringify({ username, password, todos: [] }));
    setIsAuthenticated(true);
    setCurrentUser(username);
    setMessage('Registration successful! You are now logged in.');
  };

  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      setMessage('Login successful! Welcome back.');
    } else {
      setMessage('Invalid username or password. Please try again.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setMessage('You have successfully logged out.');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout, message, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
