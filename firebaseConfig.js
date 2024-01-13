// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoNTLpnQn_w1PvLxg2UDZDy317nWRijyY",
  authDomain: "agro-mobile-app.firebaseapp.com",
  projectId: "agro-mobile-app",
  storageBucket: "agro-mobile-app.appspot.com",
  messagingSenderId: "1025412203513",
  appId: "1:1025412203513:web:dcdded383cf504c020b328",
};

// Initialize Firebase
export const FireBase_App = initializeApp(firebaseConfig);
export const FireBase_Auth = getAuth(FireBase_App);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(FireBase_App);
const storage = getStorage(FireBase_App);
