import React from "react";

export default function AppInput({
  placeholder,
  value,
  onChange,
  small,
  outline,
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      className={`w-auto max-w-full box-border focus:outline-none ${
        small ? "text-[12px] px-2 py-1" : "text-md px-4 py-2"
      } ${
        outline
          ? "bg-transparent rounded-full text-blue-500 font-bold border-2 border-blue-500 whitespace-nowrap"
          : "bg-blue-500 rounded-full text-white font-bold whitespace-nowrap"
      }`}
    />
  );
}
