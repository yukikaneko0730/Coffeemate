// src/components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

type SidebarProps = {
  isLoggedIn: boolean;
  userName?: string;
  avatarUrl?: string;
  onPostClick?: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isLoggedIn,
  userName = "Welcome!",
  avatarUrl,
  onPostClick,
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

  // helper for NavLink
  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    "sidebar__nav-item" + (isActive ? " sidebar__nav-item--active" : "");

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
          <p className="sidebar__notification-sub">
            New recommendation for you!
          </p>
          <div className="sidebar__notification-item">
            @coffeeeeena commented on your post
          </div>
          <div className="sidebar__notification-item">
            @flatwhitelover commented on your post
          </div>
        </section>

        {/* nav */}
        <nav className="sidebar__nav">
          {/* Home */}
          <NavLink to="/" className={navItemClass} end>
            <span className="sidebar__nav-icon">🏠</span>
            <span>Home</span>
          </NavLink>

          {/* Messages */}
          <NavLink to="/messages" className={navItemClass}>
            <span className="sidebar__nav-icon">💬</span>
            <span>Messages</span>
          </NavLink>

          {/* Post → open modal */}
          <button className="sidebar__nav-item" onClick={onPostClick}>
            <span className="sidebar__nav-icon">➕</span>
            <span>Post</span>
          </button>

          {/* Saved posts */}
          <NavLink to="/saved" className={navItemClass}>
            <span className="sidebar__nav-icon">⭐</span>
            <span>Saved</span>
          </NavLink>

          {/* Profile */}
          <NavLink to="/profile" className={navItemClass}>
            <span className="sidebar__nav-icon">👤</span>
            <span>Profile</span>
          </NavLink>

          {/* Settings → now real link */}
          <NavLink to="/settings" className={navItemClass}>
            <span className="sidebar__nav-icon">⚙️</span>
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
