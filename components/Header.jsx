"use client";
import React, { useEffect, useState } from "react";
import TabBar from "./TabBar";
import SearchBar from "./SearchBar";
import Actions from "./Actions";
import Logo from "./Logo";
import { getUId } from "@/firebase/firebase_api";
import LoginActions from "./LoginActions";
import { usePathname, useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import PopupMenuButton from "./PopupMenuButton";
import Link from "next/link";
import { LuBell, LuList } from "react-icons/lu";
import { TbMessage2 } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { PiList } from "react-icons/pi";
import { auth, logout } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searching, setSearching] = useState(false);
  const [open, setOpen] = useState(false);
  const userId = useSelector((state) => state.app.currentUserId);
  // const [userId, setUserId] = useState(null);
  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (user) => {
  //       if (user && user.emailVerified) {
  //         setUserId(user.uid);
  //       } else {
  //         setUserId(null);
  //       }
  //     }),
  //   []
  // );

  function close() {
    setOpen(false);
  }
  // const userId = getUId();

  return (
    <header className="relative z-10 w-full h-[50px] md:w-[56rem] mx-auto flex justify-between items-center px-4 py-2">
      <Logo />
      <div
        className={`${
          searching ? "flex" : "hidden md:flex"
        } absolute left-0 px-3 w-full h-full justify-center items-center z-40 md:-z-20`}
      >
        <SearchBar searching={searching} setSearching={setSearching} />
      </div>

      {userId === null && <LoginActions />}
      {userId && (
        <div className="md:hidden flex gap-4 text-3xl items-center">
          <FiSearch
            className="sm:hidden hover:text-blue-500 text-2xl"
            onClick={() => setSearching(!searching)}
          />
          {open ? (
            <IoMdClose onClick={() => setOpen((open) => !open)} />
          ) : (
            <PiList onClick={() => setOpen((open) => !open)} />
          )}
        </div>
      )}
      {userId && (
        <div
          className={`text-2xl ${
            open
              ? "flex flex-col md:flex-row absolute md:static top-[60px] right-0 left-0 mx-5 md:mx-0 bg-white p-4 md:p-0 rounded-md md:rounded-none shadow-md md:shadow-none"
              : "hidden"
          } md:flex gap-4 md:flex-row items-center`}
          onClick={close}
        >
          {/* <div
            className={`flex gap-2 items-center ${
              pathname === "/search" ? "text-blue-500" : ""
            } hover:text-blue-500`}
          >
            <FiSearch
              className="sm:hidden hover:text-blue-500"
              onClick={() => setSearching(!searching)}
            />
            <p className={`md:hidden font-bold text-lg `}>Search</p>
          </div> */}

          <Link
            href={"/message"}
            className={`flex gap-2 items-center ${
              pathname === "/message" ? "text-blue-500" : ""
            } hover:text-blue-500`}
          >
            <TbMessage2 />
            <p className={`md:hidden font-bold text-lg`}>Messages</p>
          </Link>
          <Link
            href={"/notification"}
            className={`flex gap-2 items-center ${
              pathname === "/notification" ? "text-blue-500" : ""
            } hover:text-blue-500`}
          >
            <LuBell />
            <p className={`md:hidden font-bold text-lg`}>Notifications</p>
          </Link>
          {/* <Link href={"/favorite"} className={`flex gap-2 items-center ${
                    pathname === "/favorite" ? "text-blue-500" : ""
                  } hover:text-blue-500`}>
              <GrFavorite
                

              />
               <p
                    className={`md:hidden font-bold text-lg`}
                  >
                    Messages
                  </p>
            </Link> */}
          <Link
            href={"/list"}
            className={`flex gap-2 items-center ${
              pathname === "/list" ? "text-blue-500" : ""
            } hover:text-blue-500`}
          >
            <LuList />
            <p className={`md:hidden font-bold text-lg `}>Jobs and Orders</p>
          </Link>
          {/* <Link href={"/cart"} className={`flex gap-2 items-center ${
                    pathname === "/search" ? "text-blue-500" : ""
                  } hover:text-blue-500`}>
              <FiShoppingCart
                
              />
               <p
                    className={`md:hidden font-bold text-lg`}
                  >
                    Cart
                  </p>
            </Link> */}
          <Link
            href={`/profile?userId=${userId}`}
            className={`flex gap-2 items-center ${
              pathname === `/profile?userId=${userId}` ? "text-blue-500" : ""
            } hover:text-blue-500`}
          >
            <PopupMenuButton
              items={[
                { child: "Settings", action: () => {} },
                {
                  child: "Logout",
                  action: () => {
                    logout();
                    router.push("/login");
                  },
                },
              ]}
            >
              <div
                className={`flex gap-2 items-center ${
                  pathname === `/profile?userId=${userId}`
                    ? "text-blue-500"
                    : ""
                } hover:text-blue-500`}
              >
                <CgProfile />
                <p className={`md:hidden font-bold text-lg`}>Profile</p>
              </div>
            </PopupMenuButton>
            {/* <CgProfile
              
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
        </div>
      )}
    </header>
  );
}
