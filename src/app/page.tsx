"use client";

import { getUserInfo } from "@/apis/user";
import Bookshelf from "@/components/Bookshelf";
import MainTab from "@/components/MainTab";
import SentenceCollection from "@/components/SentenceCollection";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const tab = searchParams?.get("tab") || "bookshelf";

  // fetchUserInfo
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        setUser(userInfo);
        console.log(userInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user is currently logged in</div>;
  }

  return (
    <div className="mt-[60px]">
      {/* <p>{user.nickname}님, 안녕하세요!</p> */}
      <MainTab tab={tab} />
      <div className="p-5">
        {tab === "bookshelf" ? <Bookshelf /> : <SentenceCollection />}
      </div>
    </div>
  );
}
