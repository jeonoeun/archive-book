import CustomHeader from "@/components/commons/header/CustomHeader";

type DetailLayout = {
  children: React.ReactNode;
};

export default function DetailLayout({ children }: DetailLayout) {
  return (
    <>
      <CustomHeader />
      {children}
    </>
  );
}
