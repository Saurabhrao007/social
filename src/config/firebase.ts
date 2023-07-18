// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfHSz2RL2r7y_3tuY_w_p824C9Vwdrnus",
  authDomain: "social-f11ce.firebaseapp.com",
  projectId: "social-f11ce",
  storageBucket: "social-f11ce.appspot.com",
  messagingSenderId: "1044892910142",
  appId: "1:1044892910142:web:299f1fd36e38f26f97876f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
