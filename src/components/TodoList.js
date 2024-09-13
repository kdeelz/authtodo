import React, { useState, useEffect } from 'react';
import { useAuth } from '../controller/AuthContext';

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
      alert("Please fill in both title and description");
      return;
    }
    const newTodo = { title, description, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodosToStorage(updatedTodos);
    setTitle('');  // Clear the input fields
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
    <div>
      <h3>Your Todo List</h3>

      <form onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <h4>{todo.title}</h4>
            <p>{todo.description}</p>
            <button onClick={() => toggleComplete(index)}>
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
