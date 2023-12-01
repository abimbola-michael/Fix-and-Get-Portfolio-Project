"use client";
import React, { useState } from "react";
import Tab from "./Tab";
export default function FavoriteTabBar() {
  return (
    <div className="flex items-center justify-between bg-gray-200 text-black rounded-full mx-3">
      <Tab text={"Fixers"} tab={0} />
      <Tab text={"Sellers"} tab={1} />
      <Tab text={"Items"} tab={2} />
    </div>
  );
}
