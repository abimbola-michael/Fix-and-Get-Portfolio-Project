"use client";
import Image from "next/image";
import React, {
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCallOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { BiSolidSend } from "react-icons/bi";
import ChatItem from "./ChatItem";
import { IoIosArrowBack } from "react-icons/io";
import { changeChat, changeChatUserId } from "@/slices/appSlice";
import { convertMilisecToTime, getUserMessages } from "@/utils/helpers";
import { getUId, getUser, sendChatMessage } from "@/firebase/firebase_api";
import { getId } from "@/firebase";
import { useSearchParams } from "next/navigation";

const users = [
  {
    id: "1",
    name: "Michael",
    email: "michael",
    message: "Please is there laptop screen",
  },
  {
    id: "2",
    name: "Hotshot",
    email: "hotshot",
    message: "I want by Pizza. Is it available",
  },
  {
    id: "3",
    name: "Mickey",
    email: "mickey",
    message: "Can u fix a built freezer",
  },
];

const startChats = [
  {
    id: "1",
    uid: "1",
    message: "Holla at your boy",
    name: "Hotshot",
  },
  {
    id: "2",
    uid: "0",
    message: "Wad up",
    name: "Hotshot",
  },
  {
    id: "3",
    uid: "1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    name: "Hotshot",
  },
  {
    id: "4",
    uid: "0",
    message:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    name: "Hotshot",
  },
];

export default function ChatList({ messages }) {
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [chats, setChats] = useState(startChats);
  const userId = useSelector((state) => state.app.chatUserId);

  const [user, setUser] = useState(null);
  useEffect(() => {
    scrollToBottom();
  }, []);
  useEffect(() => {
    async function readUser() {
      const user = await getUser(userId);
      setUser(user);
    }
    readUser();
  }, [userId]);
  const chatMessages = getUserMessages(messages, userId);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [sendMessage]);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage() {
    const myId = getUId();
    const message = {
      userId: myId,
      receiverId: userId,
      message: text,
      messageType: "text",
      url: "",
      mediaType: "",
      for: "",
      forId: "",
      time: Date.now(),
      read: false,
    };
    sendChatMessage(message);
    setText("");
  }
  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };
  if (!userId) {
    return (
      <div className="hidden md:flex h-full flex-col items-center justify-center">
        <p>Tap on a user to chat</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[60px] flex justify-between items-center">
        <div key={user?.userId} className="flex gap-2 px-4 py-2 items-center">
          <IoIosArrowBack
            className="text-2xl"
            onClick={() => {
              dispatch(changeChatUserId(""));
            }}
          />
          <Image
            src={user?.profilePhoto || "/images/mechanic.jpg"}
            alt={`${user?.name} Profile Photo`}
            width={50}
            height={50}
            className="rounded-full cover aspect-square"
          />
          <div className="flex flex-col">
            <p className="text-md">{user?.name}</p>
            <p className="text-sm text-gray-700 line-clamp-1">
              {user?.online ? "Online" : convertMilisecToTime(user?.lastSeen)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-2xl mx-2 md:mx-4">
          <IoCallOutline />
          <LuSearch />
        </div>
      </div>
      <div
        ref={listRef}
        className="w-full h-[calc(100vh-220px)] overflow-y-auto px-3"
      >
        {chatMessages.length > 0 ? (
          <ul className="h-full w-full">
            {chatMessages.map((message, i) => (
              <ChatItem key={message.messageId} message={message} />
            ))}
          </ul>
        ) : (
          <div className="flex flex-col h-full w-full items-center justify-center">
            <p className="text-lg font-bold text-gray-700">No chats</p>
          </div>
        )}
      </div>

      <div className="w-full">
        <div className="h-full py-2 flex gap-2 justify-center items-center rounded-full outline-none border-2 border-grey-400 shadow-md px-3 mx-3">
          <input
            multiline={true}
            className="mx-4 flex-1 text-sm focus:outline-none w-full resize-y"
            placeholder="Write message... "
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <BiSolidSend
            className="w-8 h-8"
            onClick={() => {
              sendMessage();
            }}
          />
        </div>
      </div>
    </div>
  );
}
