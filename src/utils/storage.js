export const loadTodosFromStorage = () => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error('無法從 localStorage 加載數據:', error);
      return [];
    }
  };
  
  export const saveTodosToStorage = (todos) => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('無法保存到 localStorage:', error);
    }
  };