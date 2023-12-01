"use client";
import React from "react";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import Actions from "./Actions";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="relative w-full md:w-[56rem] mx-auto flex justify-between items-center px-4 py-2">
      {/* <Logo />
        <SearchBar />
        <Actions /> */}

      {/* <TabBar /> */}
      {/* <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center z-[-20px]">
        <SearchBar />
      </div> */}
      <Logo />
      <SearchBar />
      <Actions />
    </header>
  );
}
