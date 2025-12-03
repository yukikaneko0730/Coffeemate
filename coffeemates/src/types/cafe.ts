// src/types/cafe.ts

export type Cafe = {
  id: string;
  name: string;
  shortLabel: string;
  imageUrl: string;
  /** One-line address for UI */
  addressLine: string;
  /** e.g. "5 min walk · Open now" */
  distanceText: string;
  walkMinutes: number;
  isOpen: boolean;
  tagline: string;
  tags: string[];
};
