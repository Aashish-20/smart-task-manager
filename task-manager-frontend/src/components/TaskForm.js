import React, { useState } from 'react';
import API from '../api/axios'; // import the shared axios instance

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'PENDING'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    API.post('/api/tasks', formData) // use API instead of axios
      .then(response => {
        alert('Task added successfully!');
        setFormData({ title: '', description: '', dueDate: '', status: 'PENDING' });
        onTaskAdded(); // Refresh task list
      })
      .catch(error => {
        console.error('Error adding task:', error);
        alert('Something went wrong while adding the task.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Task</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      /><br />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      /><br />

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      /><br />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select><br />

      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
