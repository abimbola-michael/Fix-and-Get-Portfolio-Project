"use client";
import React from "react";
import LoginInput from "./LoginInput";
import AppButton from "./AppButton";

export default function ComfirmPassword({ onClose, onComfirm }) {
  const [comfirimPassword, setComfirmPassword] = useState("");

  return (
    <div
      className="left-0 right-0 bg-gray-300/50 absolute w-full h-full flex flex-col items-center justify-center"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="bg-white flex flex-col items-center justify-center gap-5 px-3 md:px-5 py-4 rounded-lg w-[50%] h-[50%]"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="font-bold text-lg text-center">Comfirm Password</h2>
        <LoginInput
          placeholder={"Password"}
          value={comfirimPassword}
          onChange={setComfirmPassword}
          type="password"
        />

        <div className="w-full flex justify-evenly items-center">
          <AppButton
            outline={true}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </AppButton>
          <AppButton
            onClick={() => {
              onComfirm(comfirimPassword);
              onClose();
            }}
          >
            Save
          </AppButton>
        </div>
      </div>
    </div>
  );
}
