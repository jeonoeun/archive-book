import Image from "next/image";
import { useEffect } from "react";

export const SearchResult = ({
  query,
  books,
  setBooks,
  fetchBooks,
  isLoading,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks(query);
      setBooks(data);
    };

    fetchData();
  }, [query]);

  if (!query && books?.length === 0) return;
  if (query && books?.length === 0 && !isLoading)
    return (
      <p>
        {`'${query}'와(과) 일치하는 검색 결과가 없어요. 다른 검색어를 입력해보세요.`}
      </p>
    );

  return (
    <div className="p-5">
      <ul>
        {books?.map((book) => (
          <li key={book.isbn} className="mb-4">
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
