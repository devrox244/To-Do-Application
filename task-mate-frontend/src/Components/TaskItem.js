import React from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onDelete, onToggleComplete, onEdit }) => {
  const isDueToday = () => {
    if (!task.dueDate) {
      return false;
    }
    const today = new Date();
    const dueDate = new Date(task.dueDate.slice(0, 10)); // Compare only the date part
    return (
      today.getFullYear() === dueDate.getFullYear() &&
      today.getMonth() === dueDate.getMonth() &&
      today.getDate() === dueDate.getDate()
    );
  };

  const titleStyle = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    textDecoration: task.completed ? 'line-through' : '',
    color: task.completed ? '#777' : (isDueToday() ? 'red' : '#eee'), // Apply red if due today
  };

  return (
    <div className="task-item">
      <div className="task-item-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task._id, !task.completed)}
        />
        <h3 style={titleStyle}>
          {task.title}
        </h3>
        <p>{task.description}</p>
        <p className="due-date">Due Date: {task.dueDate ? task.dueDate.slice(0, 10) : 'No Due Date'}</p>
        <p className="category">Category: {task.category || 'No Category'}</p>
      </div>
      <div>
        <button className="edit-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;