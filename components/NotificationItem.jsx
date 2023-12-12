"use client";
import { getUser } from "@/firebase/firebase_api";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function NotificationItem({
  notification: { id, userId, toId, title, message, time, read },
}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function readUser() {
      const user = await getUser(userId);
      setUser(user);
    }
    readUser();
  }, [userId]);
  return (
    <li key={id} className="flex gap-2 px-4 py-2" onClick={() => {}}>
      <Image
        src={`${user.profilePhoto || "/images/mechanic.jpg"}`}
        alt={`${user.name} Profile Photo`}
        width={50}
        height={50}
        objectFit="cover"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-md">{title}</p>
        <p className="text-sm text-gray-700 text-ellipsis">{message}</p>
        {/* <div className="h-[1px] w-full bg-gray-200"></div> */}
      </div>
    </li>
  );
}
