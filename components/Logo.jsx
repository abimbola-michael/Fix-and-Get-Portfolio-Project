import React from "react";
import { Quicksand } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

// const shrikhand = Shrikhand({ subsets: ["latin"], weight: "400" });

const quicksand = Quicksand({ subsets: ["latin"] });

export default function Logo() {
  const pathname = usePathname();
  return (
    <Link
      href={"/"}
      className={`${
        quicksand.className
      } text-3xl font-bold hover:text-blue-500 ${
        pathname === "/" ? "text-blue-500" : "text-black"
      }`}
    >
      fix&get
      {/* <span className="text-blue-500">Fix</span>
      <span> & </span>
      <span className="text-orange-500">Get</span> */}
    </Link>
  );
}
