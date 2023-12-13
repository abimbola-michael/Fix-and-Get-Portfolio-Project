import { changeChatUserId } from "@/slices/appSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function CommentItem({ user, comment }) {
  const dispatch = useDispatch();
  return (
    <li
      key={user.id}
      className="flex gap-2 px-4 py-2 items-center"
      onClick={() => dispatch(changeChatUserId(user.id))}
    >
      <Image
        src={"/images/mechanic.jpg"}
        alt={`${user.id}_img`}
        width={50}
        height={50}
        className="rounded-full aspect-square cover shrink-0"
      />
      <div className="grow flex flex-col">
        <div className="flex justify-between items-center">
          <p className="text-md">{user.name}</p>
          <p className="text-[12px] text-gray-500">1:02pm</p>
        </div>
        <p className="text-sm text-gray-700 text-ellipsis">{comment.text}</p>
      </div>
    </li>
  );
}
