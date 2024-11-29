"use client";

import { useRouter } from "next/navigation";
import { GrPrevious } from "react-icons/gr";

export default function CustomHeader() {
  const router = useRouter();
  return (
    <header className="p-5 fixed top-0 left-0 w-full z-10">
      <button onClick={() => router.back()}>
        <GrPrevious />
      </button>
    </header>
  );
}
