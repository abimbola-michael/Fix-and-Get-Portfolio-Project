import React from "react";

export default function PopupMenu({ items, onMouseLeave }) {
  return (
    <div className="absolute z-10 top-[30px] right-0 shadow-md p-5 text-sm">
      <ul className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            className=""
            key={index}
            onClick={items.action}
            onMouseLeave={onMouseLeave}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
