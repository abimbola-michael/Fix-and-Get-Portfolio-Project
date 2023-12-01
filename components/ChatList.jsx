"use client";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IoCallOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { BiSolidSend } from "react-icons/bi";
import ChatItem from "./ChatItem";

const users = [
  {
    id: "1",
    name: "Michael",
    email: "michael",
    message: "Please is there laptop screen",
  },
  {
    id: "2",
    name: "Hotshot",
    email: "hotshot",
    message: "I want by Pizza. Is it available",
  },
  {
    id: "3",
    name: "Mickey",
    email: "mickey",
    message: "Can u fix a built freezer",
  },
];

const startChats = [
  {
    id: "1",
    uid: "1",
    message: "Holla at your boy",
    name: "Hotshot",
  },
  {
    id: "2",
    uid: "0",
    message: "Wad up",
    name: "Hotshot",
  },
  {
    id: "3",
    uid: "1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Hotshot",
  },
  {
    id: "4",
    uid: "0",
    message:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Hotshot",
  },
];

export default function ChatList() {
  const listRef = useRef(null);
  const [text, setText] = useState("");
  const [chats, setChats] = useState(startChats);
  const chatId = useSelector((state) => state.app.chatId);
  const user = users.find((user) => user.id === chatId);
  function sendMessage() {
    setChats((chats) => [
      ...chats,
      {
        id: chats.length + 1,
        uid: Math.round(Math.random()).toString(),
        message: text,
        name: "Hotshot",
      },
    ]);
    setText("");
  }
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [sendMessage]);

  if (!user) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <p>Tap on a user to chat</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 flex justify-between items-center">
        <div key={user.id} className="flex gap-2 px-4 py-2 items-center">
          <Image
            src={"/images/mechanic.jpg"}
            alt={`${user.id}_img`}
            width={50}
            height={50}
            className="rounded-full cover aspect-square"
          />
          <div className="flex flex-col">
            <p className="text-md">{user.name}</p>
            <p className="text-sm text-gray-700 line-clamp-1">{user.message}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-2xl mx-2 md:mx-4">
          <IoCallOutline />
          <LuSearch />
        </div>
      </div>
      <ul ref={listRef} className="grow overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem key={chat.id} chat={chat} />
        ))}
      </ul>
      <div className="shrink-0 flex gap-3 justify-center items-center rounded-full outline-none border-2 border-grey-400 shadow-md w-full px-3 py-2 m-3">
        <input
          className="mx-4 flex-1 text-sm focus:outline-none w-full"
          placeholder="Write message... "
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <BiSolidSend
          className="w-8 h-8"
          onClick={() => {
            sendMessage();
          }}
        />
      </div>
    </div>
  );
}
