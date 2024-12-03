import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC8ssHvtB2wLWAND12U5nPFGXraoSswu70",
  authDomain: "fooddelivery-aa90a.firebaseapp.com",
  projectId: "fooddelivery-aa90a",
  storageBucket: "fooddelivery-aa90a.firebasestorage.app",
  messagingSenderId: "32952891872",
  appId: "1:32952891872:web:f9796532e36bc110d19385",
  measurementId: "G-J82Y2DJ258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;