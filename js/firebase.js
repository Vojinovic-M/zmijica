// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXcQMW6gCw6nPk0ZL67D1KwZD2QPphvvw",
  authDomain: "zmijica-ad323.firebaseapp.com",
  projectId: "zmijica-ad323",
  storageBucket: "zmijica-ad323.firebasestorage.app",
  messagingSenderId: "889694792069",
  appId: "1:889694792069:web:ae243366846c4d39747cec",
  measurementId: "G-WBE9Q924EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);