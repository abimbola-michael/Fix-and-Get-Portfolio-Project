import React, { useRef } from "react";
import AppButton from "./AppButton";
import FixGetInputItem from "./FixGetInputItem";

export default function FixGetItemsList({ items, setItems }) {
  function updateItem(type, value, index) {
    if (type === "paths" && value.length === 0) {
      setItems((items) => items.filter((item, i) => index !== i));
      return;
    }
    setItems((items) =>
      items.map((item, i) => (index === i ? { ...item, [type]: value } : item))
    );
  }
  return (
    <div className="flex flex-col w-full items-start overflow-x-auto">
      <ul className="flex gap-3 mb-2">
        {items.map((item, index) => (
          <FixGetInputItem
            key={index}
            item={item}
            index={index}
            onChange={(type, value) => updateItem(type, value, index)}
          />
        ))}
      </ul>
    </div>
  );
}
