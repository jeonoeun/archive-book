import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5wBFFRaEBPrauMrfEmZWdjJlqSkT-DWg",
  authDomain: "archive-book-23724.firebaseapp.com",
  projectId: "archive-book-23724",
  storageBucket: "archive-book-23724.firebasestorage.app",
  messagingSenderId: "624317058972",
  appId: "1:624317058972:web:5f596ec68f1fa3f8f08259",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// 신규 사용자 계정
export const signUp = async (email: string, password: string) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user);
    return user;
  } catch (error: any) {
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw new Error(error.message);
  }
};
