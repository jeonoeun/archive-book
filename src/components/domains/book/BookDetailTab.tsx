"use client";

import { useRouter, useSearchParams } from "next/navigation";

const BookDetailTab = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab") || "record";

  const router = useRouter();

  const handleClickTab = (tab: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tab", tab);

    router.replace(currentUrl.toString());
  };

  return (
    <div className="flex border-b border-[#E0E0E2] text-[#CCD8E3]">
      <div className="flex w-full px-4">
        <button
          onClick={() => handleClickTab("record")}
          className={`w-full border-[#493738] p-4 ${
            tab === "record" ? "border-b-2 text-[#493738]" : ""
          }`}
        >
          나의 기록
        </button>
        <button
          onClick={() => handleClickTab("sentence-collection")}
          className={`w-full border-[#493738] p-4 ${
            tab === "sentence-collection" ? "border-b-2 text-[#493738]" : ""
          }`}
        >
          문장 수집
        </button>
      </div>
    </div>
  );
};

export default BookDetailTab;
