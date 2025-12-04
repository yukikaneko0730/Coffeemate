// src/scripts/seedMockUsers.ts
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { MOCK_USERS, ALL_POSTS } from "../mocks/mockUsers";

async function seed() {
  console.log("🔥 Seeding Firestore with mock users + posts...");

  // USERS
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
      mockPassword: profile.password ?? null, // dev only
    });

    console.log(`✔ User uploaded: ${profile.id}`);
  }

  // POSTS
  for (const post of ALL_POSTS) {
    await setDoc(doc(db, "posts", post.id), {
      ...post,
    });
    console.log(`✔ Post uploaded: ${post.id}`);
  }

  console.log("🎉 DONE — all mock data is now in Firestore.");
}

seed()
  .then(() => {
    console.log("✅ Seeding finished.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
