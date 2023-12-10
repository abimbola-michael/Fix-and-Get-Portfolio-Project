import React, { useEffect, useState } from "react";
import Image from "next/image";
import { readUser } from "@/firebase/firebase_api";
import StoreItem from "./FixGetItem";
import { convertMilisecToTime } from "@/utils/helpers";
import Carousel from "./Carousel";
import ProfileStats from "./ProfileStats";

export default function PostItem({
  post: {
    id,
    userId,
    postType,
    type,
    category,
    subCategory,
    title,
    caption,
    url,
    mediaType,
    time,
  },
  isFeed = false,
}) {
  const [user, setUser] = useState(null);
  const urls = url.includes(",") ? url.split(",") : url;
  useEffect(() => {
    async function getUser() {
      const result = await readUser(userId);
      setUser(result);
    }
    getUser();
  }, [userId]);
  return (
    <div className="w-full flex flex-col gap-2">
      {user && (
        <div
          key={user.id}
          className="flex gap-2 items-center"
          onClick={() => {}}
        >
          <Image
            src={`${user.profilePic || "/images/mechanic.jpg"}`}
            alt={`${user.name} Image`}
            width={50}
            height={50}
            className="rounded-full aspect-square cover shrink-0"
          />
          <div className="grow flex flex-col">
            <div className="flex justify-between items-center">
              <p className="text-md">{user.name}</p>
              <p className="text-[12px] text-gray-500">
                {convertMilisecToTime(time)}
              </p>
            </div>
            <h1 className="text-sm">{title}</h1>
          </div>
        </div>
      )}
      <p className="text-md">{caption}</p>
      {isFeed ? (
        <div className="w-full h-[300px] md:h-[400px]">
          <Carousel urls={urls} autoSlide={true} />
        </div>
      ) : (
        <div className="w-full h-[300px] md:h-[400px] flex flex-wrap">
          {urls.map((url, index) => (
            <div
              key={url}
              className={`relative p-1 ${
                urls.length < 3 ? "h-full" : "h-[50%]"
              } ${
                urls.length == 1 || (index === 2 && urls.length === 3)
                  ? "w-full"
                  : "w-[50%]"
              }`}
            >
              <Image
                src={url}
                alt={`${index + 1} Image`}
                width={250}
                height={200}
                className="w-full h-full object-cover rounded-lg"
                // onClick={handleButtonClick}
              />
              {urls.length > 4 && (
                <div className="flex text-center justify-center w-full h-full bg-gray-800/25 text-gray-100 text-xl font-bold">
                  +{urls.length - 4}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-3 w-full">
        <ProfileStats title="Likes" count={100} />
        <ProfileStats title="Comments" count={50} />
      </div>
      {/* <ul className="w-full flex gap-3">
        {items.map((item) => (
          <StoreItem post={item} key={item.url} />
        ))}
      </ul> */}
    </div>
  );
}
