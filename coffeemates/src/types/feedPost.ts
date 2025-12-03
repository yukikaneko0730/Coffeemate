// src/types/feedPost.ts
export type FeedPostComment = {
  id: string;
  authorName: string;
  text: string;
  isOwner: boolean;
};

export type FeedPost = {
  id: string;

  authorId: string;
  authorName: string;
  authorAvatarUrl?: string;

  // cafe info
  cafeName: string;
  googlePlaceId?: string; // Google Places ID

  // content
  text: string;
  rating: number;         // ★ average or user rating

  // meta
  isFriend?: boolean;     // used on HomePage.tsx
  comments: FeedPostComment[];

  // social state
  isLikedByCurrentUser?: boolean;
  likeCount?: number;
  isSavedByCurrentUser?: boolean;
};
