// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ultreia2-35f3a.firebaseapp.com",
  projectId: "ultreia2-35f3a",
  storageBucket: "ultreia2-35f3a.appspot.com",
  messagingSenderId: "178214787085",
  appId: "1:178214787085:web:2c0a9139bdc785f0d59d44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);