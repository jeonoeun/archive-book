import { getUserRecord } from "@/apis/user";
import { useEffect, useState } from "react";
import {
  IoRocketSharp,
  IoFlame,
  IoHeart,
  IoCalendarClear,
} from "react-icons/io5";

export type BookRecordType = {
  authors: string[];
  comment: string;
  cover: string;
  endDate: string;
  isbn: string;
  rate: string;
  startDate: string;
  status: keyof typeof Titles;
  title: string;
};

const Titles = {
  completed: "완독",
  reading: "읽는 중",
  wantToRead: "보고싶어요",
};

const Icons = {
  completed: <IoRocketSharp />,
  reading: <IoFlame />,
  wantToRead: <IoHeart />,
};

const colorVariants = {
  completed: "bg-[#4caf50] border-[#388e3c]",
  reading: "bg-[#ff9800] border-[#f57c00]",
  wantToRead: "bg-[#2196f3] border-[#1976d2]",
};

const RecordSection = ({ isbn }: { isbn: string }) => {
  const [bookData, setBookData] = useState<BookRecordType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        setLoading(true);
        const data = await getUserRecord(isbn);
        setBookData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [isbn]);

  if (loading) return <p>loading...</p>;

  return (
    bookData && (
      <div className="px-5 py-7 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <p className="font-semibold">독서 상태</p>
          <div
            className={`${
              colorVariants[bookData.status]
            } text-white rounded-full flex items-center justify-center gap-[6px] p-8 py-[6px] cursor-pointer text-sm font-medium`}
          >
            {Icons[bookData.status]}
            <span>{Titles[bookData.status]}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-start gap-[6px] flex-1">
            <span className="font-semibold">시작일</span>
            <div className="border rounded w-full py-[6px] px-3 h-[38px] flex items-center justify-between">
              <span>{bookData.startDate}</span>
              <span className="text-[#9CABBB]">
                <IoCalendarClear />
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[6px] flex-1">
            <span className="font-semibold">종료일</span>
            <div className="border border-[#d8d8d8] rounded w-full py-[6px] px-3 h-[38px] flex items-center justify-between bg-[#f0f0f0] text-[#8e8e8e]">
              <span>{bookData.endDate}</span>
              <span>
                <IoCalendarClear />
              </span>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-3">한줄평</p>
          <div className="bg-[#f7f7f8] border rounded w-full p-5 min-h-24">
            {bookData.comment}
          </div>
        </div>
      </div>
    )
  );
};

export default RecordSection;
