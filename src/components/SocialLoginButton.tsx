"use client";

import Image from "next/image";
import KakaoIcon from "@/assets/kakao-icon.svg";
import NaverIcon from "@/assets/naver-icon.svg";
import GoogleIcon from "@/assets/google-icon.svg";

interface Props {
  label: keyof typeof links;
}

const links = {
  kakao: "카카오",
  naver: "네이버",
  google: "구글",
};

const Icons = {
  kakao: { src: KakaoIcon, alt: "Kakao logo icon" },
  naver: { src: NaverIcon, alt: "Naver logo icon" },
  google: { src: GoogleIcon, alt: "Google logo icon" },
};

const colorVariants = {
  kakao: "bg-[#FEE500]",
  naver: "bg-[#03C75A] text-white",
  google: "bg-[#FFFFFF] border border-[#D1DBD6] text-[#262200]",
};

export default function SocialLoginButton({ label }: Props) {
  return (
    <button
      className={`${colorVariants[label]} p-3 w-full rounded-md flex items-center justify-center gap-5 mb-4 font-medium`}
      onClick={() => {
        console.log({ label });
      }}
    >
      <Image src={Icons[label].src} alt={Icons[label].alt} />
      <span>{links[label]}로 로그인</span>
    </button>
  );
}
