import TabButton from "./TabButton";

export default function MainTab() {
  return (
    <div className="flex border-b border-[#E0E0E2] text-[#CCD8E3]">
      <div className="flex w-full px-4">
        <TabButton tab="bookshelf" tabTitle="책장" />
        <TabButton tab="record" tabTitle="나의 기록" />
        <TabButton tab="sentence-collection" tabTitle="문장 수집" />
      </div>
    </div>
  );
}
