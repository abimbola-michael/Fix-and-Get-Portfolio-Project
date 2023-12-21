import { stringsToList } from "@/utils/helpers";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Carousel from "./Carousel";

export default function VideoImageDisplay({
  type,
  url,
  mediaType,
  index,
  message,
  onClose,
}) {
  const urls = stringsToList(url);
  const mediaTypes = stringsToList(mediaType);
  return (
    <div className="z-30 absolute left-0 right-0 bg-black flex items-center justify-center h-screen">
      <div className="relative first-letter:flex flex-col items-center">
        <div className="z-40 absolute top-7 left-7 flex gap-2 items-center text-white">
          <IoMdClose
            className="text-3xl"
            onClick={() => {
              onClose?.();
            }}
          />
          <p className="text-lg font-bold">{type}</p>
        </div>

        <div className="w-full h-[500px]">
          <Carousel
            urls={urls}
            mediaTypes={mediaTypes}
            autoSlide={false}
            index={index}
            // indicators="images"
          />
        </div>
        {message && (
          <p className="text-white font-semibold text-lg py-1">{message}</p>
        )}
      </div>
    </div>
  );
}
