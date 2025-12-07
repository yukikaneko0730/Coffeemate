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
  authorAvatarUrl: string;
  cafeName: string;
  text: string;
  rating: number;
  googlePlaceId?: string;

  likeCount: number;
  isLikedByCurrentUser?: boolean;
  isSavedByCurrentUser?: boolean;

  comments: FeedPostComment[];

  // for UI 
  createdAt?: Date | null;
};
