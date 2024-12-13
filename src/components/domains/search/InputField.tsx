import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface InputFieldType {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  message: string;
  valid: boolean;
}

export default function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  message,
  valid,
}: InputFieldType) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full">
      <label htmlFor="" className="text-sm font-semibold">
        {label}
      </label>
      <div className="w-full">
        <div className="mt-[6px] px-[18px] py-[14px] flex items-center justify-between gap-2 border border-[#78abda] rounded focus-within:outline outline-[#A0A7AC] outline-1 overflow-hidden">
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
    </div>
  );
}
