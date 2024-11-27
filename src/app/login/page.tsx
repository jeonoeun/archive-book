import Image from "next/image";
import LogoImg from "@/assets/logo.svg";
import LoginForm from "@/components/domains/login/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center mt-20">
        <div className="mb-6">
          <Image src={LogoImg} alt="logo" />
        </div>
        <p className="mb-14 text-[#9CABBB]">로그인 후 이용가능합니다.</p>
        <LoginForm />
        <div className="flex gap-1 mt-6">
          <p className="text-[#9CABBB]">아직 계정이 없으신가요?</p>
          <Link href="/join" className="text-[#FCC33C]">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
