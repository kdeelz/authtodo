import React, { useState, useEffect } from 'react';
import { useAuth } from '../controller/AuthContext';
import '../css/TodoList.css';
import { motion } from 'framer-motion';

export const TodoList = () => {
  const { currentUser } = useAuth();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showMenu, setShowMenu] = useState(false); // State for menu visibility
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [currentTodoIndex, setCurrentTodoIndex] = useState(null); // Track which todo is being edited

  useEffect(() => {
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
    setTitle('');
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

  const startEditing = (index) => {
    setIsEditing(true);
    setCurrentTodoIndex(index);
    setTitle(todos[index].title);
    setDescription(todos[index].description);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo, i) =>
      i === currentTodoIndex ? { ...todo, title, description } : todo
    );
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
    setIsEditing(false);
    setCurrentTodoIndex(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="todo-page">
      <div className="todo-form-container">
        <h1 className="welcome-message">Welcome, {currentUser}!</h1>
        <h3 className="todo-title">{isEditing ? 'Edit Todo' : 'Add New Todo'}</h3>

        <form className="todo-form" onSubmit={isEditing ? submitEdit : addTodo}>
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
          <button type="submit" className="add-todo-button">
            {isEditing ? 'Save Changes' : 'Add Todo'}
          </button>
        </form>

        <button
          className="toggle-menu-button"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? 'Close Todo List' : 'Show Todo List'}
        </button>
      </div>

      {/* Sliding menu for todo list */}
      <motion.div
        className={`todo-list-container ${showMenu ? 'show' : 'hide'}`}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: showMenu ? 1 : 0, x: showMenu ? 0 : 300 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="todo-title">Your Todo List</h3>

        <ul className="todo-list">
          {todos.map((todo, index) => (
      <motion.li
      key={index}
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h4 className="todo-item-title">{todo.title}</h4>
      <p className="todo-item-description">{todo.description}</p>
    
      <div className="todo-item-buttons">
        <button
          onClick={() => toggleComplete(index)}
          className="toggle-todo-button"
        >
          {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </button>
        <button
           onClick={() => startEditing(index)}
             className="edit-todo-button"
             aria-label="Edit Todo"
        >
         <i className="bx bx-edit"></i>
        </button>

        <button
           onClick={() => deleteTodo(index)}
           className="delete-todo-button"
           aria-label="Delete Todo"
        >
       <i className="bx bx-trash"></i>
        </button>
      </div>
    </motion.li>
    
          ))}
        </ul>
      </motion.div>
    </div>
  );
};
