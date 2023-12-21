"use client";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import { readMessageChanges } from "@/firebase/firebase_api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const userId = useSelector((state) => state.app.chatUserId);
  const [messages, setMessages] = useState([]);
  // const params = useSearchParams();
  // const userId = params.get("userId");
  const currentUserId = useSelector((state) => state.app.currentUserId);
  useEffect(
    () =>
      readMessageChanges(currentUserId, (values) => {
        values.forEach((value) => {
          const { type, data } = value;
          //console.log(`type: ${type}, data: ${data}`);
          if (type === "added") {
            setMessages((messages) => [...messages, data]);
          }
          if (type === "modified") {
            setMessages((messages) =>
              messages.map((message) =>
                message.id === data.id ? data : message
              )
            );
          }
          if (type === "removed") {
            setMessages((messages) =>
              messages.filter((message) => message.id !== data.id)
            );
          }
        });
      }),
    [currentUserId]
  );

  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Messages</p>

      <div className="h-full w-full flex">
        <div
          className={`h-full w-full ${
            userId ? "hidden md:flex flex-col" : "flex flex-col"
          } md:w-[40%]`}
        >
          <MessageList messages={messages} />
        </div>
        <div
          className={`h-full w-full ${
            userId ? "flex flex-col" : "hidden md:flex flex-col"
          } md:w-[60%]`}
        >
          <ChatList messages={messages} />
        </div>
      </div>
    </div>
  );
}
