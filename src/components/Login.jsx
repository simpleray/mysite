import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

// ログイン画面のコンポーネント
function Login() {
  const navigate = useNavigate(); // ページ遷移用の関数（React Routerの機能）

  // .envファイルからクライアントIDとリダイレクトURLを読み込む
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  // Googleログインで必要なパラメータを定義
  const scope = encodeURIComponent("openid email profile");
  const responseType = "token";

  // ログインボタンを押したときにGoogleのログインページに遷移する関数
  const loginWithRedirect = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = url; // Googleのページへ画面遷移（ポップアップではなく画面ごと切り替え）
  };

  // 背景に流す画像の位置設定（3列）
  const columnPositions = ["20%", "50%", "80%"];
  const rowsPerColumn = 3; // 各列に何枚流すか

  return (
    <div className="login-page">
      {/* 背景アニメーション用の画像群（縦に流れる） */}
      <div className="background-images">
        {columnPositions.flatMap((left, colIndex) =>
          Array.from({ length: rowsPerColumn }, (_, rowIndex) => {
            const delay = rowIndex * 10 + Math.random() * 5; // アニメ開始タイミングを少しずらす
            const imgIndex = ((colIndex * rowsPerColumn + rowIndex) % 9) + 1; 
            return (
              <img
                key={`${colIndex}-${rowIndex}`} // 各画像に一意なキー
                src={`/images/bg${imgIndex}.png`} 
                className="bg-image"
                style={{
                  top: "-300px",
                  left: left,
                  animationDelay: `${delay}s`, // アニメ開始の遅延
                }}
                alt=""
              />
            );
          })
        )}
      </div>

      <div className="button-group">
        {/* Googleログインボタン */}
        <button className="google-login-button" onClick={loginWithRedirect}>
          Googleでログイン
        </button>

        {/* デバッグ用 */}
        <button className="home-button" onClick={() => navigate("/home")}>
          Homeに移動
        </button>
      </div>
    </div>
  );
}

export default Login;
