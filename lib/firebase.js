import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Додайте цей імпорт
import { getAuth } from "firebase/auth";     // Додайте цей імпорт
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Ініціалізація додатка
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Ініціалізація сервісів
export const db = getDatabase(app); 
export const auth = getAuth(app);

// Аналітика працює тільки в браузері
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { app };