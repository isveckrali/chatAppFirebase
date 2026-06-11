// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection  } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRsU13oZJaHvU-ZgSzVwCB16oRrQL2gtU",
  authDomain: "chatapp-dac11.firebaseapp.com",
  projectId: "chatapp-dac11",
  storageBucket: "chatapp-dac11.firebasestorage.app",
  messagingSenderId: "958241303383",
  appId: "1:958241303383:web:570b8948e0d7cfd000ec12",
  measurementId: "G-CCG58ECW20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app)

export const usersRef = collection(db, "users")

export const roomRef = collection(db, "rooms")
