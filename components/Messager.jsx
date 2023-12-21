import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";

export default function Messager({ onSend, onClose }) {
  const [text, setText] = useState("");

  return (
    <div
      className="absolute left-0 right-0 bg-gray-300/50 flex flex-col items-center justify-end h-screen py-2 px-4"
      onClick={onClose}
    >
      <div className="bg-white w-full py-2 flex gap-2 justify-center items-center rounded-full outline-none border-2 border-grey-400 shadow-md px-3 mx-3">
        <input
          multiline={true}
          className="mx-4 flex-1 text-sm focus:outline-none w-full resize-y"
          placeholder="Write message... "
          value={text}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => setText(e.target.value)}
        />
        <BiSolidSend
          className="w-8 h-8"
          onClick={() => {
            onSend(text);
          }}
        />
      </div>
    </div>
  );
}
