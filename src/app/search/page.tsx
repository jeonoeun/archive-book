"use client";

import { useState } from "react";
import { SearchResult } from "@/components/domains/search/SearchResult";
import { useSearchParams } from "next/navigation";
import { searchBooks } from "@/apis/book";
import SearchBar from "@/components/domains/search/SearchBar";

export default function Search() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const query = searchParams?.get("query");

  const fetchBooks = async (query: string) => {
    if (!query) {
      return [];
    } else {
      setIsLoading(true);
      try {
        const res = await searchBooks(query);
        return res.documents;
      } catch (error) {
        console.error("Error fetching books:", error);
        return [];
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mt-[60px]">
      <SearchBar fetchBooks={fetchBooks} setBooks={setBooks} />
      <SearchResult
        query={query}
        books={books}
        setBooks={setBooks}
        fetchBooks={fetchBooks}
        isLoading={isLoading}
      />
    </div>
  );
}
