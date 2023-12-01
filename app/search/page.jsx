import Header from "@/components/Header";
import SearchItem from "@/components/SearchItem";
import React from "react";

export default function Search() {
  //const results = [{}];
  const users = Array.from({ length: 10 }, (v, i) => {
    return { name: "Zod Boy", companyName: "Zod Wears", id: i.toString() };
  });
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="w-full max-w-4xl mx-auto overflow-y-auto">
        <ul className="flex flex-col overflow-auto gap-2">
          {users.map((user) => {
            return <SearchItem key={user.id} user={user} />;
          })}
        </ul>
      </div>
    </div>
  );
}
