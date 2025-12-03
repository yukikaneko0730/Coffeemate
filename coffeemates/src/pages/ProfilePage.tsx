// src/pages/ProfilePage.tsx
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
  const [nickname, setNickname] = useState("Yuki");
  const [bio, setBio] = useState("Berlin-based developer & designer.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("save profile", { nickname, bio });
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header__avatar" />
        <div>
          <h1>{nickname}</h1>
          <p>Member since 2025</p>
        </div>
      </header>

      <section className="profile-section">
        <h2>Profile</h2>
        <form onSubmit={handleSubmit} className="profile-form">
          <label>
            Nickname
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </label>

          <label>
            Bio
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>

          <button type="submit">Save</button>
        </form>
      </section>
    </div>
  );
};

export default ProfilePage;
