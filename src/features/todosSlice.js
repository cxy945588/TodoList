import { createSlice } from '@reduxjs/toolkit';
import { loadTodosFromStorage, saveTodosToStorage } from '../utils/storage';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: loadTodosFromStorage(),
    editingId: null,
  },
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
      saveTodosToStorage(state.items);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveTodosToStorage(state.items);
      }
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveTodosToStorage(state.items);
    },
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },
    updateTodoText: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find(item => item.id === id);
      if (todo) {
        todo.text = text;
        saveTodosToStorage(state.items);
      }
      state.editingId = null;
    }
  }
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  setEditingId,
  updateTodoText
} = todosSlice.actions;

export default todosSlice.reducer;