import Image from "next/image";
import { useRouter } from "next/navigation";

const BookItem = ({ book, type }) => {
  const router = useRouter();

  const { isbn, cover, thumbnail, title, authors, datetime } = book;
  const processedIsbn = isbn.length !== 24 ? isbn.trim() : isbn.slice(0, 11);

  const containerClass = `flex ${
    type === "grid" ? "flex-col gap-3" : "gap-4 items-center"
  }`;
  const imageWrapperClass = `relative ${
    type === "grid"
      ? "w-full aspect-[49/70]"
      : "min-w-[69px] w-[69px] h-[101px]"
  }`;
  const titleClass = `mb-1 ${
    type === "grid"
      ? "font-medium text-ellipsis overflow-hidden whitespace-nowrap"
      : ""
  }`;
  const authorClass = `flex gap-1 text-[rgb(156,171,187)] ${
    type === "grid" ? "text-[13px]" : "text-sm"
  }`;

  return (
    <li
      className="cursor-pointer"
      onClick={() => {
        router.push(`/book/${processedIsbn}`);
      }}
    >
      <div className={containerClass}>
        <div className={imageWrapperClass}>
          <Image
            src={type === "grid" ? cover : thumbnail}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div>
          <p className={titleClass}>{title}</p>
          <p className={authorClass}>
            <span>
              {authors.length > 1
                ? `${authors[0]} 외 ${authors.length - 1}명`
                : authors[0]}
              {type === "flex" && <span>(지은이)</span>}
            </span>
            {type === "flex" && <span>・ {datetime?.slice(0, 4)}</span>}
          </p>
        </div>
      </div>
    </li>
  );
};

export default BookItem;
