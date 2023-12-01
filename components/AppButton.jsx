import React from "react";

export default function AppButton({ children, outline, onClick }) {
  return (
    <button
      className={
        outline
          ? "bg-transparent px-4 py-2 rounded-full text-blue-500 font-bold border-2 border-blue-500 whitespace-nowrap"
          : "bg-blue-500 px-4 py-2 rounded-full text-white font-bold whitespace-nowrap"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
