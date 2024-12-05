import Image from "next/image";
import Link from "next/link";
import LogoImg from "@/assets/logo.svg";
import { IoMdSettings } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";

export default function DefaultHeader() {
  return (
    <header className="p-5 fixed top-0 left-0 w-full bg-white">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={LogoImg} alt="logo" width={80} priority />
        </Link>
        <div className="flex items-start gap-4 text-[#9CABBB]">
          <Link href="/search" className="text-2xl">
            <IoSearchOutline />
          </Link>
          <Link href="/mypage" className="text-2xl">
            <IoMdSettings />
          </Link>
        </div>
      </div>
    </header>
  );
}
