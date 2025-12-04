// src/App.tsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";
import SavedPage from "./pages/SavedPage";
import SettingsPage from "./pages/SettingsPage";  

import CreatePostModal from "./components/CreatePostModal";
import type { CreatePostFormValues } from "./types/postForm";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { CURRENT_USER } from "./mocks/mockUsers";

import "./styles/AppShell.css";

const App: React.FC = () => {
  const location = useLocation();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  const handleCreatePost = async (values: CreatePostFormValues) => {
    console.log("New post submitted:", values);
  };

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  // Auth layout only for login / signup
  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    );
  }

  // Main app shell
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <Sidebar
          isLoggedIn={true}
          userName={CURRENT_USER.profile.name}
          avatarUrl={CURRENT_USER.profile.avatarUrl}
          onPostClick={openPostModal}
        />
      </aside>

      <main className="app-shell__content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/settings" element={<SettingsPage />} /> {/* ❤️ 追加 */}
        </Routes>
      </main>

      <CreatePostModal
        isOpen={isPostModalOpen}
        onClose={closePostModal}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default App;
