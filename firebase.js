import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAgCYW0Q9BkTGkaMfLInLIIR83_ERNR468",
  authDomain: "wedding-vow.firebaseapp.com",
  projectId: "wedding-vow",
  storageBucket: "wedding-vow.appspot.com", // fixed typo
  messagingSenderId: "106307862876",
  appId: "1:106307862876:web:ed861d90611bbda5484199",
  measurementId: "G-6T71DWGF0X"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { auth, analytics }; 