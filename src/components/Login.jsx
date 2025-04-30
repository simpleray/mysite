import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="background-images">
        {[...Array(9)].map((_, i) => (
          <img
            key={i}
            src={`/images/bg${i + 1}.png`}
            className="bg-image"
            style={{
              left: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
            alt=""
          />
        ))}
      </div>

      <button className="login-button">Login</button>
    </div>
  );
}

export default Login;
