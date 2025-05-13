import React, { createContext, useContext, useState, useEffect } from 'react';
import { tasksAPI } from '../services/api';

export const TodoContext = createContext({
  todos: [],
  loading: false,
  error: null,
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API on mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const { data } = await tasksAPI.getTasks();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Add new todo
  const addTodo = async (todo) => {
    try {
      setLoading(true);
      const { data } = await tasksAPI.createTask(todo);
      setTodos((prev) => [data, ...prev]);
      return true;
    } catch (err) {
      setError('Failed to add task');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update todo
  const updateTodo = async (id, todo) => {
    try {
      setLoading(true);
      const { data } = await tasksAPI.updateTask(id, todo);
      setTodos((prev) =>
        prev.map((prevTodo) => (prevTodo._id === id ? data : prevTodo))
      );
      return true;
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await tasksAPI.deleteTask(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete status
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      if (!todo) return false;
      
      return await updateTodo(id, { completed: !todo.completed });
    } catch (err) {
      setError('Failed to update task status');
      console.error(err);
      return false;
    }
  };

  const contextValue = {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
}; 