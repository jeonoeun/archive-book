import { useEffect, useState } from "react";
import Image from "next/image";

export default function Bookshelf() {
  const [books, setBooks] = useState();

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
        setBooks(data.documents);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full grid grid-cols-3">
      {books &&
        books.map((book) => (
          <div key={book.isbn}>
            <Image
              src={book.thumbnail}
              alt={book.title}
              width={124}
              height={181}
              style={{ width: 124, height: 181 }}
              priority
            />
            <p>{book.title}</p>
          </div>
        ))}
    </div>
  );
}
