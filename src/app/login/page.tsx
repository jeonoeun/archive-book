import Image from "next/image";
import LogoImg from "@/assets/logo.svg";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center mt-20">
        <div className="mb-6">
          <Image src={LogoImg} alt="logo" />
        </div>
        <p className="mb-14 text-[#9CABBB]">로그인 후 이용가능합니다.</p>
        <LoginForm />
      </div>
    </div>
  );
}
