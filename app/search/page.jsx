"use client";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import SearchItem from "@/components/SearchItem";
import UserItem from "@/components/UserItem";
import { readUsers } from "@/firebase/firebase_api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Search() {
  const [currentTab, setCurrentTab] = useState("People");
  const router = useRouter();
  // const text = useSelector((state) => state.app.searchText);
  const [users, setUsers] = useState([]);
  const params = useSearchParams();
  const keyword = params.get("keyword");
  useEffect(() => {
    async function readAllUsers() {
      const users = await readUsers();
      setUsers(
        users.filter(
          (user) =>
            user.username?.includes(keyword) ||
            user.name?.includes(keyword) ||
            user.companyName?.includes(keyword)
        )
      );
      //setUsers(users);
    }
    readAllUsers();
  }, [keyword]);

  // const users = Array.from({ length: 10 }, (v, i) => {
  //   return { name: "Zod Boy", companyName: "Zod Wears", id: i.toString() };
  // });

  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Search: {keyword}</p>

      <div className="overflow-y-auto">
        <div className="w-full flex justify-evenly mb-3">
          <HomeTab
            name="Fix"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <HomeTab
            name="Get"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <HomeTab
            name="People"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
        <div className="w-full">
          <div className="w-full"></div>
        </div>
        {currentTab === "People" && (
          <ul className="flex flex-col overflow-auto gap-2">
            {users.map((user) => {
              return (
                <UserItem
                  key={user.userId}
                  user={user}
                  onClick={() => {
                    router.push(`/profile?userId=${user.userId}`);
                  }}
                />
              );
            })}
          </ul>
        )}
        {(currentTab === "Fix" || currentTab === "Get") && (
          <ul className="flex flex-col overflow-auto gap-2">
            {users.map((user) => {
              return <SearchItem key={user.id} user={user} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
