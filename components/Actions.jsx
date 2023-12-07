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
import PopupMenu from "./PopupMenu";
import { logout } from "@/firebase";

export default function Actions() {
  const pathname = usePathname();
  const [searching, setSearching] = useState(false);
  const [hover, setHover] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHover(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHover(false);
    }, 100);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);
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
              href={"/profile"}
              className="relative group"
              onMouseEnter={handleMouseEnter}
            >
              <CgProfile
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
              )}
            </Link>
          </>
        )
      )}
    </div>
  );
}
