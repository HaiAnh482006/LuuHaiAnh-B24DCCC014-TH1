import React from 'react';
import { Alert } from 'antd';

// Dùng Interface để định nghĩa props 
interface Props {
  status: 'playing' | 'win' | 'lose';
  message: string;
}

const KetQua: React.FC<Props> = ({ status, message }) => {
  let type: 'info' | 'success' | 'error' | 'warning' = 'info';
  
  if (status === 'win') type = 'success';
  else if (status === 'lose') type = 'error';
  else if (message.includes('thấp') || message.includes('cao')) type = 'warning';

  return (
    <div style={{ marginTop: 20 }}>
      <Alert message={message} type={type} showIcon />
    </div>
  );
};

export default KetQua;