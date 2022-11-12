// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhvnQkrwy08_IB0Xpa8B7S9QWkI6dhioQ",
  authDomain: "api-firebase-fe4de.firebaseapp.com",
  projectId: "api-firebase-fe4de",
  storageBucket: "api-firebase-fe4de.appspot.com",
  messagingSenderId: "1069752926210",
  appId: "1:1069752926210:web:2690a177fd14b511ad671b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
