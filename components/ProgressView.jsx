import React from "react";

export default function ProgressView({ progress }) {
  return (
    <div className="w-full px-3 py-2">
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
