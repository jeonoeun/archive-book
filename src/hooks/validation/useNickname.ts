import { useCallback, useState } from "react";

export const useNickname = (initialNickname = "") => {
  const [nickname, setNickname] = useState(initialNickname);
  const [validNickname, setValidNickname] = useState(false);
  const [nicknameMessage, setNicknameMessage] = useState("");

  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
      const currentNickname = e.target.value;
      const isValid = nicknameRegex.test(currentNickname);

      setNickname(currentNickname);
      setValidNickname(isValid);
      setNicknameMessage(
        isValid ? "" : "2~10자 이내의 영문, 숫자, 또는 한글만 입력해 주세요."
      );
    },
    []
  );

  return { nickname, validNickname, nicknameMessage, onChangeNickname };
};
