// src/pages/LoginPage.tsx
import React, { useState } from "react";
import "../styles/AuthLayout.css";

const LoginPage: React.FC = () => {
  const [useId, setUseId] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("login", {
      mode: useId ? "id" : "email",
      credential,
      password,
    });
    // TODO: Firebase login
  };

  return (
    <div className="auth-layout">
      {/* Left sidebar */}
      <aside className="auth-sidebar">
        <div className="auth-sidebar__logo">Coffeemates</div>
        <div className="auth-sidebar__avatar">
          <span role="img" aria-label="avatar">
            👤
          </span>
        </div>
        <div className="auth-sidebar__welcome">Welcome!</div>
      </aside>

      {/* Right area */}
      <main className="auth-main">
        <div className="auth-main__bg" />

        <div className="auth-main__content">
          <section className="auth-card">
            <h1 className="auth-card__title">Coffeemates</h1>
            <p className="auth-card__subtitle">
              Connect, sip, and share your brew.
            </p>

            {/* Buttons */}
            <div className="auth-card__top-buttons">
              <button
                className="auth-btn-outline"
                onClick={() => setUseId(false)}
              >
                Sign up with Email
              </button>

              <button
                className="auth-btn-outline"
                onClick={() => setUseId(true)}
              >
                ID
              </button>
            </div>

            {/* Sign-in section */}
            <div className="auth-form-section">
              <h2 className="auth-form-section__title">Sign-in</h2>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* Email / ID input */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="login-credential">
                    {useId ? "ID" : "Email"}
                  </label>

                  <input
                    id="login-credential"
                    className="auth-input"
                    type={useId ? "text" : "email"}
                    placeholder={useId ? "Enter your ID" : "you@example.com"}
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    id="login-password"
                    className="auth-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="auth-btn-primary">
                  Login
                </button>
              </form>

              <p className="auth-bottom-text">
                Don’t have an account? <a href="/signup">Signup Here</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
