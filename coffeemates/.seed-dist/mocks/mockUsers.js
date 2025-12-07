/// scripts/mockData.cjs
// Pure JS version of your mock users & posts for seeding Firestore

/** @typedef {{ questionKey: string, answer: string }} CoffeeProfileItem */

/** @type {{
 *   id: string;
 *   handle: string;
 *   name: string;
 *   location: string;
 *   coverImageUrl?: string;
 *   avatarUrl?: string;
 *   stats: { coffeemates: number; posts: number };
 *   bio?: string;
 *   coffeeProfile: CoffeeProfileItem[];
 *   isOwnProfile: boolean;
 *   coffeemateIds?: string[];
 *   password?: string;
 * }[]} */
const MOCK_USERS = [
  // ============  User 1: Marie  ============
  {
    id: "user_marie",
    handle: "@mariecoffeelove",
    name: "Marie",
    location: "Berlin, Germany",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 30,
      posts: 2,
    },
    bio: "Flat white enthusiast. Always hunting for cozy corners in Berlin cafés.",
    coffeeProfile: [
      { questionKey: "favoriteTypeOfCoffee", answer: "Flat White" },
      { questionKey: "favoriteCafeInArea", answer: "Never ending love story" },
      { questionKey: "coffeeVibe", answer: "Cozy" },
      { questionKey: "favoriteBeanOrigin", answer: "Mexico" },
      {
        questionKey: "ownedCafeIdea",
        answer: "Minimal, light-filled café with plants and jazz.",
      },
    ],
    isOwnProfile: false,
    coffeemateIds: ["user_alex", "user_mia"],
    password: "coffee-marie",
  },

  // ============  User 2: Alex  ============
  {
    id: "user_alex",
    handle: "@alexdrip",
    name: "Alex",
    location: "Hamburg, Germany",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 18,
      posts: 2,
    },
    bio: "Filter coffee nerd. Always chasing the perfect V60.",
    coffeeProfile: [
      { questionKey: "favoriteTypeOfCoffee", answer: "Hand-drip filter" },
      {
        questionKey: "favoriteCafeInArea",
        answer: "Elbphilharmonie Coffee Bar",
      },
      { questionKey: "coffeeVibe", answer: "Minimal & quiet" },
      { questionKey: "favoriteBeanOrigin", answer: "Ethiopia" },
      {
        questionKey: "ownedCafeIdea",
        answer: "Tiny standing-only bar with rotating single origins.",
      },
    ],
    isOwnProfile: false,
    coffeemateIds: ["user_marie", "user_mia"],
    password: "coffee-alex",
  },

  // ============  User 3: Mia  ============
  {
    id: "user_mia",
    handle: "@miacappuccino",
    name: "Mia",
    location: "Munich, Germany",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 45,
      posts: 2,
    },
    bio: "Cappuccino by day, affogato by night.",
    coffeeProfile: [
      { questionKey: "favoriteTypeOfCoffee", answer: "Cappuccino" },
      { questionKey: "favoriteCafeInArea", answer: "Isar Riverside Cafe" },
      { questionKey: "coffeeVibe", answer: "Sunny & social" },
      { questionKey: "favoriteBeanOrigin", answer: "Brazil" },
      {
        questionKey: "ownedCafeIdea",
        answer: "Gelato × espresso bar with vinyl music.",
      },
    ],
    isOwnProfile: true,
    coffeemateIds: ["user_marie", "user_alex"],
    password: "coffee-mia",
  },

  // ============  User 4: Coffeemates HQ  ============
  {
    id: "user_hq",
    handle: "@coffeemates_hq",
    name: "Coffeemates HQ",
    location: "Global",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 999,
      posts: 0,
    },
    bio: "Official Coffeemates account. Sharing updates, features and coffee love.",
    coffeeProfile: [
      {
        questionKey: "favoriteTypeOfCoffee",
        answer: "Any coffee shared with friends",
      },
      {
        questionKey: "favoriteCafeInArea",
        answer: "Your next discovery",
      },
      { questionKey: "coffeeVibe", answer: "Warm & welcoming" },
      {
        questionKey: "favoriteBeanOrigin",
        answer: "Blends from everywhere",
      },
      {
        questionKey: "ownedCafeIdea",
        answer: "Community hub where coffeemates meet for real.",
      },
    ],
    isOwnProfile: false,
    coffeemateIds: [],
    password: "coffee-hq",
  },

  // ============  User 5: Lena (Berlin)  ============
  {
    id: "user_lena",
    handle: "@lenalatte",
    name: "Lena",
    location: "Berlin, Germany",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 12,
      posts: 2,
    },
    bio: "UX designer who judges cafés by their playlists and mugs.",
    coffeeProfile: [
      {
        questionKey: "favoriteTypeOfCoffee",
        answer: "Oat milk latte",
      },
      {
        questionKey: "favoriteCafeInArea",
        answer: "Father Carpenter",
      },
      {
        questionKey: "coffeeVibe",
        answer: "Calm but not too quiet",
      },
      {
        questionKey: "favoriteBeanOrigin",
        answer: "Guatemala",
      },
      {
        questionKey: "ownedCafeIdea",
        answer: "Laptop-friendly café with plants and huge communal table.",
      },
    ],
    isOwnProfile: false,
    coffeemateIds: ["user_marie", "user_mia"],
    password: "coffee-lena",
  },

  // ============  User 6: Jonas (Berlin)  ============
  {
    id: "user_jonas",
    handle: "@jonaspourover",
    name: "Jonas",
    location: "Berlin, Germany",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 9,
      posts: 2,
    },
    bio: "Software dev who always brings his own beans on trips.",
    coffeeProfile: [
      {
        questionKey: "favoriteTypeOfCoffee",
        answer: "V60 pour-over",
      },
      {
        questionKey: "favoriteCafeInArea",
        answer: "The Barn",
      },
      {
        questionKey: "coffeeVibe",
        answer: "Industrial and focused",
      },
      {
        questionKey: "favoriteBeanOrigin",
        answer: "Kenya",
      },
      {
        questionKey: "ownedCafeIdea",
        answer: "Tiny brew bar with just 4 seats and no Wi-Fi.",
      },
    ],
    isOwnProfile: false,
    coffeemateIds: ["user_alex", "user_mia"],
    password: "coffee-jonas",
  },

  // ============  User 7: Sara (Berlin)  ============
  {
    id: "user_sara",
    handle: "@saracortado",
    name: "Sara",
    location: "Berlin, Germany",
    coverImageUrl: "",
    avatarUrl: "",
    stats: {
      coffeemates: 21,
      posts: 2,
    },
    bio: "Freelance illustrator. Sketching people in cafés since 2018.",
    coffeeProfile: [
      {
        questionKey: "favoriteTypeOfCoffee",
        answer: "Cortado",
      },
      {
        questionKey: "favoriteCafeInArea",
        answer: "Bonanza Coffee Roasters",
      },
      {
        questionKey: "coffeeVibe",
        answer: "Lively and creative",
      },
      {
        questionKey: "favoriteBeanOrigin",
        answer: "Colombia",
      },
      {
        questionKey: "ownedCafeIdea",
        answer: "Gallery café where walls change every month.",
      },
    ],
    isOwnProfile: false,
    coffeemateIds: ["user_marie", "user_lena"],
    password: "coffee-sara",
  },
];

/** @type {any[]} */
const ALL_POSTS = [
  // Marie posts
  {
    id: "marie-post-1",
    authorId: "user_marie",
    authorName: "Marie",
    authorAvatarUrl: "",
    cafeName: "Cafe Berlin",
    text:
      "My current favorite flat white in Neukölln. Smooth, nutty and not too acidic.",
    rating: 4.7,
    googlePlaceId: "",
    likeCount: 124,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [
      {
        id: "c1",
        authorName: "coffeelover_92",
        text: "This looks so cozy!",
        isOwner: false,
      },
      {
        id: "c2",
        authorName: "flatwhitelover",
        text: "Totally agree, their milk texture is perfect.",
        isOwner: false,
      },
      {
        id: "c3",
        authorName: "Marie",
        text: "Next time I’ll try their filter too ☕️",
        isOwner: true,
      },
    ],
  },
  {
    id: "marie-post-2",
    authorId: "user_marie",
    authorName: "Marie",
    authorAvatarUrl: "",
    cafeName: "Sunday Morning Cafe",
    text: "Perfect place for slow Sundays and reading time.",
    rating: 4.5,
    googlePlaceId: "",
    likeCount: 87,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [
      {
        id: "c4",
        authorName: "bookworm",
        text: "Adding this to my reading spots list 📚",
        isOwner: false,
      },
    ],
  },

  // Alex posts
  {
    id: "alex-post-1",
    authorId: "user_alex",
    authorName: "Alex",
    authorAvatarUrl: "",
    cafeName: "Harbor Roasters",
    text:
      "Super clean washed Ethiopian today. Peach and jasmine all the way.",
    rating: 4.8,
    googlePlaceId: "",
    likeCount: 64,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [
      {
        id: "c5",
        authorName: "originhunter",
        text: "That crema looks beautiful.",
        isOwner: false,
      },
    ],
  },
  {
    id: "alex-post-2",
    authorId: "user_alex",
    authorName: "Alex",
    authorAvatarUrl: "",
    cafeName: "Dockside Coffee Lab",
    text:
      "Loved their slow bar. You can watch every brew method from the counter.",
    rating: 4.4,
    googlePlaceId: "",
    likeCount: 39,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },

  // Mia posts
  {
    id: "mia-post-1",
    authorId: "user_mia",
    authorName: "Mia",
    authorAvatarUrl: "",
    cafeName: "Isar Riverside Cafe",
    text:
      "Sat by the river with a cappuccino and pistachio croissant. Perfect.",
    rating: 4.3,
    googlePlaceId: "",
    likeCount: 102,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [
      {
        id: "c6",
        authorName: "riverwalker",
        text: "This view + coffee combo is unbeatable.",
        isOwner: false,
      },
    ],
  },
  {
    id: "mia-post-2",
    authorId: "user_mia",
    authorName: "Mia",
    authorAvatarUrl: "",
    cafeName: "Gelato & Beans",
    text: "Espresso affogato with hazelnut gelato… highly recommend.",
    rating: 4.6,
    googlePlaceId: "",
    likeCount: 77,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },

  // Lena posts
  {
    id: "lena-post-1",
    authorId: "user_lena",
    authorName: "Lena",
    authorAvatarUrl: "",
    cafeName: "Father Carpenter",
    text: "Sat in the courtyard with an oat flat white and my Figma file 💻.",
    rating: 4.6,
    googlePlaceId: "",
    likeCount: 52,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },
  {
    id: "lena-post-2",
    authorId: "user_lena",
    authorName: "Lena",
    authorAvatarUrl: "",
    cafeName: "Benchmark Coffee",
    text: "Their pastries are dangerous. Came for coffee, left with 3 croissants.",
    rating: 4.4,
    googlePlaceId: "",
    likeCount: 33,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },

  // Jonas posts
  {
    id: "jonas-post-1",
    authorId: "user_jonas",
    authorName: "Jonas",
    authorAvatarUrl: "",
    cafeName: "The Barn Mitte",
    text: "Washed Kenyan on V60 — super clean sweetness, almost like blackcurrant juice.",
    rating: 4.8,
    googlePlaceId: "",
    likeCount: 41,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },
  {
    id: "jonas-post-2",
    authorId: "user_jonas",
    authorName: "Jonas",
    authorAvatarUrl: "",
    cafeName: "19grams",
    text: "Espresso flight was fun, would definitely do again.",
    rating: 4.5,
    googlePlaceId: "",
    likeCount: 29,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },

  // Sara posts
  {
    id: "sara-post-1",
    authorId: "user_sara",
    authorName: "Sara",
    authorAvatarUrl: "",
    cafeName: "Bonanza Coffee Roasters",
    text: "Sketched half the café while sipping a cortado. Light is perfect near the window.",
    rating: 4.7,
    googlePlaceId: "",
    likeCount: 58,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },
  {
    id: "sara-post-2",
    authorId: "user_sara",
    authorName: "Sara",
    authorAvatarUrl: "",
    cafeName: "No Fire No Glory",
    text: "Friendly staff + smooth espresso. Also their cups are really cute.",
    rating: 4.5,
    googlePlaceId: "",
    likeCount: 36,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },
];

module.exports = {
  MOCK_USERS,
  ALL_POSTS,
};
