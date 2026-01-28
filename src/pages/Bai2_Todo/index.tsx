import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { loadData, saveData } from '@/utils/storage';
import { TodoData } from './components/TodoItem';

const STORAGE_KEY = 'BAI2_TODO_STORAGE';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => { setTodos(loadData(STORAGE_KEY)); }, []);
  useEffect(() => { saveData(STORAGE_KEY, todos); }, [todos]);

  const handleAddOrUpdate = (text: string) => {
    if (editId) {
      setTodos(todos.map(t => t.id === editId ? { ...t, text } : t));
      setEditId(null);
      setEditText('');
      message.success('Đã cập nhật chỉnh sửa');
    } else {
      setTodos([{ id: Date.now(), text, completed: false }, ...todos]);
      message.success('Đã thêm mới công việc');
    }
  };

  const handleEditClick = (id: number) => {
    const item = todos.find(t => t.id === id);
    if (item) {
      setEditId(id);
      setEditText(item.text);
    }
  };

  return (
    <Card title="Bài 2: TodoList (LocalStorage)" style={{ maxWidth: 700, margin: '20px auto' }}>
      <TodoForm onAdd={handleAddOrUpdate} editingText={editText} onCancel={() => { setEditId(null); setEditText(''); }} />
      <TodoList 
        todos={todos} 
        onDelete={(id) => setTodos(todos.filter(t => t.id !== id))} 
        onToggle={(id) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
        onEdit={handleEditClick}
      />
    </Card>
  );
};

export default TodoPage;