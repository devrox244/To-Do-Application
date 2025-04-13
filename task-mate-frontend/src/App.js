import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TaskList from './Components/TaskList';
import TaskForm from './Components/TaskForm';
import EditTaskForm from './Components/EditTaskForm';
import './App.css';
import './AddTaskModal.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);
  const editFormRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
        const categories = [...new Set(response.data.map(task => task.category).filter(Boolean))];
        setAvailableCategories(['', ...categories]);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [refreshFlag]);

  const handleTaskAdded = (newTask) => {
    setTasks(currentTasks => [...currentTasks, newTask]);
    setIsModalOpen(false); 
    setRefreshFlag(prev => !prev);
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(currentTasks => currentTasks.filter(task => task._id !== id));
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${id}/status`, { completed });
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task._id === id ? { ...task, completed } : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setTimeout(() => {
      if (editFormRef.current) {
        editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.log("editFormRef.current is still null after delay.");
      }
    }, 100);
  };

  const handleSaveEdit = async (updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask);
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setEditingTask(null);
      setRefreshFlag(prev => !prev);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="app-container">
      <nav className="navbar">
        <select
          value={filterCategory}
          onChange={handleCategoryChange}
          className="category-dropdown"
        >
          <option value="">All Categories</option>
          {availableCategories.map(category => (
            <option key={category} value={category}>{category || 'No Category'}</option>
          ))}
        </select>
        <h1 className="app-title">Task Mate</h1>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </nav>
      <div className="task-list-container-header">
        <h2>Task List</h2>
        <button onClick={openModal} className="add-task-button">Add Task</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>&times;</button>
            <TaskForm onTaskAdded={handleTaskAdded} />
          </div>
        </div>
      )}

      {editingTask && (
        <div className="edit-task-form-container" ref={editFormRef}>
          <EditTaskForm
            task={editingTask}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        </div>
      )}
      <div className="task-list-container">
        <div className="task-grid">
          <TaskList
            tasks={sortedTasks}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            key={refreshFlag}
          />
        </div>
      </div>
    </div>
  );
}

export default App;