// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOoXS6eITby8o6FKKKJgK10yWMEQSnSO4",
  authDomain: "cryptohive-289bf.firebaseapp.com",
  databaseURL: "https://cryptohive-289bf-default-rtdb.firebaseio.com",
  projectId: "cryptohive-289bf",
  storageBucket: "cryptohive-289bf.appspot.com",
  messagingSenderId: "397521332560",
  appId: "1:397521332560:web:3becfd579a4442b384e455"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
