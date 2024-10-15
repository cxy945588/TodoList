import React, { useState, useEffect } from 'react';import './TodoList.css'; // 導入CSS樣式文件

const TodoList = () => { // 定義TodoList函數組件
  const [tasks, setTasks] = useState(() => {
    // 從localStorage讀取初始任務列表
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState(''); // 初始化newTask狀態為空字符串
  const [editingId, setEditingId] = useState(null); // 初始化editingId狀態為null，用於跟踪正在編輯的任務
  const [editingText, setEditingText] = useState(''); // 初始化editingText狀態為空字符串，用於存儲正在編輯的任務文本

  useEffect(() => {
    // 當tasks狀態改變時，將其保存到localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => { // 定義添加任務的函數
    if (newTask.trim() !== '') { // 檢查新任務是否為空
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]); // 添加新任務到tasks數組

      setNewTask(''); // 清空輸入框
    }
  };

  const toggleTask = (id) => { // 定義切換任務完成狀態的函數
    setTasks(tasks.map(task => // 遍歷所有任務
      task.id === id ? { ...task, completed: !task.completed } : task // 如果是目標任務，則切換completed狀態
    ));
  };

  const deleteTask = (id) => { // 定義刪除任務的函數
    setTasks(tasks.filter(task => task.id !== id)); // 過濾掉要刪除的任務
  };

  const startEditing = (id, text) => { // 定義開始編輯任務的函數
    setEditingId(id); // 設置正在編輯的任務id
    setEditingText(text); // 設置正在編輯的任務文本
  };

  const saveEdit = () => { // 定義保存編輯的函數
    if (editingText.trim() !== '') { // 檢查編輯後的文本是否為空
      setTasks(tasks.map(task => // 遍歷所有任務
        task.id === editingId ? { ...task, text: editingText } : task // 如果是正在編輯的任務，則更新文本
      ));
      setEditingId(null); // 重置編輯狀態
      setEditingText(''); // 清空編輯文本
    }
  };

  return (
    <div className="todo-container"> {/* 主容器 */}
      <h1 className="todo-title">Todo List (雙擊項目可進行編輯)</h1> {/* 標題 */}
      <div className="todo-input-container"> {/* 輸入區容器 */}
        <input
          type="text"
          className="todo-input"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} // 更新newTask狀態
          placeholder="添加新任務"
        />
        <button
          className="todo-add-button"
          onClick={addTask} // 點擊時調用addTask函數
        >
          添加
        </button>
      </div>
      <ul className="todo-list"> {/* 任務列表 */}
        {tasks.map(task => ( // 遍歷所有任務
          <li
            key={task.id}
            className={`todo-item ${task.completed ? 'completed' : ''}`} // 根據完成狀態添加類名
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)} // 切換任務狀態
              className="todo-checkbox"
            />
            {editingId === task.id ? ( // 如果當前任務正在編輯中
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)} // 更新editingText狀態
                onBlur={saveEdit} // 失去焦點時保存編輯
                autoFocus
                className="todo-edit-input"
              />
            ) : (
              <span
                className="todo-text"
                onDoubleClick={() => startEditing(task.id, task.text)} // 雙擊開始編輯
              >
                {task.text}
              </span>
            )}
            <button
              className="todo-delete-button"
              onClick={() => deleteTask(task.id)} // 刪除任務
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList; // 導出TodoList組件