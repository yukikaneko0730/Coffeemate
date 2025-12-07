// src/firebase/createPost.ts
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type { CreatePostFormValues } from "../types/postForm";

/**
 * Create a new post document in Firestore using the same schema as ALL_POSTS.
 */
export async function createPostInFirestore(options: {
  values: CreatePostFormValues;
  userUid: string;
  userName: string;
  userAvatarUrl: string;
}) {
  const { values, userUid, userName, userAvatarUrl } = options;

  const docData = {
    // ---- fields compatible with ALL_POSTS / FeedPost ----
    authorId: userUid,
    authorName: userName,
    authorAvatarUrl: userAvatarUrl ?? "",
    cafeName: values.cafeName,
    text: values.text,
    rating: values.rating,
    googlePlaceId: values.googlePlaceId ?? "", // いまは空でもOK
    likeCount: 0,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],

    // extra meta
    createdAt: serverTimestamp(),
  };

  const ref = await addDoc(collection(db, "posts"), docData);
  return ref.id;
}
