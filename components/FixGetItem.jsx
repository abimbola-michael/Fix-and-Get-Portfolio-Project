import Image from "next/image";
import React from "react";
import AppButton from "./AppButton";
import { GrFavorite } from "react-icons/gr";

export default function FixGetItem({
  item: {
    name,
    desc,
    price,
    discPrice,
    negotiable,
    url,
    mediaType,
    currency,
    available = true,
  },
}) {
  function viewPost() {}
  return (
    <li
      className={`flex flex-col w-full sm:w-[49%] md:w-[32%] gap-2 ${
        available ? "text-black" : "text-gray-500"
      }`}
    >
      <div className="w-full h-[250px] relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/images/img_placeholder.png)" }}
          onClick={viewPost}
        >
          <Image
            src={url}
            alt={`${name} ${mediaType}`}
            width={250}
            height={200}
            className={`w-full h-full object-cover rounded-lg ${
              available ? "cursor-pointer " : "cursor-none grayscale"
            }}`}
          />
        </div>

        <div className="flex gap-5 absolute bottom-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-2xl font-bold">
          <GrFavorite />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h2 className="w-full font-bold text-md px-2">{name}</h2>
        <p className="w-full text-sm px-2">{desc}</p>

        <div className="flex gap-2 px-2 items-center">
          <p className="text-md py-1 font-bold text-blue-500">
            NGN {discPrice ? discPrice : price}
          </p>

          {discPrice && (
            <p className="text-sm py-1 font-bold line-through text-gray-500">
              NGN {price}
            </p>
          )}

          {negotiable && (
            <AppButton outline={true} small={true}>
              Negotiable
            </AppButton>
          )}
        </div>
      </div>
    </li>
  );
}
