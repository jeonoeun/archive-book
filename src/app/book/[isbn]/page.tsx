import { getBookInfo } from "@/apis/book";
import BookDetailInfo from "@/components/domains/book/BookDetailInfo";
import Skeleton from "@/components/domains/search/Skeleton";
import { Suspense } from "react";

export default async function BookDetail({
  params,
}: {
  params: { isbn: string };
}) {
  const { isbn } = params;
  const book = await getBookInfo(isbn);

  return (
    <Suspense fallback={<Skeleton />}>
      <BookDetailInfo book={book} />
    </Suspense>
  );
}
