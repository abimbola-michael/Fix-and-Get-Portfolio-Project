"use client";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function NotificationItem({ notification }) {
  const dispatch = useDispatch();
  return (
    <li
      key={notification.id}
      className="flex gap-2 px-4 py-2"
      onClick={() => {}}
    >
      <Image
        src={"/images/mechanic.jpg"}
        alt={`_img`}
        width={50}
        height={50}
        objectFit="cover"
        className="rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-md">{notification.name}</p>
        <p className="text-sm text-gray-700 text-ellipsis">
          {notification.message}
        </p>
        {/* <div className="h-[1px] w-full bg-gray-200"></div> */}
      </div>
    </li>
  );
}
