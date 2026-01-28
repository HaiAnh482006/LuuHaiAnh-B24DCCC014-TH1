import React, { useState, useEffect } from 'react';
import { Card, message } from 'antd';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { loadData, saveData } from '@/utils/storage';
import { TodoData } from './components/TodoItem';

// Khóa lưu trữ dữ liệu duy nhất cho Bài 2
const STORAGE_KEY = 'BAI2_TODO_STORAGE';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  // Yêu cầu: Đọc danh sách từ localStorage khi vừa vào trang
  useEffect(() => { 
    setTodos(loadData(STORAGE_KEY)); 
  }, []);

  // Yêu cầu: Tự động lưu vào localStorage mỗi khi có thay đổi
  useEffect(() => { 
    saveData(STORAGE_KEY, todos); 
  }, [todos]);

  // Xử lý Thêm mới hoặc Chỉnh sửa công việc
  const handleAddOrUpdate = (text: string) => {
    if (editId) {
      // Logic Chỉnh sửa: Cập nhật nội dung dựa trên ID
      setTodos(todos.map(t => t.id === editId ? { ...t, text } : t));
      setEditId(null);
      setEditText('');
      message.success('Đã cập nhật chỉnh sửa');
    } else {
      // Logic Thêm mới: Tạo object mới và đẩy vào mảng
      setTodos([{ id: Date.now(), text, completed: false }, ...todos]);
      message.success('Đã thêm mới công việc');
    }
  };

  // Kích hoạt chế độ sửa: Tìm item và đẩy dữ liệu lên Form
  const handleEditClick = (id: number) => {
    const item = todos.find(t => t.id === id);
    if (item) {
      setEditId(id);
      setEditText(item.text);
    }
  };

  return (
    <Card title="Bài 2: TodoList (LocalStorage)" style={{ maxWidth: 700, margin: '20px auto' }}>
      {/* Form nhập liệu: Dùng chung cho cả Thêm và Sửa */}
      <TodoForm 
        onAdd={handleAddOrUpdate} 
        editingText={editText} 
        onCancel={() => { setEditId(null); setEditText(''); }} 
      />
      {/* Hiển thị danh sách: Xử lý các sự kiện Xóa/Đổi trạng thái/Sửa */}
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