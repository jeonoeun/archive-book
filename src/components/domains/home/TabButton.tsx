"use client";

import { useRouter, useSearchParams } from "next/navigation";

const TabButton = ({ tab, tabTitle }: { tab: string; tabTitle: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams?.get("tab") || "bookshelf";

  const handleClickTab = (tab: string) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("tab", tab);

    router.replace(currentUrl.toString());
  };

  return (
    <button
      onClick={() => handleClickTab(tab)}
      className={`w-full border-[#493738] p-4 ${
        currentTab === tab ? "border-b-2 text-[#493738]" : ""
      }`}
    >
      {tabTitle}
    </button>
  );
};

export default TabButton;
