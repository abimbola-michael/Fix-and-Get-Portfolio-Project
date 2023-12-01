import Image from "next/image";
import React from "react";

export default function ChatItem({ chat }) {
  const isMe = chat?.uid === "0";
  return (
    <div className="flex flex-col items-start my-2">
      <div className="flex gap-1 items-start">
        <Image
          src={"/images/mechanic.jpg"}
          alt={`img`}
          width={30}
          height={30}
          objectFit="cover"
          className="rounded-full object-cover aspect-square"
        />

        <div className="flex flex-col gap-1 w-[70%] bg-blue-500 text-white rounded-xl text-sm px-3 py-2 mb-1 overflow-hidden">
          <p className="font-bold">{chat.name}</p>
          <p>{chat.message}</p>
        </div>
      </div>
      <p className="text-[12px] ml-[40px]">2:00pm</p>
    </div>
  );
}
