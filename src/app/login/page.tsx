import Image from "next/image";
import LogoImg from "@/assets/logo.svg";
import SocialoginButton from "@/components/SocialoginButton";

export default function Login() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center mt-14">
        <div className="mb-6">
          <Image src={LogoImg} alt="logo" />
        </div>
        <p className="mb-20 text-[#9CABBB]">로그인 후 이용가능합니다.</p>
        <SocialoginButton label="kakao" />
        <SocialoginButton label="naver" />
        <SocialoginButton label="google" />
      </div>
    </div>
  );
}
