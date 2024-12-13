"use client";

import { getUserInfo, signOutRequest } from "@/apis/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from "next/image";
import UserIcon from "@/assets/user-icon.svg";

export type UserInfoType = {
  nickName: string;
  email: string;
};

export default function Mypage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoType | null>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

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
    userInfo && (
      <div className="flex flex-col min-h-screen">
        <div className="mt-16 mb-3 p-5 flex flex-col items-center justify-center">
          <div className="mb-2">
            <Image src={UserIcon} alt="user-icon" />
          </div>
          <p className="text-2xl font-semibold mb-1">{userInfo.nickName}</p>
          <p className="text-sm text-[#9CABBB]">{userInfo.email}</p>
        </div>
        <div className="flex-1 p-5 py-6 bg-[#F5F5F5]">
          <p className="font-semibold mb-2 text-[#969696]">회원 정보</p>
          <ul className="bg-white rounded-lg mb-8 drop-shadow-sm">
            <li className="flex items-center justify-between border-b p-5">
              <p>닉네임</p>
              <p>{userInfo.nickName}</p>
            </li>
            <li className="flex items-center justify-between p-5">
              <p>이메일</p>
              <p>{userInfo.email}</p>
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
    )
  );
}
