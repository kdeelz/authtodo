import React, { useState, useEffect } from 'react';
import { useAuth } from '../controller/AuthContext';
import '../css/TodoList.css'; // Add the new CSS file

export const TodoList = () => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Load the todo list from localStorage for the current user
    if (currentUser) {
      const storedUser = JSON.parse(localStorage.getItem(currentUser));
      setTodos(storedUser.todos || []);
    }
  }, [currentUser]);

  const saveTodosToStorage = (updatedTodos) => {
    const storedUser = JSON.parse(localStorage.getItem(currentUser));
    storedUser.todos = updatedTodos;
    localStorage.setItem(currentUser, JSON.stringify(storedUser));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill in both title and description');
      return;
    }
    const newTodo = { title, description, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
    setTitle(''); // Clear the input fields
    setDescription('');
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1 className="welcome-message">Welcome, {currentUser}!</h1> {/* Display username */}
      <h3 className="todo-title">Your Todo List</h3>

      <form className="todo-form" onSubmit={addTodo}>
        <input
          type="text"
          className="todo-input"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="todo-input"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="add-todo-button">Add Todo</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <h4 className="todo-item-title">{todo.title}</h4>
            <p className="todo-item-description">{todo.description}</p>
            <button
              onClick={() => toggleComplete(index)}
              className="toggle-todo-button"
            >
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => deleteTodo(index)} className="delete-todo-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
