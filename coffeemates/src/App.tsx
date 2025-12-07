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

import { db } from "./firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { useAuth } from "./contexts/AuthContext";

import "./styles/AppShell.css";

const App: React.FC = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const openPostModal = () => setIsPostModalOpen(true);
  const closePostModal = () => setIsPostModalOpen(false);

  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/signup";

  // ----- auth loading -----
  if (loading) {
    return (
      <div className="app-shell app-shell--center">
        <p>Checking your coffeemates account...</p>
      </div>
    );
  }

  // ----- not logged in → only login/signup -----
  if (!user || isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  // ----- logged in: create post handler -----
  const handleCreatePost = async (values: CreatePostFormValues) => {
    const authorProfile = CURRENT_USER.profile; // 今はモックで表示

    try {
      await addDoc(collection(db, "posts"), {
        authorId: user.uid,
        authorName: authorProfile.name,
        authorAvatarUrl: authorProfile.avatarUrl ?? "",
        cafeName: values.cafeName,
        text: values.text,
        rating: values.rating,
        googlePlaceId: values.googlePlaceId ?? "",

        likeCount: 0,
        isLikedByCurrentUser: false,
        isSavedByCurrentUser: false,
        comments: [],

        createdAt: serverTimestamp(),
      });

      closePostModal();
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Could not publish your post. Please try again.");
    }
  };

  // ----- main app shell -----
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
          <Route path="/settings" element={<SettingsPage />} />
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
