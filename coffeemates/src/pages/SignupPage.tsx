import React, { useState } from "react";
import "../styles/AuthLayout.css";

const SignupPage: React.FC = () => {
  const [usePhone, setUsePhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // usePhone が true なら電話番号でサインアップ
    // false なら email でサインアップ
    // ここにFirebase Auth (email/password + phone auth) の処理を入れる想定
  };

  const handleTelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsePhone(true);
  };

  const handleGoogleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsePhone(false); // Google押したらまたEmail中心のモードに戻す想定
    // ここにGoogleログイン処理
  };

  return (
    <div className="auth-layout">
      {/* 左サイドバー */}
      <aside className="auth-sidebar">
        <div className="auth-sidebar__logo">Coffeemates</div>
        <div className="auth-sidebar__avatar">
          <span role="img" aria-label="avatar">
            👤
          </span>
        </div>
        <div className="auth-sidebar__welcome">Welcome!</div>
      </aside>

      {/* 右側メイン */}
      <main className="auth-main">
        <div className="auth-main__bg" />

        <div className="auth-main__content">
          <section className="auth-card">
            <h1 className="auth-card__title">Coffeemates</h1>
            <p className="auth-card__subtitle">
              Connect, sip, and share your brew.
            </p>

            <div className="auth-form-section">
              <h2 className="auth-form-section__title">Create Account</h2>

              {/* Google / Tel ボタン */}
              <div className="auth-social-row">
                <button
                  className="auth-btn-social auth-btn-social--primary"
                  onClick={handleGoogleClick}
                  type="button"
                >
                  {/* アイコンはあとで入れてOK */}
                  <span>Sign up with Google</span>
                </button>

                <button
                  className="auth-btn-social"
                  onClick={handleTelClick}
                  type="button"
                >
                  {/* ここをもともと Facebook だった部分の代わりに Tel に */}
                  <span>Sign up with Tel number</span>
                </button>
              </div>

              <div className="auth-or">
                <div className="auth-or__line" />
                <span>OR</span>
                <div className="auth-or__line" />
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* User ID */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="signup-userid">
                    User ID
                  </label>
                  <input
                    id="signup-userid"
                    className="auth-input"
                    type="text"
                    required
                  />
                </div>

                {/* Email / Tel 切り替え */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="signup-contact">
                    {usePhone ? "Phone number" : "Email"}
                  </label>
                  <input
                    id="signup-contact"
                    className="auth-input"
                    type={usePhone ? "tel" : "email"}
                    placeholder={
                      usePhone ? "+49 170 1234567" : "you@example.com"
                    }
                    required
                  />
                </div>

                {/* Password */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    className="auth-input"
                    type="password"
                    required
                  />
                </div>

                <button type="submit" className="auth-btn-primary">
                  Create Account
                </button>
              </form>

              <p className="auth-bottom-text">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
