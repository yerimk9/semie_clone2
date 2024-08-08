import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2MMXpgreQUoNhRpU41vKOd484URAAKnc",
  authDomain: "semie-clonecoding.firebaseapp.com",
  projectId: "semie-clonecoding",
  storageBucket: "semie-clonecoding.appspot.com",
  messagingSenderId: "375650326290",
  appId: "1:375650326290:web:c70f5891ed4236104585cb",
  measurementId: "G-Y8ZWJMWPFE",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
