import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/Alert'; // Importing the custom Alert component

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(''); // Type: success or error

  const register = (username, password) => {
    const existingUser = JSON.parse(localStorage.getItem(username));
    
    if (existingUser) {
      setAlertMessage('Username already exists. Please choose a different one.');
      setAlertType('error');
      return;
    }
    
    localStorage.setItem(username, JSON.stringify({ username, password, todos: [] }));
    setIsAuthenticated(true);
    setCurrentUser(username);
    setAlertMessage('Registration successful! You are now logged in.');
    setAlertType('success');
  };

  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setIsAuthenticated(true);
      setCurrentUser(username);
      setAlertMessage('Login successful! Welcome back.');
      setAlertType('success');
    } else {
      setAlertMessage('Invalid username or password. Please try again.');
      setAlertType('error');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAlertMessage('You have successfully logged out.');
    setAlertType('success');
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, register, login, logout, currentUser }}>
      {children}
      {alertMessage && (
        <Alert message={alertMessage} type={alertType} onClose={closeAlert} />
      )}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
