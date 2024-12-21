"use client";

import CustomHeader from "@/components/commons/header/CustomHeader";
import EmailEditForm from "@/components/domains/profile/EmailEditForm";
import NicknameEditForm from "@/components/domains/profile/NicknameEditForm";
import PasswordEditForm from "@/components/domains/profile/PasswordEditForm";

const fieldTitle = {
  email: "이메일",
  nickname: "닉네임",
  password: "비밀번호",
};

export default function EditFieldPage({
  params,
}: {
  params: { field: string };
}) {
  const { field } = params;

  return (
    <>
      <CustomHeader pageTitle={`${fieldTitle[field]} 변경`} />
      <div className="mt-16 p-5">
        {field === "email" ? (
          <EmailEditForm />
        ) : field === "nickname" ? (
          <NicknameEditForm />
        ) : (
          <PasswordEditForm />
        )}
      </div>
    </>
  );
}
