type CoffeeProfileItem = {
  questionKey: string;
  answer: string;
};

type SeedProfile = {
  id: string;
  handle: string;
  name: string;
  location: string;
  coverImageUrl?: string;
  avatarUrl?: string;
  stats: {
    coffeemates: number;
    posts: number;
  };
  bio?: string;
  coffeeProfile: CoffeeProfileItem[];
  isOwnProfile: boolean;
  coffeemateIds: string[];
  password: string;
};

type SeedPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  cafeName: string;
  text: string;
  rating: number;
  googlePlaceId?: string;
  likeCount: number;
  isLikedByCurrentUser?: boolean;
  isSavedByCurrentUser?: boolean;
  comments: {
    id: string;
    authorName: string;
    text: string;
    isOwner: boolean;
  }[];
};

export const seedUsers: SeedProfile[] = [
  {
    id: "user_marie",
    handle: "@mariecoffeelove",
    name: "Marie",
    location: "Berlin, Germany",
    coverImageUrl: "/photo/mariecover.png",
    avatarUrl: "/photo/marieicon.png",
    stats: { coffeemates: 30, posts: 2 },
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
  {
    id: "user_alex",
    handle: "@alexdrip",
    name: "Alex",
    location: "Hamburg, Germany",
    coverImageUrl: "/photo/alexcover.png",
    avatarUrl: "/photo/alexicon.png",
    stats: { coffeemates: 18, posts: 2 },
    bio: "Filter coffee nerd. Always chasing the perfect V60.",
    coffeeProfile: [
      { questionKey: "favoriteTypeOfCoffee", answer: "Hand-drip filter" },
      { questionKey: "favoriteCafeInArea", answer: "Elbphilharmonie Coffee Bar" },
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
  {
    id: "user_mia",
    handle: "@miacappuccino",
    name: "Mia",
    location: "Munich, Germany",
    coverImageUrl: "/photo/miacover.png",
    avatarUrl: "/photo/miaicon.png",
    stats: { coffeemates: 45, posts: 2 },
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
  {
    id: "user_hq",
    handle: "@coffeemates_hq",
    name: "Coffeemates HQ",
    location: "Global",
    coverImageUrl: "/photo/coffeematecover.png",
    avatarUrl: "/photo/coffeemateicon.png",
    stats: { coffeemates: 999, posts: 0 },
    bio: "Official Coffeemates account. Sharing updates, features and coffee love.",
    coffeeProfile: [
      { questionKey: "favoriteTypeOfCoffee", answer: "Any coffee shared with friends" },
      { questionKey: "favoriteCafeInArea", answer: "Your next discovery" },
      { questionKey: "coffeeVibe", answer: "Warm & welcoming" },
      { questionKey: "favoriteBeanOrigin", answer: "Blends from everywhere" },
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

export const seedPosts: SeedPost[] = [
  {
    id: "marie-post-1",
    authorId: "user_marie",
    authorName: "Marie",
    authorAvatarUrl: "/photo/marieicon.png",
    cafeName: "Cafe Berlin",
    text:
      "My current favorite flat white in Neukölln. Smooth, nutty and not too acidic.",
    rating: 4.7,
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
    authorAvatarUrl: "/photo/marieicon.png",
    cafeName: "Sunday Morning Cafe",
    text: "Perfect place for slow Sundays and reading time.",
    rating: 4.5,
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
  {
    id: "alex-post-1",
    authorId: "user_alex",
    authorName: "Alex",
    authorAvatarUrl: "/photo/alexicon.png",
    cafeName: "Harbor Roasters",
    text: "Super clean washed Ethiopian today. Peach and jasmine all the way.",
    rating: 4.8,
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
    authorAvatarUrl: "/photo/alexicon.png",
    cafeName: "Dockside Coffee Lab",
    text: "Loved their slow bar. You can watch every brew method from the counter.",
    rating: 4.4,
    likeCount: 39,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },
  {
    id: "mia-post-1",
    authorId: "user_mia",
    authorName: "Mia",
    authorAvatarUrl: "/photo/miaicon.png",
    cafeName: "Isar Riverside Cafe",
    text: "Sat by the river with a cappuccino and pistachio croissant. Perfect.",
    rating: 4.3,
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
    authorAvatarUrl: "/photo/miaicon.png",
    cafeName: "Gelato & Beans",
    text: "Espresso affogato with hazelnut gelato… highly recommend.",
    rating: 4.6,
    likeCount: 77,
    isLikedByCurrentUser: false,
    isSavedByCurrentUser: false,
    comments: [],
  },
];
