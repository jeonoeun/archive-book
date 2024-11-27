import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/assets/logo.svg";
import { RiSearch2Line } from "react-icons/ri";

export default function DefaultHeader() {
  return (
    <header className="p-5 fixed top-0 left-0 w-full bg-white">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={LogoImg} alt="logo" width={80} priority />
        </Link>
        <Link href="/search" className="text-xl">
          <RiSearch2Line />
        </Link>
      </div>
    </header>
  );
}
