"use client";
import React, { useState } from "react";
import Tab from "./Tab";
export default function ProfileTabBar() {
  return (
    <div className="flex items-center justify-between bg-gray-200 text-black rounded-full mx-3">
      <Tab text={"Fix"} tab={0} />
      <Tab text={"Get"} tab={1} />
      <Tab text={"Fixed Items"} tab={2} />
      <Tab text={"Sold Items"} tab={3} />
    </div>
  );
}
