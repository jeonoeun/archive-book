"use client";

import { signOutRequest } from "@/apis/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function Mypage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutRequest();
      toast.success("로그아웃 되었습니다.", {});
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="mt-16 p-5 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-slate-500 rounded-full mb-3" />
        <p className="text-2xl font-semibold mb-1">zaekoch</p>
        <p className="text-sm text-[#9CABBB]">zaekoch@gmail.com</p>
      </div>
      <div className="flex-1 p-5 py-6 bg-[#F5F5F5]">
        <p className="font-semibold mb-2 text-[#969696]">회원 정보</p>
        <ul className="bg-white rounded-lg mb-8 drop-shadow-sm">
          <li className="flex items-center justify-between border-b p-5">
            <p>닉네임</p>
            <p>zaekoch</p>
          </li>
          <li className="flex items-center justify-between p-5">
            <p>이메일</p>
            <p>zaekoch@mgail.com</p>
          </li>
        </ul>
        <p className="font-semibold mb-2 text-[#969696]">설정</p>
        <ul className="bg-white rounded-lg drop-shadow-sm">
          <li className="flex items-center justify-between border-b p-5">
            <p>회원 정보 수정</p>
            <MdKeyboardArrowRight />
          </li>
          <li
            className="flex items-center justify-between border-b p-5 cursor-pointer"
            onClick={handleSignOut}
          >
            <p>로그아웃</p>
            <MdKeyboardArrowRight />
          </li>
          <li className="flex items-center justify-between p-5">
            <p>회원 탈퇴</p>
            <MdKeyboardArrowRight />
          </li>
        </ul>
      </div>
    </div>
  );
}
