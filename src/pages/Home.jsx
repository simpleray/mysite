import { useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import './Home.css';

const illustrations = [
  '/images/bg1.png',
  '/images/bg2.png',
  '/images/bg3.png',
  '/images/bg4.png',
  '/images/bg5.png',
  '/images/bg6.png',
  '/images/bg7.png',
  '/images/bg8.png'
];

function Home({ user }) {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(illustrations[0]);
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const random = illustrations[Math.floor(Math.random() * illustrations.length)];
      setCurrentImage(random);
      setInput(''); // 入力欄リセット（送信は不要とのこと）
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="home-page">
      <aside className="sidebar">
        <h2>メニュー</h2>
        <button>新規チャット</button>
        <button>履歴</button>
        <button onClick={handleLogout}>ログアウト</button>
      </aside>

      <main className="main-content">
        <div className="illustration-box">
          <img src={currentImage} alt="ランダムイラスト" />
        </div>

        <div className="input-area">
          <input
            type="text"
            placeholder="メッセージを入力..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button>⏎</button>
        </div>

        <footer className="footer">© 2025 AI Creator Inc.</footer>
      </main>
    </div>
  );
}

export default Home;