import Header from "@/components/Header";
import React from "react";

export default function Profile() {
  return (
    <div className="h-screen">
      <Header />
      <div className="flex flex-col">
        <div className="flex mx-3 md:mx-auto my-2 gap-3 items-center max-w-3xl">
          <img
            className="w-[150px] h-[150px] rounded-full shrink-0"
            src="/images/photo.jpg"
          />
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Fixit Enterprise</h1>
            <h2 className="font-semibold">Abimbola Michael</h2>
            <p className="mt-2 text-ellipsis overflow-hidden">
              Fixit Enterprise is a company that assist in fixing of cars and
              other forms of electronics like Refridgerators, Fans, Generators
              etc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
