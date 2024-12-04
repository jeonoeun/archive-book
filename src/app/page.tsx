import DefaultHeader from "@/components/commons/header/DefaultHeader";
import MainTab from "@/components/domains/home/MainTab";
import TabContent from "@/components/domains/home/TabContent";

export default function Home() {
  return (
    <>
      <DefaultHeader />
      <div className="mt-[60px]">
        <MainTab />
        <TabContent />
      </div>
    </>
  );
}
