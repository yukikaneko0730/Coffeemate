// avatar / cover images
import marieIcon from "../photo/marieicon.png";
import marieCover from "../photo/mariecover.png";
import alexIcon from "../photo/alexicon.png";
import alexCover from "../photo/alexcover.png";
import miaIcon from "../photo/miaicon.png";
import miaCover from "../photo/miacover.png";
import hqIcon from "../photo/coffeemateicon.png";
import hqCover from "../photo/coffeematecover.png";
// ============  User 1: Marie  ============
const marieProfile = {
    id: "user_marie",
    handle: "@mariecoffeelove",
    name: "Marie",
    location: "Berlin, Germany",
    coverImageUrl: marieCover,
    avatarUrl: marieIcon,
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
    // login password (for dev / mock)
    password: "coffee-marie",
};
const mariePosts = [
    {
        id: "marie-post-1",
        authorId: marieProfile.id,
        authorName: marieProfile.name,
        authorAvatarUrl: marieProfile.avatarUrl ?? "",
        cafeName: "Cafe Berlin",
        text: "My current favorite flat white in Neukölln. Smooth, nutty and not too acidic.",
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
        authorId: marieProfile.id,
        authorName: marieProfile.name,
        authorAvatarUrl: marieProfile.avatarUrl ?? "",
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
];
// ============  User 2: Alex  ============
const alexProfile = {
    id: "user_alex",
    handle: "@alexdrip",
    name: "Alex",
    location: "Hamburg, Germany",
    coverImageUrl: alexCover,
    avatarUrl: alexIcon,
    stats: {
        coffeemates: 18,
        posts: 2,
    },
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
};
const alexPosts = [
    {
        id: "alex-post-1",
        authorId: alexProfile.id,
        authorName: alexProfile.name,
        authorAvatarUrl: alexProfile.avatarUrl ?? "",
        cafeName: "Harbor Roasters",
        text: "Super clean washed Ethiopian today. Peach and jasmine all the way.",
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
        authorId: alexProfile.id,
        authorName: alexProfile.name,
        authorAvatarUrl: alexProfile.avatarUrl ?? "",
        cafeName: "Dockside Coffee Lab",
        text: "Loved their slow bar. You can watch every brew method from the counter.",
        rating: 4.4,
        googlePlaceId: "",
        likeCount: 39,
        isLikedByCurrentUser: false,
        isSavedByCurrentUser: false,
        comments: [],
    },
];
// ============  User 3: Mia  ============
const miaProfile = {
    id: "user_mia",
    handle: "@miacappuccino",
    name: "Mia",
    location: "Munich, Germany",
    coverImageUrl: miaCover,
    avatarUrl: miaIcon,
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
    // Mia is the current logged-in mock user
    isOwnProfile: true,
    coffeemateIds: ["user_marie", "user_alex"],
    password: "coffee-mia",
};
const miaPosts = [
    {
        id: "mia-post-1",
        authorId: miaProfile.id,
        authorName: miaProfile.name,
        authorAvatarUrl: miaProfile.avatarUrl ?? "",
        cafeName: "Isar Riverside Cafe",
        text: "Sat by the river with a cappuccino and pistachio croissant. Perfect.",
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
        authorId: miaProfile.id,
        authorName: miaProfile.name,
        authorAvatarUrl: miaProfile.avatarUrl ?? "",
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
// ============  User 4: Coffeemates HQ  ============
const hqProfile = {
    id: "user_hq",
    handle: "@coffeemates_hq",
    name: "Coffeemates HQ",
    location: "Global",
    coverImageUrl: hqCover,
    avatarUrl: hqIcon,
    stats: {
        coffeemates: 999,
        posts: 0,
    },
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
    coffeemateIds: [], // HQ is special
    password: "coffee-hq",
};
// ============  Export  ============
export const MOCK_USERS = [
    { profile: marieProfile, posts: mariePosts },
    { profile: alexProfile, posts: alexPosts },
    { profile: miaProfile, posts: miaPosts },
    { profile: hqProfile, posts: [] },
];
// all posts flattened
export const ALL_POSTS = [
    ...mariePosts,
    ...alexPosts,
    ...miaPosts,
];
// convenience: current logged-in user (Mia for now)
export const CURRENT_USER = MOCK_USERS[2];
// If you want to test logging in as HQ instead, you could temporarily do:
// export const CURRENT_USER: UserWithPosts = {
//   profile: hqProfile,
//   posts: [],
// };
