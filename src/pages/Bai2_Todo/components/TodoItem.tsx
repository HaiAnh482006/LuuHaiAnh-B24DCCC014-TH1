import React from 'react';
import { List, Checkbox, Button } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

// Định nghĩa cấu trúc dữ liệu cho một công việc
export interface TodoData {
  id: number;
  text: string;
  completed: boolean;
}

// Định nghĩa các hàm callback nhận từ component cha
interface ItemProps {
  item: TodoData;
  onToggle: (id: number) => void; // Thay đổi trạng thái hoàn thành
  onDelete: (id: number) => void; // Xóa công việc
  onEdit: (id: number) => void;   // Kích hoạt chế độ sửa
}

const TodoItem: React.FC<ItemProps> = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <List.Item
      // Các nút chức năng hiển thị bên phải mỗi dòng
      actions={[
        <Button icon={<EditOutlined />} onClick={() => onEdit(item.id)} type="text">Sửa</Button>,
        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(item.id)} type="text">Xóa</Button>
      ]}
    >
      {/* Ô tích chọn để đánh dấu công việc đã làm xong */}
      <Checkbox checked={item.completed} onChange={() => onToggle(item.id)}>
        {/* Nếu đã hoàn thành thì hiển thị gạch ngang chữ */}
        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
          {item.text}
        </span>
      </Checkbox>
    </List.Item>
  );
};

export default TodoItem;