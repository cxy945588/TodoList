import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Check, Trash2 } from 'lucide-react';
import { toggleTodo, deleteTodo, updateTodoText } from '../features/todosSlice';

const TodoItem = ({ todo, isEditing, onStartEdit }) => {
  const dispatch = useDispatch();
  const [editingText, setEditingText] = useState(todo.text);

  const handleSaveEdit = () => {
    if (editingText.trim()) {
      dispatch(updateTodoText({ id: todo.id, text: editingText.trim() }));
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="todo-checkbox"
      />

      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={(e) => setEditingText(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
          autoFocus
          className="todo-edit-input"
        />
      ) : (
        <span
          onDoubleClick={() => onStartEdit(todo.id)}
          className={`todo-text ${todo.completed ? 'completed' : ''}`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="todo-delete-button"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;