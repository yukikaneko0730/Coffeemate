// src/types/Post.ts
export type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
};

export type FeedPost = {
  id: string;
  cafeName: string;
  authorName: string;
  text: string;
  tags: string[];
  rating: number;
  isFriend: boolean;
};
