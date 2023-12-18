import React from "react";

export default function CenterMessage({ message }) {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <p className="text-lg font-bold text-gray-700">{message}</p>
    </div>
  );
}
