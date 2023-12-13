import { getUId } from "@/firebase/firebase_api";
import { convertMilisecToTime } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { RiCheckFill } from "react-icons/ri";
import { RiCheckDoubleFill } from "react-icons/ri";

export default function ChatItem({ message }) {
  //const isMe = chat?.uid === "0";
  //const myId = getUId();
  const myId = useSelector((state) => state.app.currentUserId);
  const isMe = message.userId === myId;

  return (
    <div className={`w-full flex ${isMe ? "pl-[10%]" : "pr-[10%]"}`}>
      <div
        className={`flex w-full items-start ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        <p
          className={`${
            isMe ? "bg-gray-200 text-black" : "bg-blue-500 text-white"
          } rounded-xl text-sm px-3 py-2 mb-1 overflow-hidden`}
        >
          {message.message}
          <span className="float-right text-[10px] ml-[20px] flex items-center">
            {convertMilisecToTime(message.time)}
            {message.read ? (
              <RiCheckDoubleFill className="inline-block text-[10px] ml-[2px]" />
            ) : (
              <RiCheckFill className="inline-block text-[10px] ml-[2px]" />
            )}
          </span>
        </p>
      </div>
    </div>
  );
  // return (
  //   <div className="flex flex-col items-start my-2">
  //     <div className="flex gap-1 items-start">
  //       {/* <Image
  //         src={"/images/mechanic.jpg"}
  //         alt={`img`}
  //         width={30}
  //         height={30}
  //         objectFit="cover"
  //         className="rounded-full object-cover aspect-square"
  //       /> */}

  //       <div
  //         className={`flex flex-col gap-1 w-[70%] ${
  //           isMe ? "bg-gray-200" : "bg-blue-500"
  //         } text-white rounded-xl text-sm px-3 py-2 mb-1 overflow-hidden`}
  //       >
  //         {/* <p className="font-bold">{chat.name}</p> */}
  //         <p>{message.message}</p>
  //       </div>
  //     </div>
  //     <p className="text-[12px] ml-[40px]">
  //       {convertMilisecToTime(message.time)}
  //     </p>
  //   </div>
  // );
}
