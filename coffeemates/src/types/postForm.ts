// src/types/postForm.ts
export type CreatePostFormValues = {
  cafeName: string;
  text: string;
  rating: number;
  googlePlaceId?: string;
  imageFile?: File | null;
};
