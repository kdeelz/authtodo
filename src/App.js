import React, { useState } from 'react';
import { AuthProvider, useAuth } from './controller/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { TodoList } from './components/TodoList';
import './App.css';

function AppContent() {
  const { isAuthenticated, logout, message } = useAuth();
  const [showRegister, setShowRegister] = useState(false); // Toggle between login and register

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? (
          <>
            <h1>Todo List Application</h1>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
            {message && <p className="message">{message}</p>}
            <TodoList />
          </>
        ) : (
          <>
            <h1>Welcome to Todo List App</h1>
            <p>Please register or login to access your todo list.</p>
            <div className="auth-forms">
              {showRegister ? (
                <>
                  <RegisterForm />
                  <p>
                    Already have an account?{' '}
                    <button
                      onClick={() => setShowRegister(false)}
                      className="toggle-button"
                    >
                      Login here
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <LoginForm />
                  <p>
                    Don't have an account?{' '}
                    <button
                      onClick={() => setShowRegister(true)}
                      className="toggle-button"
                    >
                      Register here
                    </button>
                  </p>
                </>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

function App() {
  return (
  
    <AuthProvider>
      
      <AppContent />
    
    </AuthProvider>
  );
}

export default App;
