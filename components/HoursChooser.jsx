import React from "react";

export default function HoursChooser({
  list,
  title,
  value,
  onChange,
  multiple,
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className="font-semibold text-md">{title}</h3>
      <select
        multiple={multiple}
        value={value}
        onChange={(e) => {
          if (multiple) {
            const selected = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
            onChange?.(selected);
          } else {
            onChange?.(e.target.value);
          }
        }}
        className="gap-2"
      >
        <option key={""} value="" disabled hidden>
          Select {title}
        </option>
        {list.map((value) => (
          <option key={value} value={value} className="">
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}
