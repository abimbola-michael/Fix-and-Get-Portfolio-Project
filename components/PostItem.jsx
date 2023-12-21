import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  addComment,
  getUId,
  readPostStats,
  readUser,
  toggleLike,
  toggleRepost,
} from "@/firebase/firebase_api";
import StoreItem from "./FixGetItem";
import { convertMilisecToTime, stringsToList } from "@/utils/helpers";
import Carousel from "./Carousel";
import ProfileStats from "./ProfileStats";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { BiRepost } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import AppButton from "./AppButton";
import CommentItem from "./CommentItem";
import { useRouter } from "next/navigation";

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
  onClick,
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [comment, setComment] = useState("");
  const urls = stringsToList(url);
  const mediaTypes = stringsToList(mediaType);
  const myId = getUId();
  const liked = likes.map((like) => like.id).includes(myId);
  const reposted = reposts.map((repost) => repost.id).includes(myId);

  useEffect(() => {
    async function getUser() {
      const user = await readUser(userId);
      const { comments, likes, reposts } = await readPostStats(userId, id);
      setUser(user);
      setComments(comments);
      setLikes(likes);
      setReposts(reposts);
    }
    getUser();
  }, [userId, id]);
  return (
    <div className="w-full flex flex-col gap-2 cursor-pointer">
      {user && (
        <div
          key={userId}
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
              <p
                className="text-md"
                onClick={() => {
                  router.push(`/profile?userId=${userId}`);
                }}
              >
                {user.name}
              </p>
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
              className={`cursor-pointer relative p-1 ${
                urls.length < 3 ? "h-full" : "h-[50%]"
              } ${
                urls.length == 1 || (index === 2 && urls.length === 3)
                  ? "w-full"
                  : "w-[50%]"
              }`}
              onClick={() => onClick(index)}
            >
              <Image
                src={url}
                alt={`${index + 1} Image`}
                width={250}
                height={200}
                className="w-full h-full object-cover rounded-lg shadow-lg"
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <ProfileStats title="Likes" count={likes.length} />
          <ProfileStats title="Comments" count={comments.length} />
          <ProfileStats title="Reposts" count={reposts.length} />
        </div>
        {comments.length > 0 && (
          <div className="w-full space-y-2">
            <h1 className="font-bold text-lg">Comments</h1>
            <ul className="overflow-y-auto">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </ul>
          </div>
        )}
        <div className="w-full flex items-center gap-3 mx-2 my-4">
          <div className="w-full flex gap-2 items-center text-sm">
            <Image
              src={user?.profilePhoto || "/images/mechanic.jpg"}
              alt={`_img`}
              width={40}
              height={40}
              className="rounded-full object-cover aspect-square"
            />
            <input
              className="w-full outline-none px-4 py-2 border-2 focus:border-black rounded-full"
              placeholder="Write something"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <AppButton
              outline={false}
              onClick={() => {
                addComment(userId, id, comment, comments, setComments);
                setComment("");
              }}
            >
              Comment
            </AppButton>
          </div>
          <div className="flex gap-4 items-center">
            {liked ? (
              <BiSolidLike
                className="text-3xl text-red-600"
                onClick={() => {
                  toggleLike(userId, id, likes, setLikes);
                }}
              />
            ) : (
              <BiLike
                className="text-3xl"
                onClick={() => {
                  toggleLike(userId, id, likes, setLikes);
                }}
              />
            )}
            <BiRepost
              className={`text-4xl ${reposted ? "text-blue-500" : ""}`}
              onClick={() => {
                toggleRepost(userId, id, reposts, setReposts);
              }}
            />
            <PiShareFatBold className={`text-3xl`} onClick={() => {}} />
          </div>
        </div>
      </div>

      {/* <ul className="w-full flex gap-3">
        {items.map((item) => (
          <StoreItem post={item} key={item.url} />
        ))}
      </ul> */}
    </div>
  );
}
