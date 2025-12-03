// src/layouts/MainLayout.tsx
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const MainLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="logo">coffeemates</div>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/chat">Chat</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </aside>

      <div className="main">
        <header className="topbar">
          <button onClick={logout}>Logout</button>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
