import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newTask = { title, description, dueDate, category };
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      if (onTaskAdded) {
        onTaskAdded(response.data);
      }
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategory('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#333', padding: '20px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #555' }}>
      <h2 style={{ fontSize: '1.3em', fontWeight: 'bold', marginBottom: '15px', color: '#eee', textAlign: 'center' }}>Add New Task</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#ccc' }}>Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '8px', borderRadius: '3px', border: '1px solid #555', width: '100%', boxSizing: 'border-box', backgroundColor: '#444', color: '#eee' }} />
        </div>
        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#ccc' }}>Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #555', width: '100%', boxSizing: 'border-box', backgroundColor: '#444', color: '#eee' }} />
        </div>
        <div>
          <label htmlFor="dueDate" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#ccc' }}>Due Date:</label>
          <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #555', width: '100%', boxSizing: 'border-box', backgroundColor: '#444', color: '#eee' }} />
        </div>
        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#ccc' }}>Category:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '8px', borderRadius: '3px', border: '1px solid #555', width: '100%', boxSizing: 'border-box', backgroundColor: '#444', color: '#eee' }} />
        </div>
        <button type="submit" style={{ backgroundColor: '#5cb85c', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;