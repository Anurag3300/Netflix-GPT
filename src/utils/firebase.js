// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLwPaXc3uyg7vMOr7iPe0yUo-iLMK9QHQ",
  authDomain: "netflixgpt-7e443.firebaseapp.com",
  projectId: "netflixgpt-7e443",
  storageBucket: "netflixgpt-7e443.appspot.com",
  messagingSenderId: "499392489441",
  appId: "1:499392489441:web:1896f21b9fd16d3408d4a0",
  measurementId: "G-CQJPBFSY12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const auth = getAuth();

