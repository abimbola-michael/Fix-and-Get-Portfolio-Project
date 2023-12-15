"use client";
import { changeChat } from "@/slices/appSlice";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import { getIndividualMessages } from "@/utils/helpers";

// const users = [
//   {
//     id: "1",
//     name: "Michael",
//     email: "michael",
//     message: "Please is there laptop screen",
//   },
//   {
//     id: "2",
//     name: "Hotshot",
//     email: "hotshot",
//     message: "I want by Pizza. Is it available",
//   },
//   {
//     id: "3",
//     name: "Mickey",
//     email: "mickey",
//     message: "Can u fix a built freezer",
//   },
// ];

export default function MessageList({ messages }) {
  const myId = useSelector((state) => state.app.currentUserId);
  const indMessages = getIndividualMessages(messages).map((message) => {
    const sortedMessages = message.messages.sort((a, b) => b.time - a.time);
    const unread = message.messages.filter(
      (message) => message.userId != myId && !message.read
    ).length;
    return {
      userId: message.userId,
      lastMessage: sortedMessages[0],
      unread,
    };
  });
  if (indMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {/* <Image
          src={"/images/empty.svg"}
          alt={`empty`}
          width={200}
          height={200}
          objectFit="cover"
          className="rounded-full object-cover aspect-square"
        /> */}
        <p className="text-lg font-bold text-gray-700">No messages</p>
      </div>
    );
  }
  return (
    <div className="w-full h-full overflow-y-auto">
      <ul className="">
        {indMessages.length > 0 ? (
          indMessages.map((message) => (
            <MessageItem key={message.userId} message={message} />
          ))
        ) : (
          <div className="flex flex-col h-full w-full items-center justify-center">
            <p className="text-lg font-bold text-gray-700">No messages</p>
          </div>
        )}
      </ul>
    </div>
  );
}
