"use client";

import { useRouter } from "next/navigation";
import { FaPencilAlt } from "react-icons/fa";

const FloatingButton = ({ isbn }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/record/${isbn}`)}
      className="fixed bottom-5 right-5 flex items-center justify-center rounded-full bg-[#FCC33C] text-white w-14 h-14"
    >
      <FaPencilAlt />
    </button>
  );
};

export default FloatingButton;
