import { RiSearch2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";

export default function SearchBar({ fetchBooks, setBooks }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState("");

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
      debounce(async (value: string) => {
        updateURL(value);
        const data = await fetchBooks(value);
        setBooks(data);
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

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
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
  );
}
