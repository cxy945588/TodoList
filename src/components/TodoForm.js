import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todosSlice';

const TodoForm = () => {
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(addTodo(newTask.trim()));
      setNewTask('');
    }
  };

  return (
    <div className="todo-input-container">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="添加新任務..."
        className="todo-input"
      />
      <button type="submit" className="todo-add-button" onClick={handleSubmit}>
        添加
      </button>
    </div>
  );
};

export default TodoForm;