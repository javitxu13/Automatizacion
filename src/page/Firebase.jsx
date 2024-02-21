// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBvlr7YHYdjaXhzhFv6b5-Bv11iKlSiqB4",

  authDomain: "pruebas-c10e5.firebaseapp.com",

  projectId: "pruebas-c10e5",

  storageBucket: "pruebas-c10e5.appspot.com",

  messagingSenderId: "927980982190",

  appId: "1:927980982190:web:b3b6349ef4223d8345823f"

};


export const provider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
