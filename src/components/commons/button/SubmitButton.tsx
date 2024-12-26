type SubmitButonProps = {
  label: string;
  disabled?: boolean;
};

const SubmitButton = ({ label, disabled }: SubmitButonProps) => {
  return (
    <div className="w-full flex justify-end">
      <button
        type="submit"
        disabled={disabled}
        className={`rounded px-3 py-2 font-bold text-white ${
          disabled ? "bg-[#C7C7C7] cursor-not-allowed" : "bg-[#FCC33C]"
        } `}
      >
        {label}
      </button>
    </div>
  );
};

export default SubmitButton;
