// scripts/mockData.cjs
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
    // You can store public image URLs here later if you deploy assets
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
];

module.exports = {
  MOCK_USERS,
  ALL_POSTS,
};
