"use client";

import Bookshelf from "@/components/domains/home/Bookshelf";
import SentenceCollection from "@/components/domains/home/SentenceCollection";
import { useSearchParams } from "next/navigation";

const TabContent = () => {
  const searchParams = useSearchParams();
  const tab = searchParams?.get("tab") || "bookshelf";

  return (
    <div className="p-5">
      {tab === "bookshelf" ? <Bookshelf /> : <SentenceCollection />}
    </div>
  );
};

export default TabContent;
