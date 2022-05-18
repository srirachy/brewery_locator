import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import firebase from 'firebase/app';
const fbaseApiKey = process.env.REACT_APP_API_KEY_FBASE;
const firebaseConfig = {
  apiKey: fbaseApiKey,
  authDomain: "locator-project-349819.firebaseapp.com",
  projectId: "locator-project-349819",
  storageBucket: "locator-project-349819.appspot.com",
  messagingSenderId: "282123509408",
  appId: "1:282123509408:web:15233d19de37c90725f3c5",
  measurementId: "G-VD66246BS3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);