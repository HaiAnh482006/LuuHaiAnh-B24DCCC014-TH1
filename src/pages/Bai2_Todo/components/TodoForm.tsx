import React, { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';

// Định nghĩa các thuộc tính nhận vào từ component cha
interface FormProps {
  onAdd: (text: string) => void;
  editingText: string; // Nội dung đang được chỉnh sửa
  onCancel: () => void; // Hàm hủy bỏ trạng thái sửa
}

const TodoForm: React.FC<FormProps> = ({ onAdd, editingText, onCancel }) => {
  const [text, setText] = useState('');

  // Cập nhật ô Input khi nhấn nút "Sửa" ở danh sách
  useEffect(() => { 
    setText(editingText); 
  }, [editingText]);

  // Xử lý gửi dữ liệu khi nhấn Thêm hoặc Cập nhật
  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text); // Gọi hàm xử lý ở component cha
      setText(''); // Reset ô nhập về trống
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
        {/* Thay đổi nhãn nút dựa trên trạng thái đang sửa hay thêm mới */}
        {editingText ? 'Cập nhật' : 'Thêm mới'}
      </Button>
      {/* Nút Hủy chỉ xuất hiện khi đang ở chế độ chỉnh sửa */}
      {editingText && <Button onClick={() => { setText(''); onCancel(); }}>Hủy</Button>}
    </Space>
  );
};

export default TodoForm;