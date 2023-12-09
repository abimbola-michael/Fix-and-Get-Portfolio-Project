import React, { useEffect, useState } from "react";
import Image from "next/image";
import { readUser } from "@/firebase/firebase_api";
import StoreItem from "./FixGetItem";

export default function PostItem({
  post: {
    id,
    userId,
    postType,
    type,
    category,
    subCategory,
    title,
    caption,
    items,
  },
}) {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUser() {
      const result = await readUser(userId);
      setUser(result);
    }
    getUser();
  }, [userId]);
  return (
    <div className="w-full flex flex-col">
      {user && (
        <div
          key={user.id}
          className="flex gap-2 px-4 py-2 items-center"
          onClick={() => {}}
        >
          <Image
            src={"/images/mechanic.jpg"}
            alt={`${user.name} Image`}
            width={50}
            height={50}
            className="rounded-full aspect-square cover shrink-0"
          />
          <div className="grow flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-md">{user.name}</p>
              <p className="text-[12px] text-gray-500">1:02pm</p>
            </div>
            <h1 className="font-bold text-lg">{title}</h1>
          </div>
        </div>
      )}
      <p className="text-sm">{caption}</p>
      <ul className="w-full flex gap-3">
        {items.map((item) => (
          <StoreItem post={item} key={item.url} />
        ))}
      </ul>
    </div>
  );
}
