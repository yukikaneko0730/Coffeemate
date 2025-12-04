// scripts/seed.cjs
// Simple CJS Firestore seeder using mockData.cjs

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  doc,
  setDoc,
} = require("firebase/firestore");
const { MOCK_USERS, ALL_POSTS } = require("./mockData.cjs");

// 🔧 Paste the SAME config as in src/firebase/firebaseConfig.ts
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

async function seed() {
  console.log("🔥 Seeding Firestore with mock users + posts...");

  // USERS
  for (const profile of MOCK_USERS) {
    await setDoc(doc(db, "users", profile.id), {
      id: profile.id,
      handle: profile.handle,
      name: profile.name,
      location: profile.location,
      avatarUrl: profile.avatarUrl || "",
      coverImageUrl: profile.coverImageUrl || "",
      bio: profile.bio || "",
      stats: profile.stats,
      coffeeProfile: profile.coffeeProfile,
      coffeemateIds: profile.coffeemateIds || [],
    });
    console.log(`✔ User uploaded: ${profile.id}`);
  }

  // POSTS
  for (const post of ALL_POSTS) {
    await setDoc(doc(db, "posts", post.id), post);
    console.log(`✔ Post uploaded: ${post.id}`);
  }

  console.log("🎉 DONE — all mock data is now in Firestore.");
}

// run
seed()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  });
