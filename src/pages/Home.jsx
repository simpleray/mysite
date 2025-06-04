import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// 表示するイラストの一覧（public/images に配置されている画像）
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
  const navigate = useNavigate(); // ページ遷移用の関数

  // 現在表示中のイラスト（初期は1番目）
  const [currentImage, setCurrentImage] = useState(illustrations[0]);

  // 入力フォームの値を保持
  const [input, setInput] = useState('');

  // 履歴モード表示のON/OFFを管理
  const [showHistory, setShowHistory] = useState(false);

  // Enterキーが押された時の処理（Shift+Enterは無視）
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 改行を防止
      // ランダムな画像を選んで表示
      const random = illustrations[Math.floor(Math.random() * illustrations.length)];
      setCurrentImage(random);
      setInput(''); // 入力欄をクリア
    }
  };

  // ログアウトボタン押下時の処理（トップページに戻るだけ）
  const handleLogout = () => {
    navigate('/'); // ルート("/")へ戻る
  };

  // 履歴表示と入力画面の切り替え
  const toggleHistory = () => {
    setShowHistory(!showHistory); // true → false, false → true
  };

  return (
    <div className="home-page">
      {/* 左側のメニューエリア（サイドバー） */}
      <aside className="sidebar">
        {user && (
          <div className="user-info">
            <img src={user.picture} alt="プロフィール" className="user-avatar" />
            <p className="user-name">{user.name}</p>
          </div>
        )}
        <h2>メニュー</h2>
        {/* 完成してないボタン */}
        <button>新規チャット（未完成）</button>
        {/* 履歴 ⇔ 入力モードの切り替えボタン */}
        <button onClick={toggleHistory}>
          {showHistory ? '入力画面へ戻る' : '履歴'}
        </button>
        <button onClick={handleLogout}>ログアウト</button>
      </aside>

      {/* 右側のメイン表示エリア */}
      <main className="main-content">
        {showHistory ? (
          // 履歴表示モード：全画像を一覧で表示
          <div className="illustration-grid">
            {illustrations.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`履歴 ${idx + 1}`}
                className="history-image"
              />
            ))}
          </div>
        ) : (
          // 通常モード：1枚の画像と入力欄
          <>
            <div className="illustration-box">
              <img src={currentImage} alt="ランダムイラスト" />
            </div>

            <div className="input-area">
              <input
                type="text"
                placeholder="メッセージを入力..."
                value={input}
                onChange={(e) => setInput(e.target.value)} // 入力値を状態に反映
                onKeyDown={handleKeyDown} // Enterキーで画像切り替え
              />
              <button>⏎</button> {/* デザイン用（実際の送信はEnterキー） */}
            </div>
          </>
        )}

        <footer className="footer">© 2025 AI Creator Inc.</footer>
      </main>
    </div>
  );
}

export default Home;
