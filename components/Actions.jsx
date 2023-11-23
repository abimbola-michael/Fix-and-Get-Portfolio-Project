"use client";
import React, { useState } from "react";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";
import { LuHome } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { FiShoppingCart } from "react-icons/fi";
import { LuBell } from "react-icons/lu";
import { GrFavorite } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { TbMessage2 } from "react-icons/tb";
import { LuList } from "react-icons/lu";

import SearchBar from "./SearchBar";

export default function Actions() {
  const [searching, setSearching] = useState(false);
  return (
    <div className="flex gap-5 items-center text-2xl">
      {/* <LoginButton />
      <SignupButton /> */}
      {searching ? (
        <SearchBar
          searching={searching}
          onSearch={(text) => setSearching(false)}
        />
      ) : (
        !searching && (
          <>
            <FiSearch
              className="sm:hidden hover:text-blue-500"
              onClick={() => setSearching(!searching)}
            />
            <TbMessage2 className="hover:text-blue-500" />
            <LuBell className="hover:text-blue-500" />
            <GrFavorite className="hover:text-blue-500" />
            <LuList className="hover:text-blue-500" />
            <FiShoppingCart className="hover:text-blue-500" />
            <CgProfile className="hover:text-blue-500" />
          </>
        )
      )}
    </div>
  );
}
