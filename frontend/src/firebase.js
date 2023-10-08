// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import "firebase/storage";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZc1F1Pk8gYwIIrSsby2lTvT-XYcj2qKM",
  authDomain: "idyllic-striker-360107.firebaseapp.com",
  projectId: "idyllic-striker-360107",
  storageBucket: "idyllic-striker-360107.appspot.com",
  messagingSenderId: "660278480357",
  appId: "1:660278480357:web:b48ec1dec8be6dcd6f330c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
