import React, { useEffect, useRef, useState } from "react";

export default function PopupMenuButton({ items, children }) {
  const [hover, setHover] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHover(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHover(false);
    }, 100);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);
  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {hover && (
        <ul className="z-10 bg-white absolute top-[30px] right-0 shadow-md p-5 text-sm flex flex-col gap-4">
          {items.map((item, index) => (
            <li
              className=""
              key={index}
              onClick={() => {
                items.action();
                handleMouseLeave();
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
