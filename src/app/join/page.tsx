import Link from "next/link";
import JoinForm from "@/components/JoinForm";

export default function Join() {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center">
        <JoinForm />
        <Link href="/login" className="text-[#9CABBB] mt-4">
          이미 회원이신가요?
        </Link>
      </div>
    </div>
  );
}
