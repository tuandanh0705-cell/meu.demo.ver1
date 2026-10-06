// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCd3W5ZKjkHczmuXvLw8yeGg0Uv3PMd9aI",
  authDomain: "meta-ecom-uni-edb5c.firebaseapp.com",
  projectId: "meta-ecom-uni-edb5c",
  storageBucket: "meta-ecom-uni-edb5c.firebasestorage.app",
  messagingSenderId: "468183240494",
  appId: "1:468183240494:web:18ff179b90f8a5f381b4bf",
  measurementId: "G-08F68GWQND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, collection, getDocs, doc, setDoc, deleteDoc, getDoc, auth };
