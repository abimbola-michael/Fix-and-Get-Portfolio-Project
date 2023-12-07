import Link from "next/link";
import React from "react";

export default function AppButton({ children, outline, onClick, small, link }) {
  if (link)
    return (
      <Link
        href={link}
        className={`${small ? "text-[12px] px-2 py-1" : "text-md px-4 py-2"} ${
          outline
            ? "bg-transparent rounded-full text-blue-500 font-bold border-2 border-blue-500 whitespace-nowrap"
            : "bg-blue-500 rounded-full text-white font-bold whitespace-nowrap"
        }`}
      >
        {children}
      </Link>
    );
  return (
    <button
      className={`${small ? "text-[12px] px-2 py-1" : "text-md px-4 py-2"} ${
        outline
          ? "bg-transparent rounded-full text-blue-500 font-bold border-2 border-blue-500 whitespace-nowrap"
          : "bg-blue-500 rounded-full text-white font-bold whitespace-nowrap"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
