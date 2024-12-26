import { useCallback, useEffect, useState } from "react";
import InputField from "../../commons/input/InputField";
import { getUserInfo, updateUserEmail } from "@/apis/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SubmitButton from "@/components/commons/button/SubmitButton";

const EmailEditForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    validEmail: true,
    validPassword: false,
  });

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setForm((prevForm) => ({
          ...prevForm,
          email: userData.email,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validEmail && form.validPassword) {
      try {
        await updateUserEmail(form.email, form.password);
        router.push("/profile");
      } catch (error) {
        console.error("이메일 변경 실패:", error);
        toast.error("이메일 변경에 실패했습니다. 다시 시도해주세요.");
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
        validPassword: passwordRegex.test(currentPassword),
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
        label="이메일"
        type="email"
        value={form.email}
        onChange={onChangeEmail}
        message={emailMessage}
        valid={form.validEmail}
      />
      <InputField
        label="계정 비밀번호"
        type="password"
        value={form.password}
        onChange={onChangePassword}
        message={passwordMessage}
        valid={form.validPassword}
      />
      <SubmitButton
        label="이메일 변경"
        disabled={!form.validEmail || !form.validPassword}
      />
    </form>
  );
};

export default EmailEditForm;
