"use client";

import { useState } from "react";
import { IoRocketSharp, IoFlame, IoBookmark, IoHeart } from "react-icons/io5";

export default function Record({ params }: { params: { isbn: string } }) {
  const { isbn } = params;

  return (
    <div className="mt-16">
      <div>
        <div className="border-b border-[#f1f1f1] p-5">
          <p className="font-semibold mb-3">독서 상태</p>
          <div className="flex gap-2">
            <button className="flex-1 border rounded flex items-center justify-center gap-1 p-1">
              <IoRocketSharp />
              <span>완독</span>
            </button>
            <button className="flex-1 border rounded flex items-center justify-center gap-1 p-1">
              <IoFlame />
              <span>읽는 중</span>
            </button>
            <button className="flex-1 border rounded flex items-center justify-center gap-1 p-1">
              <IoHeart />
              <span>보고싶어요</span>
            </button>
          </div>
        </div>
        <div className="border-b border-[#f1f1f1] p-5">
          <p className="font-semibold mb-3">독서 기간</p>
          <div className="flex gap-4">
            <div className="flex flex-col items-start gap-1 flex-1">
              <label htmlFor="" className="text-[#9CABBB]">
                시작일
              </label>
              <input type="date" className="border px-1 rounded w-full" />
            </div>
            <div className="flex flex-col items-start gap-1 flex-1">
              <label htmlFor="" className="text-[#9CABBB]">
                종료일
              </label>
              <input type="date" className="border px-1 rounded w-full" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between p-5">
          <p className="font-semibold">별점</p>
          <div>⭐️ ⭐️ ⭐️ ⭐️ ⭐️</div>
        </div>
      </div>
      <div className="bg-[#F8F9FD] h-[14px] border-t border-b border-[#f1f1f1]" />
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <label className="font-semibold">한줄평</label>
          <div>300 / 1000</div>
        </div>
        <input
          type="text"
          className="bg-[#F5F5F5] border rounded w-full p-3 outline-none h-24"
        />
      </div>
      <div className="fixed bottom-0 left-0 w-full border-t border-[#DFE3E6] px-5 py-4">
        <button
          type="submit"
          className="rounded px-[18px] py-[14px] w-full bg-[#FCC33C] text-white font-semibold"
        >
          내 서재에 등록하기
        </button>
      </div>
    </div>
  );
}
