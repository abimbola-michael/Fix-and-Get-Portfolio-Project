"use client";
import React, { useEffect, useRef, useState } from "react";
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
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/firebase";
import PopupMenuButton from "./PopupMenuButton";
import { getUId } from "@/firebase/firebase_api";

export default function Actions() {
  const pathname = usePathname();
  const [searching, setSearching] = useState(false);
  const userId = getUId();

  return (
    <div className="flex gap-5 items-center text-2xl">
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

            <Link href={"/message"}>
              <TbMessage2
                className={`${
                  pathname === "/message" ? "text-blue-500" : ""
                } hover:text-blue-500 `}
              />
            </Link>
            <Link href={"/notification"}>
              <LuBell
                className={`${
                  pathname === "/notification" ? "text-blue-500" : ""
                } hover:text-blue-500 `}
              />
            </Link>
            {/* <Link href={"/favorite"}>
              <GrFavorite
                className={`${
                  pathname === "/favorite" ? "text-blue-500" : ""
                } hover:text-blue-500 `}
              />
            </Link> */}
            <Link href={"/list"}>
              <LuList
                className={`${
                  pathname === "/list" ? "text-blue-500" : ""
                } hover:text-blue-500 `}
              />
            </Link>
            {/* <Link href={"/cart"}>
              <FiShoppingCart
                className={`${
                  pathname === "/cart" ? "text-blue-500" : ""
                } hover:text-blue-500 `}
              />
            </Link> */}
            <Link
              href={`/profile/${userId}`}
              // onMouseEnter={handleMouseEnter}
            >
              <PopupMenuButton
                items={[
                  { name: "Settings", action: () => {} },
                  {
                    name: "Logout",
                    action: () => {
                      setHover(false);
                      logout();
                    },
                  },
                ]}
              >
                <CgProfile
                  className={`${
                    pathname === `/profile/${userId}` ? "text-blue-500" : ""
                  } hover:text-blue-500 `}
                />
              </PopupMenuButton>
              {/* <CgProfile
                className={`${
                  pathname === "/profile" ? "text-blue-500" : ""
                } hover:text-blue-500 `}
              />
              {hover && (
                <PopupMenu
                  onMouseLeave={handleMouseLeave}
                  items={[
                    { name: "Settings", action: () => {} },
                    {
                      name: "Logout",
                      action: () => {
                        setHover(false);
                        logout();
                      },
                    },
                  ]}
                />
              )} */}
            </Link>
          </>
        )
      )}
    </div>
  );
}
