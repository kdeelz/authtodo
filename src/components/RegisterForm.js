import React, { useState } from 'react';
import { useAuth } from '../controller/AuthContext';
import '../css/Registerform.css'; // Assuming you have the CSS file

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, message } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Register</h2>
      
      <div className="input-group">
        <input
          type="text"
          className="form-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <input
          type="text"
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      
      <div className="input-group">
        <input
          type="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="form-button">Register</button>
      {message && <p className="message">{message}</p>}
    </form>
  );
};

export default RegisterForm;
