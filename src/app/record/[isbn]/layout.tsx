import CustomHeader from "@/components/commons/header/CustomHeader";

type RecordLayout = {
  children: React.ReactNode;
};

export default function RecordLayout({ children }: RecordLayout) {
  return (
    <>
      <CustomHeader />
      {children}
    </>
  );
}
