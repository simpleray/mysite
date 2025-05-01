import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  const scope = encodeURIComponent("openid email profile");
  const responseType = "token";

  const loginWithRedirect = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = url;
  };

  const columnPositions = ["20%", "50%", "80%"];
  const rowsPerColumn = 3;

  return (
    <div className="login-page">
      <div className="background-images">
        {columnPositions.flatMap((left, colIndex) =>
          Array.from({ length: rowsPerColumn }, (_, rowIndex) => {
            const delay = rowIndex * 10 + Math.random() * 5;
            const imgIndex = ((colIndex * rowsPerColumn + rowIndex) % 9) + 1;
            return (
              <img
                key={`${colIndex}-${rowIndex}`}
                src={`/images/bg${imgIndex}.png`}
                className="bg-image"
                style={{
                  top: "-300px",
                  left: left,
                  animationDelay: `${delay}s`,
                }}
                alt=""
              />
            );
          })
        )}
      </div>

      <div className="button-group">
        <button className="google-login-button" onClick={loginWithRedirect}>
          Googleでログイン
        </button>
        <button className="home-button" onClick={() => navigate("/home")}>
          Homeに移動
        </button>
      </div>
    </div>
  );
}

export default Login;
