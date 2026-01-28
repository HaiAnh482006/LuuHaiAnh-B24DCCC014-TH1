import React from 'react';
import { List, Card } from 'antd';
import TodoItem, { TodoData } from './TodoItem';

interface ListProps {
  todos: TodoData[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

const TodoList: React.FC<ListProps> = ({ todos, onToggle, onDelete, onEdit }) => {
  return (
    <Card title="Danh sách Todo" size="small">
      <List
        dataSource={todos}
        renderItem={item => (
          <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
        )}
      />
    </Card>
  );
};

export default TodoList;