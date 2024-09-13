import React from 'react';
import { AuthProvider, useAuth } from './controller/AuthContext';
import { RegisterForm, LoginForm } from './components/RegistrationForm';
import { TodoList } from './components/TodoList';
import './App.css';

function AppContent() {
  const { isAuthenticated, logout, message } = useAuth();

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
              <LoginForm />
              <RegisterForm />
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