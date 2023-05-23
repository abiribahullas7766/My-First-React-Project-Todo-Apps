import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [reminder, setReminder] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleReminderChange = (event) => {
    setReminder(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        text: inputValue.trim(),
        completed: false,
        dueDate: dueDate,
        priority: priority,
        category: category,
        reminder: reminder
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
      setDueDate('');
      setPriority('');
      setCategory('');
      setReminder('');
    }
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    return (
      todo.text.toLowerCase().includes(searchTerm) ||
      todo.dueDate.toLowerCase().includes(searchTerm) ||
      todo.priority.toLowerCase().includes(searchTerm) ||
      todo.category.toLowerCase().includes(searchTerm) ||
      todo.reminder.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="navbar-title">Todo App</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </nav>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a todo item"
        />
        <input
          type="date"
          value={dueDate}
          onChange={handleDateChange}
          placeholder="Due Date"
        />
        <select value={priority} onChange={handlePriorityChange}>
          <option value="">Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          value={category}
          onChange={handleCategoryChange}
          placeholder="Category"
        />
        <input
          type="text"
          value={reminder}
          onChange={handleReminderChange}
          placeholder="Reminder"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? 'completed' : ''}
            onClick={() => handleToggleComplete(todo.id)}
          >
            <div>
              <span>{todo.text}</span>
              {todo.dueDate && <span className="due-date">Due: {todo.dueDate}</span>}
            </div>
            <div>
              {todo.priority && <span className={`priority ${todo.priority}`}>{todo.priority}</span>}
              {todo.category && <span className="category">{todo.category}</span>}
              {todo.reminder && <span className="reminder">Reminder: {todo.reminder}</span>}
            </div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
