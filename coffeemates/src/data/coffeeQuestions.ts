// src/data/coffeeQuestions.ts

export type CoffeeQuestionCategory = "BASICS" | "PERSONALITY" | "TASTE" | "VIBE";

export type CoffeeQuestionKey =
  | "favoriteTypeOfCoffee"
  | "neighborhood"
  | "favoriteCafeInArea"
  | "morningOrEvening"
  | "goToSnack"
  | "usualOrder"
  | "coffeeMusicCombo"
  | "coffeeVibe"
  | "cafeForFriend"
  | "cafeForDate"
  | "coffeeStyleAsPerson"
  | "favoriteBeanOrigin"
  | "roastPreference"
  | "brewingMethod"
  | "milkOfChoice"
  | "addSugarOrSyrup"
  | "whatCoffeeMeans"
  | "bestCoffeeMemory"
  | "idealCoffeeMate"
  | "ownedCafeIdea"
  | "dreamCafeToVisit";

export type CoffeeQuestion = {
  key: CoffeeQuestionKey;
  label: string;
  category: CoffeeQuestionCategory;
};

export const COFFEE_QUESTIONS: CoffeeQuestion[] = [
  // ☕ BASICS
  {
    key: "favoriteTypeOfCoffee",
    label: "Favorite type of coffee",
    category: "BASICS",
  },
  {
    key: "neighborhood",
    label: "Neighborhood you live in",
    category: "BASICS",
  },
  {
    key: "favoriteCafeInArea",
    label: "Favorite café in your area",
    category: "BASICS",
  },
  {
    key: "morningOrEvening",
    label: "Morning or evening coffee person?",
    category: "BASICS",
  },
  {
    key: "goToSnack",
    label: "Go-to pastry or snack with coffee",
    category: "BASICS",
  },

  // 💬 COFFEE PERSONALITY
  {
    key: "usualOrder",
    label: "Your usual coffee order",
    category: "PERSONALITY",
  },
  {
    key: "coffeeMusicCombo",
    label: "Coffee & music combo",
    category: "PERSONALITY",
  },
  {
    key: "coffeeVibe",
    label: "Your coffee vibe",
    category: "PERSONALITY",
  },
  {
    key: "cafeForFriend",
    label: "Café you’d take a friend to",
    category: "PERSONALITY",
  },
  {
    key: "cafeForDate",
    label: "Café you’d go on a date",
    category: "PERSONALITY",
  },
  {
    key: "coffeeStyleAsPerson",
    label: "If your coffee style were a person, it would be...",
    category: "PERSONALITY",
  },

  // ☁️ TASTE & ROAST PREFERENCES
  {
    key: "favoriteBeanOrigin",
    label: "Favorite coffee bean origin",
    category: "TASTE",
  },
  {
    key: "roastPreference",
    label: "Roast preference",
    category: "TASTE",
  },
  {
    key: "brewingMethod",
    label: "Favorite brewing method",
    category: "TASTE",
  },
  {
    key: "milkOfChoice",
    label: "Milk of choice",
    category: "TASTE",
  },
  {
    key: "addSugarOrSyrup",
    label: "Do you add sugar or syrup?",
    category: "TASTE",
  },

  // 💫 VIBE & COMMUNITY
  {
    key: "whatCoffeeMeans",
    label: "What coffee means to you",
    category: "VIBE",
  },
  {
    key: "bestCoffeeMemory",
    label: "Best coffee memory",
    category: "VIBE",
  },
  {
    key: "idealCoffeeMate",
    label: "Your ideal coffee mate",
    category: "VIBE",
  },
  {
    key: "ownedCafeIdea",
    label: "If you owned a café, what would it be like?",
    category: "VIBE",
  },
  {
    key: "dreamCafeToVisit",
    label: "Café you dream to visit one day",
    category: "VIBE",
  },
];

export const COFFEE_QUESTION_CATEGORY_LABELS: Record<
  CoffeeQuestionCategory,
  string
> = {
  BASICS: "☕ BASICS",
  PERSONALITY: "💬 COFFEE PERSONALITY",
  TASTE: "☁️ TASTE & ROAST PREFERENCES",
  VIBE: "💫 VIBE & COMMUNITY",
};

export const COFFEE_QUESTION_CATEGORY_ORDER: CoffeeQuestionCategory[] = [
  "BASICS",
  "PERSONALITY",
  "TASTE",
  "VIBE",
];
