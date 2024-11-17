"use client";

import { debounce } from "lodash";
import { RiSearch2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useMemo, useRef, useState } from "react";
import { SearchResult } from "@/components/SearchResult";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams?.get("query");

  const fetchData = async (query: string) => {
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
      setIsLoading(true);
      const response = await fetch(
        `https://dapi.kakao.com/v3/search/book?query=${query}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setBooks(data.documents);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URL(window.location.href);
        params.searchParams.set("query", value);

        router.replace(params.toString());

        fetchData(value);
      }, 400),
    [router]
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
