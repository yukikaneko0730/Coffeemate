// src/hooks/useUserProfile.ts
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { CURRENT_USER } from "../mocks/mockUsers";

export type UserProfileData = {
  uid: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  location?: string;
  bio?: string;
};

type State =
  | { loading: true; error: null; profile: null }
  | { loading: false; error: string | null; profile: UserProfileData | null };

export const useUserProfile = (): State => {
  const { user } = useAuth();
  const [state, setState] = useState<State>({
    loading: true,
    error: null,
    profile: null,
  });

  useEffect(() => {
    const run = async () => {
      if (!user) {
        setState({ loading: false, error: null, profile: null });
        return;
      }

      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          // 初回ログインなどで user ドキュメントがない場合、
          // 最低限のデータを作っておく
          const fallback = {
            userId: user.displayName || CURRENT_USER.profile.handle || "new-user",
            name: user.displayName || CURRENT_USER.profile.name,
            email: user.email || "",
            phone: "",
            avatarUrl: CURRENT_USER.profile.avatarUrl || "",
            location: CURRENT_USER.profile.location,
            bio: CURRENT_USER.profile.bio || "",
          };

          await setDoc(ref, fallback, { merge: true });

          setState({
            loading: false,
            error: null,
            profile: {
              uid: user.uid,
              ...fallback,
            },
          });
        } else {
          const data = snap.data() as Partial<UserProfileData>;
          setState({
            loading: false,
            error: null,
            profile: {
              uid: user.uid,
              userId: data.userId || CURRENT_USER.profile.handle,
              name: data.name || CURRENT_USER.profile.name,
              email: data.email || user.email || "",
              phone: data.phone,
              avatarUrl: data.avatarUrl || CURRENT_USER.profile.avatarUrl,
              location: data.location || CURRENT_USER.profile.location,
              bio: data.bio || CURRENT_USER.profile.bio,
            },
          });
        }
      } catch (err: any) {
        console.error(err);
        setState({
          loading: false,
          error: "Failed to load profile.",
          profile: null,
        });
      }
    };

    run();
  }, [user]);

  return state;
};
