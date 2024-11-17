import Image from "next/image";
import { useEffect, useState } from "react";

export const SearchResult = ({ search }: { search: string }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
        const response = await fetch(
          `https://dapi.kakao.com/v3/search/book?query=${search}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBooks(data.documents);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [search]);

  if (!search) return <p>검색어를 입력해주세요.</p>;
  if (isLoading) return <p>로딩중...</p>;

  return (
    <div className="p-5">
      <ul>
        {books.map((book) => (
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
                <p className="text-[#9CABBB] text-sm">
                  차정은 (지은이) ・ 2021
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
