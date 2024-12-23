"use client";

import { searchBooks } from "@/apis/book";
import BookItem from "@/components/commons/book/BookItem";
import { BookInfoType } from "@/types/book";
import { useEffect, useState } from "react";

export const SearchResult = ({
  debouncedSearchValue,
}: {
  debouncedSearchValue: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<BookInfoType[]>([]);

  useEffect(() => {
    const fetchBooks = async (value: string) => {
      if (!value.trim()) return;

      try {
        setIsLoading(true);
        const res = await searchBooks(value);
        setBooks(res.documents);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks(debouncedSearchValue);
  }, [debouncedSearchValue]);

  if (!debouncedSearchValue && books?.length === 0) return;
  if (isLoading) return <p className="mt-20">로딩중...</p>;
  if (debouncedSearchValue && books?.length === 0) {
    if (!isLoading) {
      return (
        <p className="mt-20">
          {`'${debouncedSearchValue}'와(과) 일치하는 검색 결과가 없어요. 다른 검색어를 입력해보세요.`}
        </p>
      );
    }
  }

  return (
    <div className="p-5 mt-20">
      <ul className="flex flex-col gap-4">
        {books.map((book) => (
          <BookItem book={book} key={book.isbn} type="flex" />
        ))}
      </ul>
    </div>
  );
};
