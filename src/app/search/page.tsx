"use client";

import { debounce } from "lodash";
import { RiSearch2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useCallback, useMemo, useRef, useState } from "react";
import { SearchResult } from "@/components/domains/search/SearchResult";
import { useRouter, useSearchParams } from "next/navigation";
import { searchBooks } from "@/apis/book";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams?.get("query");

  const fetchBooks = async (query: string) => {
    if (query)
      try {
        setIsLoading(true);
        const res = await searchBooks(query);
        setBooks(res.documents);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks(null);
      } finally {
        setIsLoading(false);
      }
  };

  const updateURL = useCallback(
    (value: string) => {
      const params = new URL(window.location.href);
      params.searchParams.set("query", value);

      router.replace(params.toString());
    },
    [router]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateURL(value);
        fetchBooks(value);
      }, 400),
    [updateURL]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.replace(`?query=${search}`);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
    updateURL("");
    fetchBooks("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="mt-[60px]">
      <div className="px-4 py-3 border-b border-[#E0E0E2]">
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-[#F5F5F5] px-4 py-3 rounded"
        >
          <span>
            <RiSearch2Line />
          </span>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="검색창"
            className="bg-[#F5F5F5] outline-none w-full pl-4"
            ref={inputRef}
          />

          {!(search.trim() === "") && (
            <button type="button" onClick={handleClear} className="pl-4">
              <MdCancel />
            </button>
          )}
        </form>
      </div>
      <SearchResult query={query} books={books} isLoading={isLoading} />
    </div>
  );
}
