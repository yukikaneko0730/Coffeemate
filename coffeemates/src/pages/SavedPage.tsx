// src/pages/SavedPage.tsx
import React, { useState, useEffect } from "react";
import "../styles/ProfilePage.css"; // reuse same card styling
import FeedPostCard from "../components/FeedPostCard";
import type { FeedPost } from "../types/feedPost";
import { ALL_POSTS } from "../mocks/mockUsers";
import { getSavedPostIds } from "../utils/savedPosts";

const SavedPage: React.FC = () => {
  const [savedPosts, setSavedPosts] = useState<FeedPost[]>([]);

  const refreshSavedPosts = () => {
    const savedIds = getSavedPostIds();
    const filtered = ALL_POSTS.filter((post) => savedIds.includes(post.id));
    setSavedPosts(filtered);
  };

  useEffect(() => {
    refreshSavedPosts();
  }, []);

  const handleToggleSave = () => {
    // whenever a card’s Save button is clicked,
    // recompute the list (removes unsaved posts)
    refreshSavedPosts();
  };

  return (
    <div className="profile-posts-wrapper">
      <section className="profile-posts-card">
        <h2 className="profile-posts-card__title">Saved</h2>

        {savedPosts.length === 0 ? (
          <p style={{ padding: "16px 0", color: "#777", fontSize: 14 }}>
            You don’t have any saved posts yet. Tap “Save” on a post to keep it
            here.
          </p>
        ) : (
          <div className="profile-posts-list">
            {savedPosts.map((post) => (
              <FeedPostCard
                key={post.id}
                post={post}
                onToggleSave={handleToggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SavedPage;
