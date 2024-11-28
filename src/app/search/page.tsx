"use client";

import { useState } from "react";
import { SearchResult } from "@/components/domains/search/SearchResult";
import SearchBar from "@/components/domains/search/SearchBar";

export default function Search() {
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  return (
    <>
      <SearchBar setDebouncedSearchValue={setDebouncedSearchValue} />
      <SearchResult debouncedSearchValue={debouncedSearchValue} />
    </>
  );
}
