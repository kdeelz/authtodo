// src/components/LoginForm.js
import React, { useState } from 'react';
import { useAuth } from '../controller/AuthContext';
import '../css/Registerform.css'; // Assuming you have the CSS file

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, message } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Login</h2>
      <div className="input-group">
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="form-button" type="submit">Login</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
};

export default LoginForm;
