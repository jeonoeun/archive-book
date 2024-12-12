import { getUserRecord } from "@/apis/user";
import { useEffect, useState } from "react";
import Divider from "@/components/commons/Divider";

const RecordSection = ({ isbn }: { isbn: string }) => {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const data = await getUserRecord(isbn);
        setBookData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookData();
  }, [isbn]);

  if (loading) return <p>loaindg...</p>;

  return (
    bookData && (
      <>
        <div>
          <p className="font-semibold mb-3">독서 상태</p>
          <p>{bookData.status}</p>
        </div>
        <Divider />
      </>
    )
  );
};

export default RecordSection;
