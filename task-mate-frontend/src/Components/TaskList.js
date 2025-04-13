import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onDelete, onToggleComplete, onEdit }) => {
  return (
    <>
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
        />
      ))}
    </>
  );
};

export default TaskList;