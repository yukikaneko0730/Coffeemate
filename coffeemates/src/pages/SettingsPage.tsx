// src/pages/SettingsPage.tsx
import { useState } from "react";
import { CURRENT_USER } from "../mocks/mockUsers";
import "../styles/SettingsPage.css";

type MessagePrivacy = "everyone" | "coffeemates" | "none";

export default function SettingsPage() {
  const user = CURRENT_USER.profile;

  const [email, setEmail] = useState("mia@example.com");
  const [phone, setPhone] = useState("+49 123 456789");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [pushEnabled, setPushEnabled] = useState(true);
  const [messageNotifications, setMessageNotifications] = useState(true);

  const [locationVisible, setLocationVisible] = useState(true);
  const [messagePrivacy, setMessagePrivacy] = useState<MessagePrivacy>(
    "coffeemates"
  );

  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveState("saving");

    setTimeout(() => {
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1800);
    }, 600);
  };

  return (
    <div className="cm-settings-page">
      <div className="cm-settings-inner">
        {/* HEADER */}
        <header className="cm-settings-header">
          <div>
            <h1 className="cm-settings-title">Settings</h1>
            <p className="cm-settings-subtitle">
              Adjust your account and notifications.
            </p>
          </div>
        </header>

        {/* MAIN CARD */}
        <form className="cm-settings-card" onSubmit={handleSave}>
          {/* ACCOUNT */}
          <section className="cm-settings-section">
            <div className="cm-settings-section-header">
              <h2 className="cm-settings-section-title">Account</h2>
              <p className="cm-settings-section-caption">
                Basic details used for login and contact.
              </p>
            </div>

            <div className="cm-settings-field-grid">
              <label className="cm-settings-field">
                <span className="cm-settings-label">Email</span>
                <input
                  type="email"
                  className="cm-settings-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                />
              </label>

              <label className="cm-settings-field">
                <span className="cm-settings-label">Phone</span>
                <input
                  type="tel"
                  className="cm-settings-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+49 ..."
                />
              </label>
            </div>
          </section>

          {/* PASSWORD */}
          <section className="cm-settings-section">
            <div className="cm-settings-section-header">
              <h2 className="cm-settings-section-title">Password</h2>
              <p className="cm-settings-section-caption">
                Change your password to keep your account safe.
              </p>
            </div>

            <div className="cm-settings-field-grid cm-settings-field-grid--3">
              <label className="cm-settings-field">
                <span className="cm-settings-label">Current password</span>
                <input
                  type="password"
                  className="cm-settings-input"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </label>

              <label className="cm-settings-field">
                <span className="cm-settings-label">New password</span>
                <input
                  type="password"
                  className="cm-settings-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </label>

              <label className="cm-settings-field">
                <span className="cm-settings-label">Confirm new password</span>
                <input
                  type="password"
                  className="cm-settings-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </label>
            </div>
          </section>

          {/* NOTIFICATIONS */}
          <section className="cm-settings-section">
            <div className="cm-settings-section-header">
              <h2 className="cm-settings-section-title">Notifications</h2>
              <p className="cm-settings-section-caption">
                Stay updated without overwhelming your day.
              </p>
            </div>

            <div className="cm-settings-toggle-row">
              <div>
                <p className="cm-settings-toggle-title">Push notifications</p>
                <p className="cm-settings-toggle-caption">
                  Get alerts on this device for important activity.
                </p>
              </div>
              <label className="cm-toggle">
                <input
                  type="checkbox"
                  checked={pushEnabled}
                  onChange={(e) => setPushEnabled(e.target.checked)}
                />
                <span className="cm-toggle-track">
                  <span className="cm-toggle-thumb" />
                </span>
              </label>
            </div>

            <div className="cm-settings-toggle-row">
              <div>
                <p className="cm-settings-toggle-title">
                  Message notifications
                </p>
                <p className="cm-settings-toggle-caption">
                  Show notifications when you receive a new message.
                </p>
              </div>
              <label className="cm-toggle">
                <input
                  type="checkbox"
                  checked={messageNotifications}
                  onChange={(e) =>
                    setMessageNotifications(e.target.checked)
                  }
                />
                <span className="cm-toggle-track">
                  <span className="cm-toggle-thumb" />
                </span>
              </label>
            </div>
          </section>

          {/* PRIVACY */}
          <section className="cm-settings-section cm-settings-section--last">
            <div className="cm-settings-section-header">
              <h2 className="cm-settings-section-title">Privacy</h2>
              <p className="cm-settings-section-caption">
                Control what others can see and who can reach you.
              </p>
            </div>

            <div className="cm-settings-toggle-row">
              <div>
                <p className="cm-settings-toggle-title">Show city on profile</p>
                <p className="cm-settings-toggle-caption">
                  When enabled, your city ({user.location}) is visible to
                  coffeemates.
                </p>
              </div>
              <label className="cm-toggle">
                <input
                  type="checkbox"
                  checked={locationVisible}
                  onChange={(e) => setLocationVisible(e.target.checked)}
                />
                <span className="cm-toggle-track">
                  <span className="cm-toggle-thumb" />
                </span>
              </label>
            </div>

            <div className="cm-settings-radio-group">
              <p className="cm-settings-label">Who can message you?</p>

              <div className="cm-settings-radio-row">
                <label className="cm-settings-radio-pill">
                  <input
                    type="radio"
                    name="message-privacy"
                    value="everyone"
                    checked={messagePrivacy === "everyone"}
                    onChange={() => setMessagePrivacy("everyone")}
                  />
                  <span>Everyone</span>
                </label>

                <label className="cm-settings-radio-pill">
                  <input
                    type="radio"
                    name="message-privacy"
                    value="coffeemates"
                    checked={messagePrivacy === "coffeemates"}
                    onChange={() => setMessagePrivacy("coffeemates")}
                  />
                  <span>Coffeemates only</span>
                </label>

                <label className="cm-settings-radio-pill">
                  <input
                    type="radio"
                    name="message-privacy"
                    value="none"
                    checked={messagePrivacy === "none"}
                    onChange={() => setMessagePrivacy("none")}
                  />
                  <span>No one</span>
                </label>
              </div>
            </div>
          </section>

          {/* FOOTER ACTIONS */}
          <footer className="cm-settings-footer">
            <button
              type="button"
              className="cm-settings-button cm-settings-button--ghost"
              onClick={() => {
                setEmail("mia@example.com");
                setPhone("+49 123 456789");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setPushEnabled(true);
                setMessageNotifications(true);
                setLocationVisible(true);
                setMessagePrivacy("coffeemates");
                setSaveState("idle");
              }}
            >
              Reset to defaults
            </button>

            <button
              type="submit"
              className="cm-settings-button cm-settings-button--primary"
              disabled={saveState === "saving"}
            >
              {saveState === "saving"
                ? "Saving..."
                : saveState === "saved"
                ? "Saved ✓"
                : "Save changes"}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
