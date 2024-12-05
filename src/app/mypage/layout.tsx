import CustomHeader from "@/components/commons/header/CustomHeader";

type MypageLayout = {
  children: React.ReactNode;
};

export default function MypageLayout({ children }: MypageLayout) {
  return (
    <>
      <CustomHeader />
      {children}
    </>
  );
}
