"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { signInRequest } from "@/apis/user";
import { useRouter } from "next/navigation";
import InputField from "../search/InputField";

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    validEmail: false,
    validPw: false,
  });

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validEmail && form.validPw) {
      try {
        await signInRequest(form.email, form.password);
        router.push("/");
        toast.success("로그인이 성공적으로 완료되었습니다!", {});
      } catch (error) {
        console.error("회원가입 실패:", error);
        toast.error(
          `${form.email}은 가입되지 않은 이메일 입니다. 다시 시도해주세요.`
        );
      }
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
          ? ""
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
          ? ""
          : "비밀번호는 8~25자이며, 숫자, 영문자, 특수문자를 포함해야 합니다."
      );
    },
    []
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center gap-4"
    >
      <InputField
        type="email"
        value={form.email}
        onChange={onChangeEmail}
        placeholder="아이디"
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
      <button
        type="submit"
        disabled={!form.validEmail || !form.validPw}
        className={`rounded px-[18px] py-[14px] w-full ${
          form.validEmail && form.validPw
            ? "bg-[#FCC33C] text-white"
            : "bg-[#C7C7C7] text-white cursor-not-allowed"
        } font-bold`}
      >
        로그인
      </button>
    </form>
  );
}
