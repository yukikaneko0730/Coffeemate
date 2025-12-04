// src/pages/SignupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthLayout.css";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const [usePhone, setUsePhone] = useState(false);

  const [userId, setUserId] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────
  //  Google Sign Up
  // ─────────────────────────────
  const handleGoogleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      // Firestore に初期プロフィール作成
      await setDoc(doc(db, "users", fbUser.uid), {
        userId: fbUser.displayName || "new-user",
        email: fbUser.email || "",
        phone: "",
        avatarUrl: fbUser.photoURL || "",
        location: "",
        createdAt: new Date(),
      });

      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────
  //  Email / Password Sign Up
  // ─────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (usePhone) {
      setErrorMsg("Phone auth will be added later.");
      setLoading(false);
      return;
    }

    try {
      // Email signup
      const cred = await createUserWithEmailAndPassword(
        auth,
        contact,
        password
      );

      const fbUser = cred.user;

      // Firestore に初期プロフィール作成
      await setDoc(doc(db, "users", fbUser.uid), {
        userId: userId,
        email: contact,
        phone: "",
        avatarUrl: "",
        location: "",
        createdAt: new Date(),
      });

      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────
  //  UI 表示
  // ─────────────────────────────
  return (
    <div className="auth-layout">
      {/* ——— Left Sidebar ——— */}
      <aside className="auth-sidebar">
        <div className="auth-sidebar__logo">Coffeemates</div>
        <div className="auth-sidebar__avatar">👤</div>
        <div className="auth-sidebar__welcome">Welcome!</div>
      </aside>

      {/* ——— Main ——— */}
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

              {/* ---- Google / Tel ---- */}
              <div className="auth-social-row">
                <button
                  className="auth-btn-social auth-btn-social--primary"
                  type="button"
                  onClick={handleGoogleClick}
                >
                  Sign up with Google
                </button>

                <button
                  className="auth-btn-social"
                  onClick={() => setUsePhone(true)}
                  type="button"
                >
                  Sign up with Tel number
                </button>
              </div>

              <div className="auth-or">
                <div className="auth-or__line" />
                <span>OR</span>
                <div className="auth-or__line" />
              </div>

              {/* ---- Form ---- */}
              <form className="auth-form" onSubmit={handleSubmit}>
                {/* User ID */}
                <div className="auth-field-group">
                  <label className="auth-label">User ID</label>
                  <input
                    className="auth-input"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>

                {/* Email or Tel */}
                <div className="auth-field-group">
                  <label className="auth-label">
                    {usePhone ? "Phone number" : "Email"}
                  </label>
                  <input
                    className="auth-input"
                    type={usePhone ? "tel" : "email"}
                    placeholder={usePhone ? "+49 170 1234567" : "you@example.com"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                {!usePhone && (
                  <div className="auth-field-group">
                    <label className="auth-label">Password</label>
                    <input
                      className="auth-input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                )}

                {errorMsg && (
                  <p className="auth-error">{errorMsg}</p>
                )}

                <button type="submit" className="auth-btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
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
