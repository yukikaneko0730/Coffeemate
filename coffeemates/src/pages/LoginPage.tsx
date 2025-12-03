// src/pages/LoginPage.tsx
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // いったん console.log だけ。あとで Firebase Auth に差し替え。
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login", { email, password });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p className="login-card__subtitle">Welcome back to coffeemates</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
