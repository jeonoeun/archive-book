import { getBookInfo } from "@/apis/book";
import FloatingButton from "@/components/commons/button/FloatingButton";
import BookDetailInfo from "@/components/domains/book/BookDetailInfo";
import Skeleton from "@/components/domains/search/Skeleton";
import { Suspense } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

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
      <div className="bg-[#F8F9FD] h-[14px] border-t border-b border-[#f1f1f1]" />
      <div>
        <div className="flex justify-between border-b border-[#F5F7FA] p-5">
          <div className="font-semibold">⭐️ ⭐️ ⭐️ ⭐️ ⭐️ 5.0</div>
          <div className="flex items-center justify-center gap-1">
            <span>나의 리뷰</span>
            <MdKeyboardArrowRight />
          </div>
        </div>
        <div className="flex justify-between border-b border-[#F5F7FA] p-5">
          <div className="font-semibold">나의 문장 수집</div>
          <div className="flex items-center justify-center gap-1">
            <span>5개</span>
            <MdKeyboardArrowRight />
          </div>
        </div>
      </div>
      <div className="bg-[#F8F9FD] h-[14px] border-t border-b border-[#f1f1f1]" />
      <div>
        <div className="flex justify-between border-b border-[#F5F7FA] p-5">
          <div className="flex items-center gap-2 font-semibold">
            <p>이 책이 담긴 리뷰</p>
            <span className="text-[#FCC33C]">15</span>
          </div>
          <button>
            <MdKeyboardArrowRight />
          </button>
        </div>
        <div className="flex justify-between border-b border-[#F5F7FA] p-5">
          <div className="flex items-center gap-2 font-semibold">
            <p>이 책이 담긴 문장 수집</p>
            <span className="text-[#FCC33C]">127</span>
          </div>
          <button>
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      <FloatingButton isbn={isbn} />
    </Suspense>
  );
}
