"use client";

import { signOutRequest } from "@/apis/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Mypage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOutRequest();
      toast.success("로그아웃 되었습니다.", {});
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      toast.error("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="p-5">
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}
