import { changeChat } from "@/slices/appSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function MessageItem({ user }) {
  const dispatch = useDispatch();
  return (
    <li
      key={user.id}
      className="flex gap-2 px-4 py-2 items-center"
      onClick={() => dispatch(changeChat(user.id))}
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
        <div className="flex justify-between items-center gap-2">
          <p className="text-sm text-gray-700 text-ellipsis">{user.message}</p>
          <p className="text-[12px] bg-blue-500 text-white font-bold px-[6px] py-[2px] rounded-full">
            2
          </p>
        </div>

        <div className="m-1 h-[1px] w-full bg-gray-200"></div>
      </div>
    </li>
  );
}
