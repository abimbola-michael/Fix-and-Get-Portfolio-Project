"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import CommentItem from "@/components/CommentItem";
import Header from "@/components/Header";
import { fixCategories, getCategories } from "@/utils/categories";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import CartItem from "@/components/CartItem";
import RatingBar from "@/components/RatingBar";

const images = Array.from({ length: 10 }, (v, i) => {
  return { url: "/images/laptop.jpg", type: "image", id: i.toString() };
});
export default function Post() {
  const [type, setType] = useState("fix");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");

  const post = {
    id: "0",
    type: type,
    category: "Electronics",
  };
  const urls = [
    "/images/generator.jpg",
    "/images/laptop.jpg",
    "/images/mechanic.jpg",
    "/images/phone.jpg",
    "/images/tailor.jpg",
  ];
  const categories = type === "fix" ? fixCategories : getCategories;
  const item = {
    id: "4",
    url: "/images/laptop.jpg",
    type: "image",
    category: "Laptop",
    name: "EliteBook G50",
    desc: "Core i5, 8GB RAM, 1TB SSD, 15.6 inches",
    price: 200,
    currency: "USD",
    inStock: true,
  };
  const items = Array.from({ length: 10 }, (v, i) => {
    return {
      id: i.toString(),
      url: "/images/laptop.jpg",
      type: "image",
      category: "Laptop",
      name: "EliteBook G50",
      desc: "Core i5, 8GB RAM, 1TB SSD, 15.6 inches",
      price: 200,
      currency: "USD",
      inStock: true,
    };
  });
  const users = Array.from({ length: 10 }, (v, i) => {
    return {
      id: i.toString(),
      name: "Michael",
      email: "michael",
      message: "Please is there laptop screen",
    };
  });

  const comment = { text: "How much last for this item" };
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Post</p>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden mx-4">
        <div className="flex flex-col w-full h-[90%] gap-3">
          <Carousel
            urls={urls}
            autoSlide={true}
            slideDuration={10000}
            indicators="images"
            callback={setCurrentIndex}
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
          <ul className="overflow-y-auto">
            {users.map((user) => (
              <CommentItem key={user.id} user={user} comment={comment} />
            ))}
          </ul>
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
