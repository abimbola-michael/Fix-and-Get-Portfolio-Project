import React from "react";

export default function LoginButton({ text, outline, onClick }) {
  if (outline) {
    return (
      <button
        className={
          "px-4 py-2 mt-4 rounded-lg text-blue-500 border-blue-500 border text-center w-full text-ellipsis overflow-hidden"
        }
        onClick={onClick}
      >
        {text}
      </button>
    );
  }
  return (
    <button
      className={
        "px-4 py-2 mt-4 rounded-lg bg-blue-500 text-white text-center w-full"
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
}
