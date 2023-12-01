"use client";
import { changeChat } from "@/slices/appSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import MessageItem from "./MessageItem";

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

export default function MessageList() {
  const dispatch = useDispatch();

  return (
    <ul className="overflow-y-auto">
      {users.map((user) => (
        <MessageItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
