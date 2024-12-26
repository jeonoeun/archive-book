import { useCallback, useState } from "react";
import InputField from "../../commons/input/InputField";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { updateUserPassword } from "@/apis/user";
import SubmitButton from "@/components/commons/button/SubmitButton";

const PasswordEditForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    password: "",
    newPw: "",
    newPwConfirm: "",
    validPassword: false,
    validNewPw: false,
    validNewPwConfirm: false,
  });

  const [passwordMessage, setPasswordMessage] = useState("");
  const [newPwMessage, setNewPwMessage] = useState("");
  const [newPwConfirmMessage, setNewPwConfirmMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.validPassword && form.validNewPw && form.validNewPwConfirm) {
      try {
        await updateUserPassword(form.password, form.newPw);
        router.push("/profile");
        toast.success("비밀번호 변경에 성공했습니다.");
      } catch (error) {
        console.error("비밀번호 변경 실패:", error);
        toast.error(
          error.message || "비밀번호 변경에 실패했습니다. 다시 시도해주세요."
        );
      }
    }
  };

  // 새 비밀번호
  const onChangeNewPw = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const currentPassword = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        newPw: currentPassword,
        validNewPw: passwordRegex.test(currentPassword),
      }));

      setNewPwMessage(
        passwordRegex.test(currentPassword)
          ? ""
          : "비밀번호는 8~25자이며, 숫자, 영문자, 특수문자를 포함해야 합니다."
      );
    },
    []
  );

  // 새 비밀번호 확인
  const onChangeNewPwConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentPasswordConfirm = e.target.value;

      setForm((prevForm) => ({
        ...prevForm,
        newPwConfirm: currentPasswordConfirm,
        validNewPwConfirm: form.newPw === currentPasswordConfirm,
      }));

      setNewPwConfirmMessage(
        form.newPw === currentPasswordConfirm
          ? ""
          : "비밀번호가 일치하지 않습니다."
      );
    },
    [form.newPw]
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
      <div className="w-full">
        <InputField
          label="새 비밀번호"
          type="password"
          value={form.newPw}
          onChange={onChangeNewPw}
          message={newPwMessage}
          valid={form.validNewPw}
        />
        <InputField
          label=""
          type="password"
          value={form.newPwConfirm}
          onChange={onChangeNewPwConfirm}
          message={newPwConfirmMessage}
          valid={form.validNewPwConfirm}
        />
      </div>
      <InputField
        label="현재 비밀번호"
        type="password"
        value={form.password}
        onChange={onChangePassword}
        message={passwordMessage}
        valid={form.validPassword}
      />
      <SubmitButton
        label="비밀번호 변경"
        disabled={
          !form.validPassword || !form.validNewPw || !form.validPassword
        }
      />
    </form>
  );
};

export default PasswordEditForm;
