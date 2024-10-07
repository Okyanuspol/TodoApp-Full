import './App.css';
import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error( error));
  }, []);

  const addTodo = (title) => {
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then((response) => response.json())
      .then((newTodo) => setTodos([...todos, newTodo]));
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const toggleTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
      .then((response) => response.json())
      .then((updatedTodo) => {
        setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
      });
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <NewTodo onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
    </div>
  );
}

export default App;
