"use client";
import Header from "@/components/Header";
import SearchItem from "@/components/SearchItem";
import React from "react";
import { useSelector } from "react-redux";

export default function Search() {
  //const results = [{}];
  const text = useSelector((state) => state.app.searchText);
  const users = Array.from({ length: 10 }, (v, i) => {
    return { name: "Zod Boy", companyName: "Zod Wears", id: i.toString() };
  });
  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Search: {text}</p>

      <div className="overflow-y-auto">
        <ul className="flex flex-col overflow-auto gap-2">
          {users.map((user) => {
            return <SearchItem key={user.id} user={user} />;
          })}
        </ul>
      </div>
    </div>
  );
}
