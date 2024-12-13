"use client";

import { useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";

export type HeaderProps = {
  pageTitle?: string;
  buttonTitle?: string;
};

export default function CustomHeader({ pageTitle, buttonTitle }: HeaderProps) {
  const router = useRouter();
  return (
    <header className="p-5 fixed top-0 left-0 w-full z-10 flex items-center justify-between">
      <button onClick={() => router.back()} className="flex-1">
        <GrPrevious />
      </button>
      <p className="flex-1 text-center font-semibold text-[17px]">
        {pageTitle}
      </p>
      <button className="flex-1 text-right">{buttonTitle}</button>
    </header>
  );
}
