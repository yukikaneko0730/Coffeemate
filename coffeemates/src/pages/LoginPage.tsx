// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/AuthLayout.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // default values for the demo account (Mia)
  const [email, setEmail] = useState("mia@example.com");
  const [password, setPassword] = useState("coffee-mia");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      // Firebase Auth login (email + password)
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      setErrorMsg("Could not sign in. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      {/* left sidebar */}
      <aside className="auth-sidebar">
        <div className="auth-sidebar__logo">Coffeemates</div>
        <div className="auth-sidebar__avatar">
          <span role="img" aria-label="avatar">
            👤
          </span>
        </div>
        <div className="auth-sidebar__welcome">Welcome back!</div>
      </aside>

      {/* right side main area */}
      <main className="auth-main">
        <div className="auth-main__bg" />

        <div className="auth-main__content">
          <section className="auth-card">
            <h1 className="auth-card__title">Coffeemates</h1>
            <p className="auth-card__subtitle">
              Log in and see what your coffeemates are sipping.
            </p>

            <div className="auth-form-section">
              <h2 className="auth-form-section__title">Login</h2>

              <form className="auth-form" onSubmit={handleSubmit}>
                {/* email */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    id="login-email"
                    className="auth-input"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* password */}
                <div className="auth-field-group">
                  <label className="auth-label" htmlFor="login-password">
                    Password
                  </label>
                  <input
                    id="login-password"
                    className="auth-input"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {errorMsg && <p className="auth-error">{errorMsg}</p>}

                <button
                  type="submit"
                  className="auth-btn-primary"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <p className="auth-bottom-text">
                Don&apos;t have an account?{" "}
                <Link to="/signup">Create one</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
