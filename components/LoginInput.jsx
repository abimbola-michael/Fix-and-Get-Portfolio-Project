import React from "react";

export default function LoginInput({
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="w-full flex flex-col items-start border-b-2 border-gray-200 py-2 pr-4 my-2 text-sm">
      <p className="text-sm text-gray-500">{placeholder}</p>

      <input
        className="w-full focus:outline-none"
        type={type}
        placeholder={`Enter ${placeholder}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
