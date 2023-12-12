"use client";
import Header from "@/components/Header";
import NotificationItem from "@/components/NotificationItem";
import React, { useState } from "react";

export default function Notification() {
  // const notifications = Array.from({ length: 10 }, (v, i) => {
  //   return {
  //     id: i.toString(),
  //     url: "/images/laptop.jpg",
  //     uid: "1",
  //     name: "Desire",
  //     message: "Would like fix my Laptop",
  //   };
  // });
  const [notifications, setNotifications] = useState([]);
  return (
    <div className="max-w-4xl w-full mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Notifications</p>
      <div className="overflow-y-auto h-full w-full">
        {notifications ? (
          <ul className="flex flex-col w-full h-full">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col h-full w-full items-center justify-center">
            <p className="text-lg font-bold text-gray-700">No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
