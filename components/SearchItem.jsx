"use client";
import { changeSearch } from "@/slices/appSlice";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

export default function SearchItem({ user }) {
  const dispatch = useDispatch();
  const images = Array.from({ length: 10 }, (v, i) => {
    return { url: "/images/laptop.jpg", type: "image", id: i.toString() };
  });
  return (
    <li className="flex flex-col px-4 py-2 gap-2">
      <div
        key={user.id}
        className="flex gap-2"
        onClick={() => dispatch(changeSearch(user.id))}
      >
        <Image
          src={"/images/mechanic.jpg"}
          alt={`${user.id}_img`}
          width={50}
          height={50}
          objectFit="cover"
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-md">{user.companyName}</p>
          <p
            className="text-sm text-gray-700 text-ellipsis"
            style={{ maxLines: "1" }}
          >
            {user.name}
          </p>
          {/* <div className="h-[1px] w-full bg-gray-200"></div> */}
        </div>
      </div>
      <ul className="flex gap-2 overflow-x-auto overflow-y-hidden">
        {images.map((image) => (
          <li key={image.id}>
            {image.type === "image" ? (
              <div className="w-64 h-56">
                <Image
                  src={image.url}
                  alt={`${image.id}_img`}
                  width={250}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <video
                src={image.url}
                alt={`${image.id}_img`}
                width={250}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </li>
        ))}
      </ul>
    </li>
  );
}
