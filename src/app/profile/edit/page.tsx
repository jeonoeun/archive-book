"use client";

import CustomHeader from "@/components/commons/header/CustomHeader";
import InputField from "@/components/domains/search/InputField";
import { useState } from "react";

export default function ProfileEdit() {
  const [profileForm, setProfileForm] = useState({
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

  return (
    <>
      <CustomHeader pageTitle="회원정보 수정" buttonTitle="저장" />
      <div className="mt-[60px]">
        <div className="p-5 flex flex-col gap-4">
          <InputField
            label="이메일"
            type="email"
            value={profileForm.email}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            message={emailMessage}
            valid={profileForm.validEmail}
          />
          <InputField
            label="닉네임"
            type="text"
            value={profileForm.nickName}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            message={nicknameMessage}
            valid={profileForm.validNickname}
          />
          <InputField
            label="비밀번호 확인"
            type="email"
            value={profileForm.password}
            onChange={(e) => {
              console.log(e.target.value);
            }}
            placeholder="비밀번호 확인"
            message={passwordMessage}
            valid={profileForm.validPassword}
          />
        </div>
      </div>
    </>
  );
}
