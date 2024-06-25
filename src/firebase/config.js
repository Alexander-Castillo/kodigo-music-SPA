// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCenO1fJzfwxBMVJ9mygFY-j1foHPfOy8",
    authDomain: "kodigo-music-spa.firebaseapp.com",
    projectId: "kodigo-music-spa",
    storageBucket: "kodigo-music-spa.appspot.com",
    messagingSenderId: "787833308600",
    appId: "1:787833308600:web:a4711a8d8e8b7319e7bb4d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);