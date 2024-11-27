import Link from "next/link";
import JoinForm from "@/components/domains/join/JoinForm";
import Image from "next/image";
import LogoImg from "@/assets/logo.svg";

export default function Join() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center mt-20">
        <div className="mb-14">
          <Image src={LogoImg} alt="logo" />
        </div>
        <JoinForm />
        <div className="flex gap-1 mt-6">
          <p className="text-[#9CABBB]">아직 이미 회원이신가요?</p>
          <Link href="/login" className="text-[#FCC33C]">
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
