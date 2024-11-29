import { RiSearch2Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "lodash";
import Link from "next/link";

export default function SearchBar({
  search,
  setSearch,
  setDebouncedSearchValue,
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearchValue(value), 400),
    [setDebouncedSearchValue]
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
    <div className="fixed top-0 left-0 w-full flex items-center px-4 py-3 border-b border-[#E0E0E2] bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex items-center bg-[#F5F5F5] px-4 py-3 rounded flex-1"
      >
        <span className="text-[#b9babe] text-xl">
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
          <button
            type="button"
            onClick={handleClear}
            className="pl-4 text-[#a0a0a0] text-xl"
          >
            <MdCancel />
          </button>
        )}
      </form>
      <Link href="/" className="text-[#F86254] ml-3 ">
        취소
      </Link>
    </div>
  );
}
