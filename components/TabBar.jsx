"use client";
import React, { useState } from "react";
import Tab from "./Tab";
export default function TabBar() {
  return (
    <div className="flex items-center bg-gray-200 text-black rounded-full">
      <Tab text={"Fix"} tab={0} />
      {/* <span className="items-center text-xl font-bold">&</span> */}
      <Tab text={"Get"} tab={1} />
    </div>
  );
}
