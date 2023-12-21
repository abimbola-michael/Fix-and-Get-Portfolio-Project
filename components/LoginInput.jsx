import React from "react";

export default function LoginInput({
  placeholder,
  message,
  name,
  value,
  onChange,
  minValue,
  maxValue,
  type = "text",
}) {
  return (
    <div className="w-full flex flex-col items-start border-b-2 border-gray-200 py-2 pr-4 my-2 text-sm">
      <p className="text-sm text-gray-500">{name || placeholder}</p>
      {message && <p className="text-[12px] text-gray-400 mb-2">{message}</p>}

      <input
        className="w-full focus:outline-none"
        type={type}
        placeholder={placeholder || `Enter ${name || placeholder}`}
        value={value}
        onChange={(e) => {
          const newValue = parseInt(e.target.value);
          if (type === "number") {
            if (minValue && newValue < minValue) {
              return;
            } else if (maxValue && newValue > maxValue) {
              return;
            } else {
              onChange?.(e.target.value);
            }
          } else {
            onChange?.(e.target.value);
          }
        }}
      />
    </div>
  );
}
