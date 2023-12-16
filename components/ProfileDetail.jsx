import React from "react";

export default function ProfileDetail({
  name,
  value,
  message,
  children,
  rightChild,
}) {
  return (
    <div className="w-full flex items-center border-b-2 border-gray-200 py-2 my-2">
      <div className="w-full flex flex-col items-start cursor-pointer">
        <p className="text-sm text-gray-500">{name}</p>
        {message && (
          <p className="text-[12px] text-gray-300 font-bold mb-2">{message}</p>
        )}
        {value && <p className="text-sm text-black">{value}</p>}
        {children && <div className="mt-2 w-full text-sm">{children}</div>}
      </div>
      {rightChild && <div className="ml-4">{rightChild}</div>}
    </div>
  );
}
