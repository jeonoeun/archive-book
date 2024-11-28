"use client";

import { searchBooks } from "@/apis/book";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchResult = ({ debouncedSearchValue }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async (value: string) => {
      if (!value) {
        return [];
      } else {
        setIsLoading(true);
        try {
          const res = await searchBooks(value);
          setBooks(res.documents);
        } catch (error) {
          console.error("Error fetching books:", error);
          setBooks([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchBooks(debouncedSearchValue);
  }, [debouncedSearchValue]);

  // if (!query && books?.length === 0) return;
  // if (query && books?.length === 0 && !isLoading)
  //   return (
  //     <p>
  //       {`'${query}'와(과) 일치하는 검색 결과가 없어요. 다른 검색어를 입력해보세요.`}
  //     </p>
  //   );

  return (
    <div className="p-5 mt-20">
      <ul>
        {books?.map((book) => (
          <li
            key={book.isbn}
            className="mb-4"
            onClick={() => router.push(`/book/${book.isbn}`)}
          >
            <div className="flex gap-4 items-center">
              <Image
                src={book.thumbnail}
                alt={book.title}
                width={69}
                height={101}
                style={{ width: 69, height: 101 }}
                priority
              />
              <div>
                <p className="mb-1">{book.title}</p>
                <p className="flex gap-1 text-[rgb(156,171,187)] text-sm">
                  <span>
                    {book.authors.length > 1
                      ? `${book.authors[0]} 외 ${book.authors.length - 1}명`
                      : book.authors[0]}
                    (지은이) ・
                  </span>
                  <span>{book.datetime?.slice(0, 4)}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
