import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7Bjzbp8t2GEhPgI3janjTlhLgUukeQW8",
  authDomain: "clone-2025-1a0e2.firebaseapp.com",
  projectId: "clone-2025-1a0e2",
  storageBucket: "clone-2025-1a0e2.firebasestorage.app",
  messagingSenderId: "880118547234",
  appId: "1:880118547234:web:100c7507f74a011aca9b7b",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
