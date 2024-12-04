"use client";

import { GrPowerReset } from "react-icons/gr";

const BottomButton = ({ handleSubmit, handleClear }) => {
  return (
    <div className="fixed bottom-0 left-0 flex gap-2 w-full border-t border-[#DFE3E6] px-5 py-4 bg-white">
      <button
        onClick={handleClear}
        className="flex items-center justify-center gap-[6px] rounded text-nowrap px-4 py-[14px] font-semibold border text-[#9CABBB]"
      >
        <GrPowerReset />
        <span>초기화</span>
      </button>
      <button
        onClick={handleSubmit}
        className="rounded py-[14px] w-full bg-[#FCC33C] text-white font-semibold"
      >
        내 서재에 등록하기
      </button>
    </div>
  );
};

export default BottomButton;
