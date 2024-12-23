import { getUserBooks } from "@/apis/user";
import BookItem from "@/components/commons/book/BookItem";
import { UserBooksType } from "@/types/book";
import { useEffect, useState } from "react";

const Bookshelf = () => {
  const [userBooks, setUserBooks] = useState<UserBooksType[] | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getUserBooks();
        setUserBooks(books || []);
      } catch (error) {
        console.error("Failed to fetch user books:", error);
      }
    };

    fetchBooks();
  }, []);

  if (!userBooks) return <p>Loading...</p>;

  return (
    <ul className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-3 gap-y-6">
      {userBooks.map((book) => (
        <BookItem book={book} key={book.isbn} type="grid" />
      ))}
    </ul>
  );
};

export default Bookshelf;
