import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="w-full flex flex-col items-center gap-4">
      <div className="w-full">
        <input
          placeholder="아이디"
          className="w-full border border-[#CCD8E3] px-[18px] py-[14px] rounded-t"
        />
        <input
          placeholder="비밀번호"
          className="w-full border border-[#CCD8E3] border-t-0 px-[18px] py-[14px] rounded-b"
        />
      </div>
      <button
        type="submit"
        className="rounded px-[18px] py-[14px] w-full bg-[#FCC33C] text-white font-bold"
      >
        로그인
      </button>
      <div className="flex gap-1 mt-4">
        <p className="text-[#9CABBB]">아직 계정이 없으신가요?</p>
        <Link href="/join" className="text-[#FCC33C]">
          회원가입
        </Link>
      </div>
    </form>
  );
}
