import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';

// Appの中でルーティングとユーザー情報の取得処理を分けるためのサブコンポーネント
function AppContent() {
  const [userInfo, setUserInfo] = useState(null); // ユーザー情報（Googleログイン後に保存）
  const navigate = useNavigate(); // ページ遷移を行うための関数

  useEffect(() => {
    // Googleログイン成功後、アクセストークンがURLハッシュとして返される
    const hash = window.location.hash;

    // もしURLにアクセストークンが含まれていたら処理を開始
    if (hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1)); // "#access_token=..." を取り出す
      const token = params.get('access_token'); // 実際のアクセストークンを取得

      // Google APIを使ってログインユーザーの情報を取得
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`, // トークンをヘッダーに入れる
        },
      })
        .then((res) => res.json()) // レスポンスをJSON形式で受け取る
        .then((data) => {
          setUserInfo(data); // ユーザー情報をstateに保存
          navigate('/home'); // 自動で /home に遷移
        });
    }
  }, []); // 初回読み込み時のみ実行

  return (
    <Routes>
      {/* ルートパスにアクセスしたとき → Loginコンポーネントを表示 */}
      <Route path="/" element={<Login />} />

      {/* /home にアクセスしたとき → Homeコンポーネントを表示（user情報を渡す） */}
      <Route path="/home" element={<Home user={userInfo} />} />
    </Routes>
  );
}

// アプリのエントリーポイント
export default function App() {
  return (
    // アプリ全体をBrowserRouterで囲むことでURLによる画面遷移が使えるようになる
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
