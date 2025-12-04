// src/mocks/posts.ts
import type { FeedPost } from "../types/feedPost";

export const mockPosts: FeedPost[] = [
  {
    id: "p1",
    authorId: "u1",
    cafeName: "Cafe Berlin",
    authorName: "kurzgesagt",
    authorAvatarUrl: "/avatars/owl.png", 
    text: "One of my favorite spots in Neukölln! The flat white is perfectly balanced and the playlist is always on point.",
    rating: 4.5,
    isFriend: true,
    likeCount: 37,
    isLikedByCurrentUser: false,
    comments: [
      {
        id: "c1",
        authorName: "lovecoffee",
        text: "looks nice!",
        isOwner: false,
      },
      {
        id: "c2",
        authorName: "yukichocolate",
        text: "Can I bring my dog here?",
        isOwner: false,
      },
      {
        id: "c3",
        authorName: "onakhetayo",
        text: "Here is my fave cafe!",
        isOwner: false,
      },
    ],
  },
 
];
