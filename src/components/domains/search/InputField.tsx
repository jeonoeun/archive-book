import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface Props {
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  message: string;
  valid: boolean;
}

export default function InputField({
  type,
  value,
  onChange,
  placeholder,
  message,
  valid,
}: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <div className="px-[18px] py-[14px] flex items-center justify-between gap-2 border border-[#CCD8E3] rounded focus-within:outline outline-[#A0A7AC] outline-1 overflow-hidden">
        <input
          type={visible ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none"
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setVisible((prev) => !prev);
            }}
            className="text-[#a5a5a5]"
          >
            {visible ? <IoMdEyeOff /> : <IoMdEye />}
          </button>
        )}
        {valid && (
          <span className="text-[#5abf0d]">
            <FaCheck />
          </span>
        )}
      </div>
      <div
        className={`flex items-center gap-1 text-xs mt-2 ${
          valid ? "text-[#8f8c8b]" : "text-[#E64938]"
        }`}
      >
        {message !== "" && !valid && <FaInfoCircle />}
        <p>{message}</p>
      </div>
    </div>
  );
}
