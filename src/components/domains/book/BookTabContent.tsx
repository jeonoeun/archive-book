"use client";

import { useSearchParams } from "next/navigation";
import RecordSection from "./RecordSection";

const BookTabContent = ({ isbn }: { isbn: string }) => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab") || "record";

  return tab === "record" ? (
    <RecordSection isbn={isbn} />
  ) : (
    <div>문장 수집</div>
  );
};

export default BookTabContent;
