import { getBookInfo } from "@/apis/book";
import FloatingButton from "@/components/commons/button/FloatingButton";
import Divider from "@/components/commons/Divider";
import BookDetailInfo from "@/components/domains/book/BookDetailInfo";
import BookDetailTab from "@/components/domains/book/BookDetailTab";
import BookTabContent from "@/components/domains/book/BookTabContent";
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
      <BookDetailInfo isbn={isbn} book={book} />
      <Divider />
      <BookDetailTab />
      <BookTabContent isbn={isbn} />
      <FloatingButton isbn={isbn} />
    </Suspense>
  );
}
