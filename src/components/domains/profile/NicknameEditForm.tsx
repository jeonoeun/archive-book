import { useCallback, useEffect, useState } from "react";
import InputField from "../search/InputField";
import { getUserInfo, updateUserDisplayName } from "@/apis/user";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const NicknameEditForm = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [validNickname, setValidNickname] = useState(true);
  const [nicknameMessage, setNicknameMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setNickname(userData.nickName);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validNickname) {
      try {
        await updateUserDisplayName(nickname);
        router.push("/profile");
      } catch (error) {
        console.error("닉네임 변경 실패:", error);
        toast.error("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  // 닉네임
  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nicknameRegex = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
      const currentNickname = e.target.value;

      setNickname(currentNickname);
      setValidNickname(nicknameRegex.test(currentNickname));

      setNicknameMessage(
        nicknameRegex.test(currentNickname)
          ? ""
          : "2~10자 이내의 영문, 숫자, 또는 한글만 입력해 주세요."
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
        label="닉네임"
        type="text"
        value={nickname}
        onChange={onChangeNickname}
        message={nicknameMessage}
        valid={validNickname}
      />
      <div className="w-full flex justify-end">
        <button
          type="submit"
          disabled={!validNickname}
          className={`rounded px-3 py-2 font-bold ${
            validNickname
              ? "bg-[#FCC33C] text-white"
              : "bg-[#C7C7C7] text-white cursor-not-allowed"
          } `}
        >
          닉네임 변경
        </button>
      </div>
    </form>
  );
};

export default NicknameEditForm;
