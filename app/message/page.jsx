import ChatList from "@/components/ChatList";
import Header from "@/components/Header";
import MessageList from "@/components/MessageList";
import Image from "next/image";
import React from "react";

export default function Message() {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <div className="max-w-4xl mx-auto flex flex-col">
        <p className="font-bold text-lg mx-4 my-2">Messages</p>

        <div className="h-[80vh] w-full flex">
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
