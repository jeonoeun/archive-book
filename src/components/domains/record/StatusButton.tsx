import { Dispatch, SetStateAction } from "react";

type RecordFormType = {
  status: string;
  startDate: string;
  endDate: string;
  rate: string;
  comment: string;
};

export type StatusButtonType = {
  value: string;
  icon: JSX.Element;
  title: string;
  recordForm: RecordFormType;
  setRecordForm: Dispatch<SetStateAction<RecordFormType>>;
};

export default function StatusButton({
  value,
  icon,
  title,
  recordForm,
  setRecordForm,
}: StatusButtonType) {
  return (
    <div
      onClick={() => setRecordForm((prev) => ({ ...prev, status: value }))}
      className={`${
        value === recordForm.status
          ? "bg-[#493738] text-white font-semibold"
          : "text-[#9CABBB]"
      } flex-1 border rounded-full flex items-center justify-center gap-1 py-[6px] cursor-pointer`}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}
