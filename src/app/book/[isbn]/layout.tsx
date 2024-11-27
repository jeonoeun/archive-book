import CustomHeader from "@/components/commons/header/CustomHeader";

type DetailLayout = {
  children: React.ReactNode;
};

export default function DetailLayout({ children }: DetailLayout) {
  return (
    <>
      <CustomHeader />
      <div className="mt-16">{children}</div>
    </>
  );
}
