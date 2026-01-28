import React, { useState, useEffect } from 'react';
import { Card, Input, Button, Statistic } from 'antd';
import KetQua from './components/KetQua'; // Import component con

const GamePage: React.FC = () => {
  // Logic ở đây
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState('');
  const [turn, setTurn] = useState(10);
  const [status, setStatus] = useState<'playing' | 'win' | 'lose'>('playing');
  const [msg, setMsg] = useState('Mời bạn nhập số từ 1-100');

  useEffect(() => {
    // Logic khởi tạo game
    setTarget(Math.floor(Math.random() * 100) + 1);
  }, []);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) return setMsg('Vui lòng nhập số hợp lệ!');

    if (num === target) {
      setStatus('win');
      setMsg('Chúc mừng! Bạn đã đoán đúng!');
    } else {
      const newTurn = turn - 1;
      setTurn(newTurn);
      if (newTurn === 0) {
        setStatus('lose');
        setMsg(`Bạn đã hết lượt! Số đúng là ${target}`);
      } else {
        setMsg(num < target ? 'Bạn đoán quá thấp!' : 'Bạn đoán quá cao!');
      }
    }
  };

  return (
    <Card title="Bài 1: Game Đoán Số" style={{ maxWidth: 500, margin: '20px auto' }}>
      <Statistic title="Lượt còn lại" value={turn} valueStyle={{ color: turn < 4 ? 'red' : 'green'}} />
      <div style={{ display: 'flex', gap: 10, margin: '15px 0' }}>
        <Input 
          value={guess} 
          onChange={e => setGuess(e.target.value)} 
          disabled={status !== 'playing'} 
          placeholder="Nhập số..."
        />
        <Button type="primary" onClick={handleGuess} disabled={status !== 'playing'}>Đoán</Button>
      </div>
      {/* Component con chỉ việc hiển thị */}
      <KetQua status={status} message={msg} />
    </Card>
  );
};

export default GamePage;