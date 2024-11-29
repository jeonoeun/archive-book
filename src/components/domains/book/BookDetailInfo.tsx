"use client";

import Image from "next/image";
import Link from "next/link";

export default function BookDetailInfo({ book }) {
  return (
    <>
      <div className="relative w-full h-[290px]">
        <div className="w-full h-full">
          <Image
            src={book.thumbnail}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(217,217,217,0.2)] backdrop-blur" />
        <div className="absolute bottom-6 left-1/2 translate-x-[-50%] w-[124px] h-[181px]">
          <Image
            src={book.thumbnail}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 py-7">
        <p className="font-semibold text-2xl mb-1">{book.title}</p>
        <div className="flex gap-[6px]">
          <span className="text-[#9CABBB]">저자</span>
          <div className="flex gap-1">
            {book.authors.map((author) => (
              <span key={author}>{author}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#9CABBB]">출판사</span>
          <p>{book.publisher}</p>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#9CABBB]">출판일</span>
          <p>{book.datetime?.slice(0, 10)}</p>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#9CABBB]">설명</span>
          <p>{book.contents}</p>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#9CABBB]">가격</span>
          <p>{book.price}</p>
        </div>
        <div className="flex gap-[6px]">
          <span className="text-[#9CABBB]">상태</span>
          <p>{book.status}</p>
        </div>
        <Link href={book.url} target="_blank">
          다음에서 자세히 보기
        </Link>
        <button
          onClick={() => console.log(book)}
          className="border border-[#ECEEF0] py-[13px] rounded mt-4"
        >
          더보기
        </button>
      </div>
      <div className="bg-[#F8F9FD] h-[14px]"></div>
    </>
  );
}
