// src/components/RegisterForm.js
import React, { useState } from 'react';
import { useAuth } from '../controller/AuthContext';
import '../css/Registerform.css'; // Assuming you have the CSS file

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, message } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default RegisterForm;
