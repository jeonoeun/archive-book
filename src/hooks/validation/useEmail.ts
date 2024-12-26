import { useCallback, useState } from "react";

export const useEmail = (initialEmail = "") => {
  const [email, setEmail] = useState(initialEmail);
  const [validEmail, setValidEmail] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const currentEmail = e.target.value;
      const isValid = emailRegex.test(currentEmail);

      setEmail(currentEmail);
      setValidEmail(isValid);
      setEmailMessage(isValid ? "" : "올바른 이메일 주소를 입력해 주세요.");
    },
    []
  );

  return { email, validEmail, emailMessage, onChangeEmail };
};
