import { getUId } from "@/firebase/firebase_api";
import Image from "next/image";
import React from "react";

export default function ChatItem({ message }) {
  //const isMe = chat?.uid === "0";
  const myId = getUId();
  const isMe = message.userId === myId;
  return (
    <div className="flex flex-col items-start my-2">
      <div className="flex gap-1 items-start">
        {/* <Image
          src={"/images/mechanic.jpg"}
          alt={`img`}
          width={30}
          height={30}
          objectFit="cover"
          className="rounded-full object-cover aspect-square"
        /> */}

        <div className="flex flex-col gap-1 w-[70%] bg-blue-500 text-white rounded-xl text-sm px-3 py-2 mb-1 overflow-hidden">
          {/* <p className="font-bold">{chat.name}</p> */}
          <p>{message.message}</p>
        </div>
      </div>
      <p className="text-[12px] ml-[40px]">{message.time}</p>
    </div>
  );
}
