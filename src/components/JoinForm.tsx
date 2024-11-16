"use client";

import { useCallback, useState } from "react";
import InputField from "@/components/InputField";
import { signUpRequest } from "@/apis/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function JoinForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    validEmail: false,
    validPw: false,
    validPwConfirm: false,
    validNickname: false,
  });

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      form.validEmail &&
      form.validPw &&
      form.validPwConfirm &&
      form.validNickname
    ) {
      try {
        await signUpRequest(form.email, form.password, form.nickname);

        toast.success("회원가입이 성공적으로 완료되었습니다!", {});
        router.push("/");
      } catch (error) {
        console.error("회원가입 실패:", error);
        toast.error("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      toast.error("입력한 정보가 올바르지 않습니다.");
    }
  };

  // 이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const currentEmail = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        email: currentEmail,
        validEmail: emailRegex.test(currentEmail),
      }));

      setEmailMessage(
        emailRegex.test(currentEmail)
          ? "사용 가능한 이메일입니다."
          : "올바른 이메일 주소를 입력해 주세요."
      );
    },
    []
  );

  // 패스워드
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const currentPassword = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        password: currentPassword,
        validPw: passwordRegex.test(currentPassword),
      }));

      setPasswordMessage(
        passwordRegex.test(currentPassword)
          ? "안전한 비밀번호입니다."
          : "비밀번호는 8~25자이며, 숫자, 영문자, 특수문자를 포함해야 합니다."
      );
    },
    []
  );

  // 패스워드 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentPasswordConfirm = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        passwordConfirm: currentPasswordConfirm,
        validPwConfirm: form.password === currentPasswordConfirm,
      }));

      setPasswordConfirmMessage(
        form.password === currentPasswordConfirm
          ? "비밀번호가 일치합니다."
          : "비밀번호가 일치하지 않습니다."
      );
    },
    [form.password]
  );

  // 닉네임
  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
      const currentNickname = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        nickname: currentNickname,
        validNickname: nicknameRegex.test(currentNickname),
      }));

      setNicknameMessage(
        nicknameRegex.test(currentNickname)
          ? "사용 가능한 닉네임입니다."
          : "2~10자 이내의 영문, 숫자, 또는 한글만 입력해 주세요."
      );
    },
    []
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4 mt-20"
    >
      <InputField
        type="email"
        value={form.email}
        onChange={onChangeEmail}
        placeholder="이메일"
        message={emailMessage}
        valid={form.validEmail}
      />
      <InputField
        type="password"
        value={form.password}
        onChange={onChangePassword}
        placeholder="비밀번호"
        message={passwordMessage}
        valid={form.validPw}
      />
      <InputField
        type="password"
        value={form.passwordConfirm}
        onChange={onChangePasswordConfirm}
        placeholder="비밀번호 확인"
        message={passwordConfirmMessage}
        valid={form.validPwConfirm}
      />
      <InputField
        type="text"
        value={form.nickname}
        onChange={onChangeNickname}
        placeholder="닉네임"
        message={nicknameMessage}
        valid={form.validNickname}
      />

      <button
        type="submit"
        disabled={
          !form.validEmail ||
          !form.validPw ||
          !form.validPwConfirm ||
          !form.validNickname
        }
        className={`rounded px-[18px] py-[14px] w-full ${
          form.validEmail &&
          form.validPw &&
          form.validPwConfirm &&
          form.validNickname
            ? "bg-[#FCC33C] text-white"
            : "bg-[#C7C7C7] text-white cursor-not-allowed"
        } font-bold`}
      >
        회원가입
      </button>
    </form>
  );
}
