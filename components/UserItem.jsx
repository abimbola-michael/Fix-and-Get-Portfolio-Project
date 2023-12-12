import { getUser } from "@/firebase/firebase_api";
import { changeChat } from "@/slices/appSlice";
import { convertMilisecToTime } from "@/utils/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function UserItem({
  user: {
    userId,
    name,
    email,
    phone,
    username,
    profilePhoto,
    coverPhoto,
    timeJoined,
    lastSeen,
  },
  onClick,
}) {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   async function readUser() {
  //     const user = await getUser(userId);
  //     setUser(user);
  //   }
  //   readUser();
  // }, [userId]);
  return (
    <li
      key={userId}
      className="flex gap-2 px-4 py-2 items-center"
      onClick={onClick}
    >
      <Image
        src={profilePhoto || "/images/mechanic.jpg"}
        alt={`${name} Profile Photo`}
        width={50}
        height={50}
        className="rounded-full aspect-square cover shrink-0"
      />
      <div className="grow flex flex-col">
        <p className="text-md">{name}</p>
        <p className="text-sm text-gray-700 text-ellipsis">{username}</p>
        <div className="m-1 h-[1px] w-full bg-gray-200"></div>
      </div>
    </li>
  );
}
