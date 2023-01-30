import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBa6N2OD4nT8C-FOfoowmaV0r4gIiksqQ8",
  authDomain: "book-library-c2975.firebaseapp.com",
  projectId: "book-library-c2975",
  storageBucket: "book-library-c2975.appspot.com",
  messagingSenderId: "737653748141",
  appId: "1:737653748141:web:ad30d91fc952d945e2b124",
  measurementId: "G-3NJJZZFEDF",
};

export const app = initializeApp(firebaseConfig);
export const fireDB = getFirestore(app);
