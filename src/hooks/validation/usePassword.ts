import { useCallback, useState } from "react";

export const usePassword = (initialPassword = "") => {
  const [password, setPassword] = useState(initialPassword);
  const [validPassword, setValidPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const currentPassword = e.target.value;
      const isValid = passwordRegex.test(currentPassword);

      setPassword(currentPassword);
      setValidPassword(isValid);
      setPasswordMessage(
        isValid
          ? ""
          : "비밀번호는 8~25자이며, 숫자, 영문자, 특수문자를 포함해야 합니다."
      );
    },
    []
  );

  return { password, validPassword, passwordMessage, onChangePassword };
};
