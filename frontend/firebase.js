// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpi9av0c-5FwwgUWYHVzkiSJ11er9AEU8",
  authDomain: "vingo-food-delivery-9dd5d.firebaseapp.com",
  projectId: "vingo-food-delivery-9dd5d",
  storageBucket: "vingo-food-delivery-9dd5d.firebasestorage.app",
  messagingSenderId: "423134688945",
  appId: "1:423134688945:web:a7a954a0ece7fa3b14d490"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }