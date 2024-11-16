import { useRouter } from "next/navigation";

export default function MainTab({ tab }: { tab: string }) {
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
          onClick={() => handleClickTab("bookshelf")}
          className={`w-full border-[#493738] p-4 ${
            tab === "bookshelf" ? "border-b-2 text-[#493738]" : ""
          }`}
        >
          책장
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
}
