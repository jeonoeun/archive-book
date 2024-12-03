"use client";

import BottomButton from "@/components/commons/button/BottomButton";
import StatusButton from "./StatusButton";
import { IoRocketSharp, IoFlame, IoHeart } from "react-icons/io5";
import { useState } from "react";

const RecordForm = ({ isbn }) => {
  const [recordForm, setRecordForm] = useState({
    status: "completed",
    startDate: "",
    endDate: "",
    rate: "5",
    comment: "",
  });

  const handleSubmit = () => {
    console.log(recordForm);
  };

  return (
    <>
      <div className="p-5 flex flex-col gap-5">
        <div>
          <p className="font-semibold mb-3">독서 상태</p>
          <div className="flex gap-2">
            <StatusButton
              value="completed"
              icon={<IoRocketSharp />}
              title="완독"
              recordForm={recordForm}
              setRecordForm={setRecordForm}
            />
            <StatusButton
              value="reading"
              icon={<IoFlame />}
              title="읽는 중"
              recordForm={recordForm}
              setRecordForm={setRecordForm}
            />
            <StatusButton
              value="wantToRead"
              icon={<IoHeart />}
              title="보고싶어요"
              recordForm={recordForm}
              setRecordForm={setRecordForm}
            />
          </div>
        </div>
        <div>
          <p className="font-semibold mb-3">독서 기간</p>
          <div className="flex gap-4">
            <div className="flex flex-col items-start gap-1 flex-1">
              <label htmlFor="" className="text-[#9CABBB]">
                시작일
              </label>
              <input
                type="date"
                value={recordForm.startDate}
                onChange={(e) =>
                  setRecordForm((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="border rounded w-full p-[6px] h-[38px]"
              />
            </div>
            <div className="flex flex-col items-start gap-1 flex-1">
              <label htmlFor="" className="text-[#9CABBB]">
                종료일
              </label>
              <input
                type="date"
                value={recordForm.endDate}
                onChange={(e) =>
                  setRecordForm((prev) => ({
                    ...prev,
                    endDate: e.target.value,
                  }))
                }
                className="border rounded w-full h-[38px] p-[6px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#F8F9FD] h-[14px] border-t border-b border-[#f1f1f1]" />
      <div className="p-5">
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="font-semibold">한줄평</label>
            <div>300 / 1000</div>
          </div>
          <textarea
            value={recordForm.comment}
            onChange={(e) =>
              setRecordForm((prev) => ({ ...prev, comment: e.target.value }))
            }
            placeholder="이 책에 대한 한줄평을 자유롭게 남겨주세요."
            className="bg-[#F5F5F5] border rounded w-full p-3 outline-none h-24"
          />
        </div>
      </div>
      <BottomButton
        isbn={isbn}
        setRecordForm={setRecordForm}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default RecordForm;
