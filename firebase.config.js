// Import the functions you need from the SDKs you need
import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIk-xeiFCNL9Oslet5prkN5mQHavPcoeI",
  authDomain: "agro-mobile-app-32c8a.firebaseapp.com",
  projectId: "agro-mobile-app-32c8a",
  storageBucket: "agro-mobile-app-32c8a.appspot.com",
  messagingSenderId: "144593786234",
  appId: "1:144593786234:web:09838a63e5f4eabdf232c3",
  measurementId: "G-L0336JZ6NN",
};
// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
export const FireBase_Auth = getAuth(app);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);

export { app, storage };
