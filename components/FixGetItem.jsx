"use client";
import Image from "next/image";
import React from "react";
import AppButton from "./AppButton";
import { GrFavorite } from "react-icons/gr";
import { stringsToList } from "@/utils/helpers";
import { useRouter } from "next/navigation";

export default function FixGetItem({
  item: {
    userId,
    id,
    type,
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
  onClick,
}) {
  const router = useRouter();
  const urls = stringsToList(url);
  const mediaTypes = stringsToList(mediaType);
  function viewPost() {
    router.push(`/item?type=${type}&id=${id}&userId=${userId}`);
  }

  return (
    <li
      className={`flex flex-col w-full sm:w-[49%] md:w-[32%] gap-2 ${
        available ? "text-black" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      <div className="w-full h-[250px] relative">
        <div
          className="w-full h-[250px] bg-cover bg-center flex flex-wrap"
          style={{
            backgroundImage: urls.isEmpty
              ? "url(/images/img_placeholder.png)"
              : "",
          }}
          onClick={viewPost}
        >
          {urls &&
            urls.map((url, index) => {
              return (
                <div
                  key={url}
                  className={`p-1 ${urls.length < 3 ? "h-full" : "h-[50%]"} ${
                    urls.length == 1 || (index === 2 && urls.length === 3)
                      ? "w-full"
                      : "w-[50%]"
                  }`}
                >
                  <Image
                    src={url}
                    alt={`${index + 1} ${mediaTypes[index]}`}
                    width={250}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                    onClick={() => {}}
                  />
                  {/* <IoMdCloseCircle
                    className="absolute top-3 right-3 text-gray-100 text-xl"
                    onClick={() => removeFile(index)}
                  /> */}
                </div>
              );
            })}
          {/* <Image
            src={url}
            alt={`${name} ${mediaType}`}
            width={250}
            height={200}
            className={`w-full h-full object-cover rounded-lg ${
              available ? "cursor-pointer " : "cursor-none grayscale"
            }}`}
          /> */}
        </div>

        <div className="flex gap-5 absolute bottom-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-2xl font-bold">
          <GrFavorite />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <h2 className="w-full font-bold text-md">{name}</h2>
        <p className="w-full text-sm">{desc}</p>

        <div className="flex gap-2 items-center">
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
