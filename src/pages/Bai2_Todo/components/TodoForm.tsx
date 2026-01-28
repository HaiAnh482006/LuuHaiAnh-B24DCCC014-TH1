import React, { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';

interface FormProps {
  onAdd: (text: string) => void;
  editingText: string;
  onCancel: () => void;
}

const TodoForm: React.FC<FormProps> = ({ onAdd, editingText, onCancel }) => {
  const [text, setText] = useState('');

  useEffect(() => { setText(editingText); }, [editingText]);

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <Space style={{ width: '100%', marginBottom: 20 }}>
      <Input 
        placeholder="Nội dung công việc..." 
        value={text} 
        onChange={e => setText(e.target.value)}
        onPressEnter={handleSubmit}
        style={{ width: 400 }}
      />
      <Button type="primary" onClick={handleSubmit}>
        {editingText ? 'Cập nhật' : 'Thêm mới'}
      </Button>
      {editingText && <Button onClick={() => { setText(''); onCancel(); }}>Hủy</Button>}
    </Space>
  );
};

export default TodoForm;