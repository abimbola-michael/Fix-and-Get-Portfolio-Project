import React from "react";

export default function Loader({ message }) {
  return (
    <div className="absolute left-0 right-0 bg-gray-300/50 flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <div className="border-t-4 border-blue-500 rounded-full animate-spin h-12 w-12"></div>
        {message && (
          <p className="text-black font-semibold text-lg">{message}</p>
        )}
      </div>
    </div>
  );
}
