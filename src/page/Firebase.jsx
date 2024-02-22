// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvlr7YHYdjaXhzhFv6b5-Bv11iKlSiqB4",
  authDomain: "pruebas-c10e5.firebaseapp.com",
  projectId: "pruebas-c10e5",
  storageBucket: "pruebas-c10e5.appspot.com",
  messagingSenderId: "927980982190",
  appId: "1:927980982190:web:b3b6349ef4223d8345823f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Storage and get a reference to the service
const storage = getStorage(app);

// Google Auth provider
const provider = new GoogleAuthProvider();

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);
// Export the Firebase services for use in your components
export { app, db, auth, storage, provider };