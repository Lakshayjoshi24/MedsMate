// Config/FirebaseConfig.jsx

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyC2CLZ1QJvWoWhjiBv00T69LoWSvjr1zMo",
  authDomain: "project1-95c67.firebaseapp.com",
  projectId: "project1-95c67",
  storageBucket: "project1-95c67.appspot.com",
  messagingSenderId: "61302447565",
  appId: "1:61302447565:web:1f2a951163d83e6dd63884",
  measurementId: "G-ELFLL5G62E"
};

// ✅ Initialize app
const app = initializeApp(firebaseConfig);

// ✅ Initialize auth
const auth = getAuth(app);

// ✅ Correctly export
export { auth };

export const db=getFirestore(app);