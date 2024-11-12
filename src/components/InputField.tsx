import { FaCheck } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

interface Props {
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  message: string;
  valid: boolean;
  variant?: "password" | "passwordConfirm";
}

export default function InputField({
  type,
  value,
  onChange,
  placeholder,
  message,
  valid,
}: Props) {
  return (
    <div className="w-full">
      <div className="px-[18px] py-[14px] flex items-center justify-between gap-2 border border-[#CCD8E3] rounded focus-within:outline overflow-hidden">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none"
        />
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
