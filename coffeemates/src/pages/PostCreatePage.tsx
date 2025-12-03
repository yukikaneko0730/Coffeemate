//src/pages/PostCreatePage.tsx
import React, { useState } from "react";

const PostCreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("create post", { title, body });
  };

  return (
    <div className="post-create-page">
      <h1>New Coffeemates Post</h1>

      <form className="post-create-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Looking for a coffee buddy…"
          />
        </label>

        <label>
          Details
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Time, place, and any details you want to share."
          />
        </label>

        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default PostCreatePage;
