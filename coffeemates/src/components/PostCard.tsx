// src/components/PostCard.tsx
import React from "react";

type Post = {
  id: string;
  title: string;
  content: string;
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <article className="post-card">
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__content">{post.content}</p>
    </article>
  );
};

export default PostCard;
