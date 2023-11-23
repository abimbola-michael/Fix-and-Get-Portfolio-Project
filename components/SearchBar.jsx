"use client";
import React, { useState } from "react";
import { IoSearchCircle } from "react-icons/io5";

export default function SearchBar({ onSearch, searching }) {
  const [text, setText] = useState("");
  return (
    <div
      className={`${
        searching ? "" : "hidden sm:flex"
      } flex gap-3 justify-center items-center rounded-full outline-none border-2 border-grey-400 shadow-md px-3 py-2`}
    >
      <input
        className="mx-4 flex-1 text-sm focus:outline-none"
        placeholder="Search... "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IoSearchCircle className="w-8 h-8" onClick={() => onSearch(text)} />

      {/* <div className="flex">
        <button className="px-4 py-2 font-bold bg-blue-600 rounded-l-full text-white">
          Fix
        </button>
        <button className="px-4 py-2 font-bold bg-orange-600 rounded-r-full text-white">
          Get
        </button>
      </div> */}
    </div>
  );
}
