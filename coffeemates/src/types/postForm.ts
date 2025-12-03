// src/types/postForm.ts
export type CreatePostFormValues = {
  title: string;
  text: string;
  userRating: number;
  googlePlaceId: string;
  cafeName: string;
  imageFile?: File | null;
};
