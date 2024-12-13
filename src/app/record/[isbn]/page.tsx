import { getBookInfo } from "@/apis/book";
import CustomHeader from "@/components/commons/header/CustomHeader";
import BookDetailInfo from "@/components/domains/book/BookDetailInfo";
import RecordForm from "@/components/domains/record/RecordForm";
import Skeleton from "@/components/domains/search/Skeleton";
import { Suspense } from "react";

export default async function Record({ params }: { params: { isbn: string } }) {
  const { isbn } = params;
  const book = await getBookInfo(isbn);

  return (
    <>
      <CustomHeader />
      <Suspense fallback={<Skeleton />}>
        <div className="pb-24">
          <BookDetailInfo isbn={isbn} book={book} />
          <div className="bg-[#F8F9FD] h-[14px] border-t border-b border-[#f1f1f1]" />
          <RecordForm isbn={isbn} book={book} />
        </div>
      </Suspense>
    </>
  );
}
