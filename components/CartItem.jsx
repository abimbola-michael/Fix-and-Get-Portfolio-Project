import Image from "next/image";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";

export default function CartItem({ item }) {
  return (
    <div className="flex flex-col w-[48%] md:w-[32%]">
      <div className="w-full h-44 relative">
        <Image
          src={item.url}
          alt={`${item.name}_img`}
          width={250}
          height={200}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="flex gap-3 absolute top-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-lg font-bold">
          <GrFavorite />
          <FiTrash />
        </div>
      </div>
      <div className="flex row justify-between items-start">
        <div className="flex flex-col">
          <p className="font-bold text-md">{item.name}</p>
          <p className="text-sm">{item.desc}</p>
        </div>
        <p className="text-blue-500 font-bold text-lg">${item.price}</p>
      </div>
    </div>
  );
}
