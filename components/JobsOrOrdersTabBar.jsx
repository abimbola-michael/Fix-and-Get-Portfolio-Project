"use client";
import React, { useState } from "react";
import Tab from "./Tab";
export default function JobsAorOrdersTabBar() {
  return (
    <div className="flex items-center justify-evenly bg-gray-200 text-black rounded-full mx-3">
      <Tab text={"Jobs"} tab={0} />
      <Tab text={"Orders"} tab={1} />
    </div>
  );
}
