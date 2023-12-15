import React from "react";

export default function ProfileStats({ title, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-1 items-center text-md text-gray-700"
    >
      <span className="font-bold text-lg text-blue-500">{count}</span>
      {title}
    </button>
  );
}
