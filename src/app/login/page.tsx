import Image from "next/image";
import LogoImg from "@/assets/logo.svg";
import SocialoginButton from "@/components/SocialoginButton";

export default function Login() {
  return (
    <>
      <Image src={LogoImg} alt="logo" />
      <p>로그인 후 이용가능합니다.</p>

      <SocialoginButton />
    </>
  );
}
