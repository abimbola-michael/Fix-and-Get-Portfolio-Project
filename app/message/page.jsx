"use client";
import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import { readMessageChanges } from "@/firebase/firebase_api";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const chatId = useSelector((state) => state.app.chatId);
  const [messages, setMessages] = useState([]);
  useEffect(
    () =>
      readMessageChanges((values) => {
        values.forEach((value) => {
          const { type, data } = value;
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
    []
  );

  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Messages</p>

      <div className="h-full w-full flex">
        <div className={`h-full ${chatId ? "w-0" : "w-full"} md:w-[40%]`}>
          <MessageList messages={messages} />
        </div>
        <div className={`h-full ${chatId ? "w-full" : "w-0"} md:w-[60%]`}>
          <ChatList messages={messages} />
        </div>
      </div>
    </div>
  );
}
