import React, { useRef } from "react";
import PostInputItem from "./PostInputItem";
import AppButton from "./AppButton";

export default function PostItemsList({ items, setItems }) {
  function updateItem(type, value, index) {
    setItems((items) =>
      items.map((item, i) => (index === i ? { ...item, [type]: value } : item))
    );
  }
  return (
    <div className="flex flex-col w-full items-start overflow-x-auto">
      <ul className="flex gap-3 mb-2">
        {items.map((item, index) => (
          <PostInputItem
            key={index}
            item={item}
            onChange={(type, value) => updateItem(type, value, index)}
          />
        ))}
      </ul>
    </div>
  );
}
