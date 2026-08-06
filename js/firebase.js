import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjJTD6oK_vyC0PiajCfy4YJd4P3gRfZlY",
  authDomain: "tmfashions-8d8d3.firebaseapp.com",
  projectId: "tmfashions-8d8d3",
  storageBucket: "tmfashions-8d8d3.firebasestorage.app",
  messagingSenderId: "1027479763685",
  appId: "1:1027479763685:web:9dd0750de23e3c4e65320c",
  measurementId: "G-M4XLZEBY19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
