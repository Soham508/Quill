// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD15NEt0gikr_TDldtZ-r5ELtpO1LzZznE",
  authDomain: "quill-a11cf.firebaseapp.com",
  projectId: "quill-a11cf",
  storageBucket: "quill-a11cf.appspot.com",
  messagingSenderId: "662488601337",
  appId: "1:662488601337:web:e2f3f273801471d27d0828",
  measurementId: "G-412SDZ9R9H"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);