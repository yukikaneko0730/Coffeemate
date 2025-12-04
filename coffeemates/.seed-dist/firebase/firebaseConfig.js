// src/firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
