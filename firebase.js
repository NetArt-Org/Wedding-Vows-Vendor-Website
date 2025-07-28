// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMXKCmEgMeZTFj7iLHkqOynQ_X72wHXWE",
  authDomain: "wvvendor.firebaseapp.com",
  projectId: "wvvendor",
  storageBucket: "wvvendor.firebasestorage.app",
  messagingSenderId: "227868994675",
  appId: "1:227868994675:web:8637e5fd48dfbec2934e06"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Auth Instance
const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

export { auth, provider };