import React from "react";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import Actions from "./Actions";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-16 px-4 py-2">
      {/* <Logo />
        <SearchBar />
        <Actions /> */}
      <TabBar />
      <SearchBar />
      <Actions />
    </header>
  );
}
