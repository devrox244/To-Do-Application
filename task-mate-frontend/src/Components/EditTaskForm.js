import React, { useState, useEffect } from 'react';

const EditTaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : '');
      setCategory(task.category || '');
    }
  }, [task]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ _id: task._id, title, description, dueDate, category });
  };

  return (
    <div className="edit-task-form-container">
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div className="button-group">
          <button type="submit" className="save-button">Save</button>
          <button type="button" onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;