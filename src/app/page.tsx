"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/book/search");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setBooks(data.item);
      } catch (error) {
        console.error("Error: " + error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {books && books.map((book) => <p key={book.isbn}>{book.title}</p>)}
    </div>
  );
}
