import React, { useEffect, useRef, useState } from "react";

export default function PopupMenuButton({ items, children, useHover = true }) {
  const [show, setShow] = useState(false);
  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setShow(true);
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setShow(false);
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeout?.current) {
        clearTimeout(hoverTimeout.current);
      }
    };
  }, []);
  return (
    <div
      className="relative hover:text-black flex flex-col items-start"
      onMouseEnter={useHover ? handleMouseEnter : null}
      onMouseLeave={useHover ? handleMouseLeave : null}
    >
      <div className="w-full" onClick={useHover ? null : () => setShow(!show)}>
        {children}
      </div>

      {show && (
        <ul className="w-[200px] z-10 bg-white absolute top-[30px] left-[-100px] shadow-lg p-5 text-sm flex flex-col gap-4 items-start">
          {items.map((item, index) => (
            <li
              className="w-full flex justify-start items-center gap-2 hover:text-blue-500"
              key={index}
              onClick={() => {
                item.action(index);
                handleMouseLeave();
              }}
            >
              {item.child}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
