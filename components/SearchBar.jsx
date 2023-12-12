"use client";
import { changeSearchText } from "@/slices/appSlice";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearchCircle } from "react-icons/io5";
import { useDispatch } from "react-redux";

export default function SearchBar({ onSearch, searching, setSearching }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className={`bg-white w-full md:w-[30%] ${
        searching ? "" : "hidden sm:flex"
      } flex justify-center items-center rounded-full outline-none border-2 border-grey-400 shadow-md px-3 py-1`}
    >
      <input
        className="w-full px-2 flex-1 text-sm focus:outline-none"
        placeholder="Search... "
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <IoMdClose
        className="md:hidden mr-3"
        onClick={() => {
          setSearching(false);
          onSearch?.("");
          setText("");
        }}
      />
      <IoSearchCircle
        className="w-8 h-8"
        onClick={() => {
          dispatch(changeSearchText(text));
          router.push(`/search?keyword=${text}`, "/search", { shallow: true });
          onSearch?.(text);
          setText("");
        }}
      />
    </div>
    // <input
    //   className={`mx-4 my-2 text-sm focus:outline-none ${
    //     searching ? "" : "hidden sm:flex"
    //   } flex gap-3 justify-center items-center rounded-full outline-none border-2 border-grey-400 shadow-md px-5 py-2`}
    //   placeholder="Search... "
    //   value={text}
    //   onChange={(e) => setText(e.target.value)}
    // />
  );
}
