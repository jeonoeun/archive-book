import { BookInfoType } from "@/types/book";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BookItem = ({ book }: { book: BookInfoType }) => {
  const router = useRouter();

  return (
    <li
      className="mb-4 cursor-pointer"
      onClick={() => {
        const isbn =
          book.isbn.length !== 24 ? book.isbn.trim() : book.isbn.slice(0, 11);
        router.push(`/book/${isbn}`);
      }}
    >
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
  );
};

export default BookItem;
