import { useCallback, useState } from "react";

export const useConfirmPassword = (
  password: string,
  initialConfirmPassword = ""
) => {
  const [confirmPassword, setConfirmPassword] = useState(
    initialConfirmPassword
  );
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState("");

  const onChangeConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentConfirmPassword = e.target.value;
      const isValid = password === currentConfirmPassword;

      setConfirmPassword(currentConfirmPassword);
      setValidConfirmPassword(isValid);
      setConfirmPasswordMessage(
        password === currentConfirmPassword
          ? ""
          : "비밀번호가 일치하지 않습니다."
      );
    },
    [password]
  );

  return {
    confirmPassword,
    validConfirmPassword,
    confirmPasswordMessage,
    onChangeConfirmPassword,
  };
};
