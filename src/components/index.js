import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEditingId } from '../features/todosSlice';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.items);
  const editingId = useSelector(state => state.todos.editingId);

  const handleStartEdit = (id) => {
    dispatch(setEditingId(id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">待辦事項清單</h1>
      <p className="todo-subtitle">雙擊項目可以編輯</p>

      <TodoForm />

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            onStartEdit={handleStartEdit}
          />
        ))}
      </ul>

      {todos.length === 0 && (
        <div className="todo-empty">
          目前沒有待辦事項，請在上方添加！
        </div>
      )}
    </div>
  );
};

export default TodoList;