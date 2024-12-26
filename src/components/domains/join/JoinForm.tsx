"use client";

import InputField from "@/components/commons/input/InputField";
import { signUpRequest } from "@/apis/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEmail } from "@/hooks/validation/useEmail";
import { useNickname } from "@/hooks/validation/useNickname";
import { usePassword } from "@/hooks/validation/usePassword";
import { useConfirmPassword } from "@/hooks/validation/useConfirmPassword";

export default function JoinForm() {
  const router = useRouter();
  const { email, validEmail, emailMessage, onChangeEmail } = useEmail();
  const { nickname, validNickname, nicknameMessage, onChangeNickname } =
    useNickname();
  const { password, validPassword, passwordMessage, onChangePassword } =
    usePassword();
  const {
    confirmPassword,
    validConfirmPassword,
    confirmPasswordMessage,
    onChangeConfirmPassword,
  } = useConfirmPassword(password);

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validEmail && validPassword && validConfirmPassword && validNickname) {
      try {
        await signUpRequest(email, password, nickname);
        toast.success("회원가입이 성공적으로 완료되었습니다!", {});
        router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="w-full flex flex-col items-center gap-4"
    >
      <InputField
        label="이메일"
        type="email"
        value={email}
        onChange={onChangeEmail}
        placeholder="이메일"
        message={emailMessage}
        valid={validEmail}
      />
      <InputField
        label="비밀번호"
        type="password"
        value={password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        message={passwordMessage}
        valid={validPassword}
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
        placeholder="비밀번호 확인"
        message={confirmPasswordMessage}
        valid={validConfirmPassword}
      />
      <InputField
        label="닉네임"
        type="text"
        value={nickname}
        onChange={onChangeNickname}
        placeholder="닉네임"
        message={nicknameMessage}
        valid={validNickname}
      />

      <button
        type="submit"
        disabled={
          !validEmail ||
          !validPassword ||
          !validConfirmPassword ||
          !validNickname
        }
        className={`rounded px-[18px] py-[14px] w-full text-white ${
          validEmail && validPassword && validConfirmPassword && validNickname
            ? "bg-[#FCC33C]"
            : "bg-[#C7C7C7] cursor-not-allowed"
        } font-bold`}
      >
        회원가입
      </button>
    </form>
  );
}
