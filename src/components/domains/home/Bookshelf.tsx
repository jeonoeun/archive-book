"use client";

import { getUserBooks } from "@/apis/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type UserBooksType = {
  isbn: string;
  authors: string[];
  comment: string;
  cover: string;
  startDate: string;
  endDate: string;
  rate: string;
  status: string;
  title: string;
};

const Bookshelf = () => {
  const router = useRouter();
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
        <li
          key={book.isbn}
          onClick={() => router.push(`/book/${book.isbn}`)}
          className="cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="relative w-full aspect-[49/70]">
              <Image
                src={book.cover}
                alt={book.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="mt-3">
              <p className="mb-1 font-medium">{book.title}</p>
              <p className="flex gap-1 text-[rgb(156,171,187)] text-[13px]">
                <span>
                  {book.authors.length > 1
                    ? `${book.authors[0]} 외 ${book.authors.length - 1}명`
                    : book.authors[0]}
                  (지은이)
                </span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Bookshelf;
