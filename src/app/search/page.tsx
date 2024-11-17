"use client";

import { RiSearch2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useState } from "react";
import { SearchResult } from "@/components/SearchResult";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const query = searchParams?.get("query");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URL(window.location.href);
    params.searchParams.set("query", search);

    router.replace(params.toString());
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClear = () => {
    setSearch("");
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
          />

          {!(search.trim() === "") && (
            <button type="button" onClick={handleClear} className="pl-4">
              <MdCancel />
            </button>
          )}
        </form>
      </div>
      <SearchResult search={search} />
    </div>
  );
}
