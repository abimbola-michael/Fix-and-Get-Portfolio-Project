"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import CartItem from "@/components/CartItem";
import CommentItem from "@/components/CommentItem";
import Header from "@/components/Header";
import RatingBar from "@/components/RatingBar";
import { readPost, readUser } from "@/firebase/firebase_api";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";

export default function PostPage() {
  const { post_id } = useSearchParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const items = post.items || [];
  const item = items[0] || {};

  useEffect(() => {
    async function getUser() {
      const result = await readUser(result.userId);
      setUser(result);
    }
    async function getPost() {
      const result = await readPost(post_id);
      setPost(result);
      getUser();
    }

    getPost();
  }, [post_id]);

  if (!post) return <div>No post</div>;

  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Post</p>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden mx-4">
        <div className="flex flex-col w-full h-[90%] gap-3">
          <Carousel
            urls={[item.url]}
            autoSlide={true}
            slideDuration={10000}
            indicators="images"
            // callback={setCurrentIndex}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-blue-500 font-bold text-4xl mb-3">
              ${item.price}
            </p>
            <div className="flex gap-4 md:gap-8 text-3xl md:mx-8 mx-4 items-center">
              <AiOutlineLike className={`hover:text-blue-500 `} />
              <BsCartPlus className={`hover:text-blue-500 text-2xl`} />
              <MdOutlineSaveAlt className={`hover:text-blue-500 `} />
            </div>
          </div>

          <p className="font-bold text-xl">{item.name}</p>
          <p className="text-sm">{item.desc}</p>
          <RatingBar size={30} showRating={false} />
        </div>
        <div className="flex justify-between items-center px-4 py-2">
          {user && (
            <div className="flex gap-2 items-center">
              <Image
                src={"/images/mechanic.jpg"}
                alt={`_img`}
                width={50}
                height={50}
                className="rounded-full cover aspect-square"
              />
              <div className="flex flex-col">
                <p className="text-md font-bold">Michaels Stores</p>
                <p className="text-sm text-gray-700 line-clamp-1">
                  Abimbola Michael
                </p>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <AppButton outline={true}>Message</AppButton>
            <AppButton outline={true}>Phone Call</AppButton>
            <AppButton outline={true}>Voice Call</AppButton>
          </div>
        </div>
        <div className="w-full my-4 space-y-3">
          <h1 className="font-bold text-lg">Similar Items</h1>
          <div className="overflow-y-auto">
            <ul className="flex gap-3 mx-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full my-4  space-y-3">
          <h1 className="font-bold text-lg">Comments</h1>
          {/* <ul className="overflow-y-auto">
            {users.map((user) => (
              <CommentItem key={user.id} user={user} comment={comment} />
            ))}
          </ul> */}
          <div className="flex gap-2 items-center mx-3 my-4">
            <Image
              src={"/images/mechanic.jpg"}
              alt={`_img`}
              width={50}
              height={50}
              className="rounded-full cover aspect-square"
            />
            <input
              className="w-full outline-none px-4 py-2 border-2 focus:border-blue-500 rounded-full"
              placeholder="Comment"
            />
            <AppButton outline={false}>Send</AppButton>
          </div>
        </div>
        <div className="w-full my-4  space-y-3">
          <h1 className="font-bold text-lg">Reviews</h1>
        </div>
      </div>
    </div>
  );
}
