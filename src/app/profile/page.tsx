"use client";

import { getUserInfo, signOutRequest } from "@/apis/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import CustomHeader from "@/components/commons/header/CustomHeader";
import Link from "next/link";
import Divider from "@/components/commons/Divider";

export type UserInfoType = {
  nickName: string;
  email: string;
};

export default function Profile() {
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
    <>
      <CustomHeader pageTitle="회원정보" />
      {userInfo && (
        <div className="mt-16">
          <ul className="bg-white rounded-lg mb-8">
            <li className="flex items-center justify-between border-b p-5">
              <p>이메일</p>
              <p>{userInfo.email}</p>
            </li>
            <li className="flex items-center justify-between p-5">
              <p>닉네임</p>
              <p>{userInfo.nickName}</p>
            </li>
            <li>
              <Divider />
            </li>
            <li>
              <Link
                href="/profile/edit/email"
                className="flex items-center justify-between border-b p-5"
              >
                <p>이메일 변경</p>
                <MdKeyboardArrowRight />
              </Link>
            </li>
            <li>
              <Link
                href="/profile/edit/nickname"
                className="flex items-center justify-between border-b p-5"
              >
                <p>닉네임 변경</p>
                <MdKeyboardArrowRight />
              </Link>
            </li>
            <li>
              <Link
                href="/profile/edit/password"
                className="flex items-center justify-between p-5"
              >
                <p>비밀번호 변경</p>
                <MdKeyboardArrowRight />
              </Link>
            </li>
            <li>
              <Divider />
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
      )}
    </>
  );
}
