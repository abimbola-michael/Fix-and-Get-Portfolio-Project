import React from "react";

export default function ProfileDetail({ name, value, message, children }) {
  return (
    <div className="flex flex-col w-full items-start border-b-2 border-gray-200 py-2 pr-4 my-2 cursor-pointer">
      <p className="text-sm text-gray-500">{name}</p>
      {message && (
        <p className="text-[12px] text-gray-300 font-bold mb-2">{message}</p>
      )}
      {value && <p className="text-md text-black">{value}</p>}
      {children && <div className="mt-2 w-full">{children}</div>}
    </div>
  );
}
