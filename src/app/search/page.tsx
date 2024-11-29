"use client";

import { useState } from "react";
import { SearchResult } from "@/components/domains/search/SearchResult";
import SearchBar from "@/components/domains/search/SearchBar";

export default function Search() {
  const [search, setSearch] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        setDebouncedSearchValue={setDebouncedSearchValue}
      />
      <SearchResult debouncedSearchValue={debouncedSearchValue} />
    </>
  );
}
