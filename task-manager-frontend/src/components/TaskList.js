import React, { useEffect, useState } from 'react';
import API from '../api/axios'; // Import shared axios instance

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    API.get('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const [editTaskId, setEditTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'PENDING',
  });

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setEditFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status
    });
  };

  const handleEditChange = (e) => {
    setEditFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    API.put(`/api/tasks/${id}`, editFormData)
      .then(() => {
        alert('Task updated!');
        setEditTaskId(null);
        fetchTasks(); // Refresh list
      })
      .catch(error => {
        console.error('Error updating task:', error);
        alert('Something went wrong while updating the task.');
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    if (window.confirm('Are you sure you want to delete this task?')) {
      API.delete(`/api/tasks/${id}`)
        .then(() => {
          alert('Task deleted!');
          fetchTasks(); // Refresh after delete
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task.');
        });
    }
  };

  return (
    <div>
      <h2>All Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              {editTaskId === task.id ? (
                <form onSubmit={(e) => handleUpdate(e, task.id)}>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                  /><br />
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    required
                  /><br />
                  <input
                    type="date"
                    name="dueDate"
                    value={editFormData.dueDate}
                    onChange={handleEditChange}
                    required
                  /><br />
                  <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditChange}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select><br />
                  <button type="submit">Update</button>
                  <button type="button" onClick={() => setEditTaskId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  <strong>{task.title}</strong> — {task.status}<br />
                  {task.description} (Due: {task.dueDate})<br />
                  <button onClick={() => handleEditClick(task)}>Edit</button>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
