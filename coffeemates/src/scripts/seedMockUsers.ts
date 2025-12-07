// src/scripts/seedMockUsers.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { MOCK_USERS, ALL_POSTS } from "../mocks/mockUsers";

const firebaseConfig = {
  apiKey: "AIzaSyCPRs7NzjpTUkk3mhZcsuICBcgr8WmO5hE",
  authDomain: "coffeemate-fa21e.firebaseapp.com",
  projectId: "coffeemate-fa21e",
  storageBucket: "coffeemate-fa21e.firebasestorage.app",
  messagingSenderId: "901623556100",
  appId: "1:901623556100:web:deacc52bd251f181e0ad51",
  measurementId: "G-BNNGWPW87K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// helper: profile.id から email / password を決める
const getAuthCredentialsForProfile = (profileId: string) => {
  switch (profileId) {
    case "user_marie":
      return { email: "marie@example.com", password: "coffee-marie" };
    case "user_alex":
      return { email: "alex@example.com", password: "coffee-alex" };
    case "user_mia":
      return { email: "mia@example.com", password: "coffee-mia" };
    case "user_hq":
      return { email: "hq@example.com", password: "coffee-hq" };
    default:
      // fallback（念のため）
      return {
        email: `${profileId}@example.com`,
        password: "coffeemates-123",
      };
  }
};

async function seed() {
  console.log("🔥 Seeding Firestore + Auth with mock users & posts...");

  /** 1) Auth users */
  for (const { profile } of MOCK_USERS) {
    const { email, password } = getAuthCredentialsForProfile(profile.id);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log(`✔ Auth user created: ${email}`);
    } catch (err: any) {
      // 既に作ってある場合はスキップする
      if (err?.code === "auth/email-already-in-use") {
        console.log(`(i) Auth user already exists, skipping: ${email}`);
      } else {
        console.error(`❌ Failed to create auth user: ${email}`, err);
      }
    }
  }

  /** 2) Firestore users */
  for (const { profile } of MOCK_USERS) {
    await setDoc(doc(db, "users", profile.id), {
      id: profile.id,
      handle: profile.handle,
      name: profile.name,
      location: profile.location,
      avatarUrl: profile.avatarUrl ?? null,
      coverImageUrl: profile.coverImageUrl ?? null,
      bio: profile.bio ?? "",
      stats: profile.stats,
      coffeeProfile: profile.coffeeProfile,
      coffeemateIds: profile.coffeemateIds ?? [],
    });

    console.log(`✔ Firestore user uploaded: ${profile.id}`);
  }

  /** 3) Firestore posts */
  for (const post of ALL_POSTS) {
    await setDoc(doc(db, "posts", post.id), post);
    console.log(`✔ Post uploaded: ${post.id}`);
  }

  console.log("🎉 DONE — Auth users + Firestore data are seeded.");
}

seed().catch((err) => {
  console.error("❌ Seed failed", err);
});
