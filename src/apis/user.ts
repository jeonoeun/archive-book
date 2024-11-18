import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

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
const auth = getAuth(app);

// 회원가입
export const signUpRequest = async (
  email: string,
  password: string,
  nickname: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      nickname: nickname,
      createdAt: serverTimestamp(),
      book: [],
    });

    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      console.error("회원가입 실패:", error);
      throw new Error(error.message);
    }
  }
};

// 로그인
export const signInRequest = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("로그인 실패:", error);
      throw new Error(error.message);
    }
  }
};

// 로그아웃
export const signOutRequest = async () => {
  try {
    await signOut(auth);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("로그아웃 실패:", error);
      throw new Error(error.message);
    }
  }
};

// 사용자 정보
export const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;

        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          console.error("Firestore에서 사용자를 찾을 수 없습니다.");
          return resolve(user); // Firestore에 정보가 없으면 기본 정보만 반환
        }

        const userData = { ...user, ...userDoc.data() };
        resolve(userData);
      } else {
        reject("No user is currently logged in");
      }
    });
  });
};
