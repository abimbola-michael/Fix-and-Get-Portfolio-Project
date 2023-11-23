import { changeTab } from "@/slices/appSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Vina_Sans } from "next/font/google";

// const vina = Vina_Sans({ weight: "400", subsets: ["latin"] });
export default function Tab({ text, tab }) {
  const currentTab = useSelector((state) => state.app.tab);
  const dispatch = useDispatch();
  return (
    <div
      className={`px-4 py-2 text-center flex flex-col items-center font-bold text-2xl ${
        tab === currentTab ? "bg-blue-500 text-white rounded-full" : ""
      }`}
      onClick={() => dispatch(changeTab(tab))}
    >
      {text}
    </div>
  );
}
