"use client";

import { getUserInfo } from "@/apis/user";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        console.log(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const myHeaders = new Headers();

      myHeaders.append(
        "Authorization",
        "KakaoAK 31f8e70d3ceba48d8391d158aa45fa70"
      );

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "https://dapi.kakao.com/v3/search/book?query=한강",
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data.documents);
        setBooks(data.documents);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user is currently logged in</div>;
  }

  return (
    <div className="p-4">
      <p>{user.nickname} 님, 안녕하세요!</p>
      <div>
        {books &&
          books.map((book) => (
            <div key={book.isbn}>
              <Image
                src={book.thumbnail}
                alt={book.title}
                width={124}
                height={181}
              />
              <p>{book.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
