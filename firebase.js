// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-jCuJh_QnGy5kbGs0lLQbPo1zS9_pT58",
  authDomain: "fixandget.firebaseapp.com",
  projectId: "fixandget",
  storageBucket: "fixandget.appspot.com",
  messagingSenderId: "192638652386",
  appId: "1:192638652386:web:52570ee1bc5fcf62fef3bb",
  measurementId: "G-P56F5G4D6Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore();
export const auth = getAuth();
