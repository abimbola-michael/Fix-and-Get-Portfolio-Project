import { getUser } from "@/firebase/firebase_api";
import { changeChatUserId } from "@/slices/appSlice";
import { convertMilisecToTime } from "@/utils/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function CommentItem({
  comment: { userId, id, comment, time },
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function readUser() {
      const user = await getUser(userId);
      setUser(user);
    }
    readUser();
  }, [userId]);
  return (
    <li className="flex gap-2 px-4 py-2 items-center">
      <Image
        src={user?.profilePhoto || "/images/mechanic.jpg"}
        alt={`${user?.name} Profile Photo`}
        width={40}
        height={40}
        className="rounded-full aspect-square cover shrink-0"
      />
      <div className="grow flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-sm text-black">{user?.name}</p>
          <p className="text-[12px] text-gray-500">
            {convertMilisecToTime(time)}
          </p>
        </div>
        <p className="text-sm text-gray-700 text-ellipsis">{comment}</p>
      </div>
    </li>
  );
}
