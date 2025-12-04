// src/utils/savedPosts.ts
const STORAGE_KEY = "coffeemates_saved_post_ids";

export const getSavedPostIds = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as string[];
  } catch {
    return [];
  }
};

const setSavedPostIds = (ids: string[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
};

/**
 * Toggle a post ID in saved list.
 * Returns the *next* saved state (true = now saved, false = now unsaved).
 */
export const toggleSavedPostId = (postId: string): boolean => {
  const ids = getSavedPostIds();
  const exists = ids.includes(postId);

  let nextIds: string[];
  let nextSaved: boolean;

  if (exists) {
    nextIds = ids.filter((id) => id !== postId);
    nextSaved = false;
  } else {
    nextIds = [...ids, postId];
    nextSaved = true;
  }

  setSavedPostIds(nextIds);
  return nextSaved;
};
