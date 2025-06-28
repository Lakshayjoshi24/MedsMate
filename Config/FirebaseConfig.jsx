// Config/FirebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";




// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2CLZ1QJvWoWhjiBv00T69LoWSvjr1zMo",
  authDomain: "project1-95c67.firebaseapp.com",
  projectId: "project1-95c67",
  storageBucket: "project1-95c67.appspot.com",
  messagingSenderId: "61302447565",
  appId: "1:61302447565:web:1f2a951163d83e6dd63884",
  measurementId: "G-ELFLL5G62E"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


// Initialize Firestore
const db = getFirestore(app);

export { auth, db };