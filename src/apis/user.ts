import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
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
import { BookInfoType } from "@/types/book";

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

    updateProfile(user, {
      displayName: nickname,
    });

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

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          nickName: user.displayName,
          email: user.email,
        };

        resolve(userData);
      } else {
        reject(null);
      }
    });
  });
};

export const updateUserDisplayName = async (displayName: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    await updateProfile(user, { displayName });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const updateUserEmail = async (email: string, password: string) => {
  const user = auth.currentUser;
  const originEmail = user?.email;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  try {
    const credential = EmailAuthProvider.credential(originEmail, password);

    await reauthenticateWithCredential(user, credential);

    await updateEmail(user, { email });

    console.log("Email updated successfully");
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      alert("비밀번호가 올바르지 않습니다.");
    } else if (error.code === "auth/email-already-in-use") {
      alert("이미 사용 중인 이메일 주소입니다.");
    } else {
      alert("이메일 업데이트 중 문제가 발생했습니다.");
    }
    console.error(error);
  }
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
    const userUid = localStorage.getItem("userUid") || "";

    if (!userUid) {
      throw new Error("User UID is not available in localStorage.");
    }

    const userDocRef = doc(db, "users", userUid);
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

export const getUserRecord = async (isbn: string) => {
  try {
    const userUid = localStorage.getItem("userUid") || "";

    if (!userUid) {
      throw new Error("User UID is not available in localStorage.");
    }

    const userDocRef = doc(db, "users", userUid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.log("User document does not exist.");
      return null;
    }

    const userData = userDoc.data();
    const books = userData?.books || [];

    const book = books.find((book: BookInfoType) => book.isbn === isbn);

    return book || null;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching book by ISBN:", error.message);
      throw new Error(error.message);
    }
  }
};
