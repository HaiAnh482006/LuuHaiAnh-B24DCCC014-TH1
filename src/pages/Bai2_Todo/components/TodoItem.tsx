import React from 'react';
import { List, Checkbox, Button, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export interface TodoData {
  id: number;
  text: string;
  completed: boolean;
}

interface ItemProps {
  item: TodoData;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TodoItem: React.FC<ItemProps> = ({ item, onToggle, onDelete, onEdit }) => {
  return (
    <List.Item
      actions={[
        <Button icon={<EditOutlined />} onClick={() => onEdit(item.id)} type="text">Sửa</Button>,
        <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(item.id)} type="text">Xóa</Button>
      ]}
    >
      <Checkbox checked={item.completed} onChange={() => onToggle(item.id)}>
        <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
          {item.text}
        </span>
      </Checkbox>
    </List.Item>
  );
};

export default TodoItem;