import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import Image from "next/image";
import React from "react";

export default function Message() {
  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Messages</p>

      <div className="flex flex-col">
        <div className="h-[85vh] w-full flex">
          <div className="h-full shrink-0 md:w-[40%]">
            <MessageList />
          </div>
          <div className="h-full md:w-[60%]">
            <ChatList />
          </div>
        </div>
      </div>
    </div>
  );
}
