import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
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
      books: [],
    });

    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
      console.error("회원가입 실패:", error);
      throw new Error(error.message);
    }
  }
};

export const signInRequest = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;

        if (typeof window !== "undefined") {
          localStorage.setItem("userUid", userId || "");
        }
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("로그인 실패:", error);
      throw new Error(error.message);
    }
  }
};

export const signOutRequest = async () => {
  try {
    await signOut(auth);
    if (typeof window !== "undefined") {
      localStorage.removeItem("userUid");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("로그아웃 실패:", error);
      throw new Error(error.message);
    }
  }
};

export const getUserInfo = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;

        if (typeof window !== "undefined") {
          localStorage.setItem("userUid", userId || "");
        }

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

export const addBookRecord = async (isbn, book, formData) => {
  try {
    const useUid = localStorage.getItem("userUid") || "";
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, useUid);
    const res = await getDoc(docRef);
    const docData = res.data();

    const updatedBooks = [
      {
        isbn,
        title: book.title,
        authors: book.authors,
        cover: book.thumbnail,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
        rate: formData.rate,
        comment: formData.comment,
      },
      ...docData?.books,
    ];

    await updateDoc(docRef, { books: updatedBooks });
  } catch (error) {
    if (error instanceof Error) {
      console.error("등록 실패:", error);
      throw new Error(error.message);
    }
  }
};

export const getUserBooks = async () => {
  try {
    const useUid = localStorage.getItem("userUid") || "";

    if (!useUid) {
      throw new Error("User UID is not available in localStorage.");
    }

    const userDocRef = doc(db, "users", useUid);

    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const books = userData.books;
      return books;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching user books:", error.message);
      throw new Error(error.message);
    }
  }
};
