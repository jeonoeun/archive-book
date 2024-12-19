"use client";

import CustomHeader from "@/components/commons/header/CustomHeader";
import InputField from "@/components/domains/search/InputField";
import { useCallback, useState } from "react";

export default function ProfileEdit() {
  const [form, setForm] = useState({
    email: "zaekoch@gmail.com",
    nickName: "zaekoch",
    password: "",
    validEmail: true,
    validNickname: true,
    validPassword: false,
  });

  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

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

  // 이메일
  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
      const currentNickname = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        nickName: currentNickname,
        validNickname: nicknameRegex.test(currentNickname),
      }));

      setNicknameMessage(
        nicknameRegex.test(currentNickname)
          ? ""
          : "2~10자 이내의 영문, 숫자, 또는 한글만 입력해 주세요."
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
    <>
      <CustomHeader pageTitle="회원정보 수정" buttonTitle="저장" />
      <div className="mt-[60px]">
        <div className="p-5 flex flex-col gap-4">
          <InputField
            label="이메일"
            type="email"
            value={form.email}
            onChange={onChangeEmail}
            message={emailMessage}
            valid={form.validEmail}
          />
          <InputField
            label="닉네임"
            type="text"
            value={form.nickName}
            onChange={onChangeNickname}
            message={nicknameMessage}
            valid={form.validNickname}
          />
          <InputField
            label="비밀번호 확인"
            type="password"
            value={form.password}
            onChange={onChangePassword}
            placeholder="비밀번호 확인"
            message={passwordMessage}
            valid={form.validPassword}
          />
        </div>
      </div>
    </>
  );
}
