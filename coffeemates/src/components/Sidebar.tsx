// src/components/Sidebar.tsx
import React from "react";

type SidebarProps = {
  isLoggedIn: boolean;
  userName?: string;
  avatarUrl?: string;
};

const Sidebar: React.FC<SidebarProps> = ({
  isLoggedIn,
  userName = "Welcome!",
  avatarUrl,
}) => {
  if (!isLoggedIn) {
    
    return (
      <aside className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__logo">Coffeemates</div>

          <div className="sidebar__welcome">
            <div className="sidebar__avatar sidebar__avatar--placeholder" />
            <p className="sidebar__welcome-text">Welcome!</p>
          </div>
        </div>
      </aside>
    );
  }

  
  return (
    <aside className="sidebar">
      <div className="sidebar__inner">
        {/* logo */}
        <div className="sidebar__logo">Coffeemates</div>

        {/* user info */}
        <div className="sidebar__user">
          {avatarUrl ? (
            <img src={avatarUrl} alt={userName} className="sidebar__avatar" />
          ) : (
            <div className="sidebar__avatar sidebar__avatar--placeholder" />
          )}

          <div className="sidebar__user-text">
            <span className="sidebar__hello">Hello</span>
            <span className="sidebar__name">{userName}</span>
          </div>
        </div>

        <div className="sidebar__underline" />

        {/* Notification */}
        <section className="sidebar__notification">
          <div className="sidebar__notification-header">
            <span className="sidebar__notification-icon">🔔</span>
            <span className="sidebar__notification-title">Notification</span>
          </div>
          <p className="sidebar__notification-sub">New recommendation for you!</p>
          <div className="sidebar__notification-item">
            @coffeeeeena commented on your post
          </div>
          <div className="sidebar__notification-item">
            @flatwhitelover commented on your post
          </div>
        </section>

        {/* nav */}
        <nav className="sidebar__nav">
          <button className="sidebar__nav-item sidebar__nav-item--active">
            <span className="sidebar__nav-icon">🏠</span>
            <span>Home</span>
          </button>
          <button className="sidebar__nav-item">
            <span className="sidebar__nav-icon">🔍</span>
            <span>Search</span>
          </button>
          <button className="sidebar__nav-item">
            <span className="sidebar__nav-icon">💬</span>
            <span>Messages</span>
          </button>
          <button className="sidebar__nav-item">
            <span className="sidebar__nav-icon">➕</span>
            <span>Post</span>
          </button>
          <button className="sidebar__nav-item">
            <span className="sidebar__nav-icon">👤</span>
            <span>Profile</span>
          </button>
          <button className="sidebar__nav-item">
            <span className="sidebar__nav-icon">⚙️</span>
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
