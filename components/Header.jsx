"use client";
import React from "react";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import Actions from "./Actions";
import Logo from "./Logo";
import { getUId } from "@/firebase/firebase_api";
import LoginActions from "./LoginActions";

export default function Header() {
  const isLoggedIn = getUId() !== null;

  return (
    <header className="relative w-full md:w-[56rem] mx-auto flex justify-between items-center px-4 py-2">
      <Logo />
      <SearchBar />
      {isLoggedIn ? <Actions /> : <LoginActions />}
    </header>
  );
}
