import React from 'react';
import { List, Card } from 'antd';
import TodoItem, { TodoData } from './TodoItem';

// Định nghĩa các props nhận vào để quản lý danh sách và các hành động
interface ListProps {
  todos: TodoData[];          // Mảng chứa danh sách các công việc
  onToggle: (id: number) => void; // Hàm chuyển đổi trạng thái hoàn thành
  onDelete: (id: number) => void; // Hàm xóa công việc khỏi danh sách
  onEdit: (id: number) => void;   // Hàm kích hoạt chế độ chỉnh sửa
}

const TodoList: React.FC<ListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    // Card dùng để bao bọc danh sách, tạo khung giao diện chỉn chu
    <Card title="Danh sách Todo" size="small">
      <List
        dataSource={todos} // Nguồn dữ liệu truyền vào cho List
        renderItem={item => (
          // Duyệt qua từng phần tử và hiển thị thông qua component TodoItem
          <TodoItem 
            item={item} 
            onToggle={onToggle} 
            onDelete={onDelete} 
            onEdit={onEdit} 
          />
        )}
      />
    </Card>
  );
};

export default TodoList;