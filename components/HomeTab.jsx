import React from "react";

export default function HomeTab({
  name,
  currentTab,
  setCurrentTab,
  hoverSelect = false,
}) {
  const selected = name === currentTab;
  return (
    <div
      className={`w-full text-lg text-center px-3 py-2 ${
        selected ? "text-blue-500 border-b-2 border-blue-500 border-solid" : ""
      }`}
      onMouseEnter={hoverSelect ? () => setCurrentTab(name) : null}
      onClick={() => setCurrentTab(name)}
    >
      {name}
    </div>
  );
}
