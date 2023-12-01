"use client";
import AppButton from "@/components/AppButton";
import Header from "@/components/Header";
import { fixCategories, getCategories } from "@/utils/categories";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const images = Array.from({ length: 10 }, (v, i) => {
  return { url: "/images/laptop.jpg", type: "image", id: i.toString() };
});
export default function AddPost() {
  const [type, setType] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");

  const post = {
    id: "0",
    type: type,
    category: "Electronics",
  };
  const categories = type === "fix" ? fixCategories : getCategories;

  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">New Post</p>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden mx-4">
        <h1 className="font-bold text-lg py-2">Post Type</h1>
        <div className="flex gap-3">
          <AppButton
            outline={post.type !== "fix"}
            onClick={() => setType("fix")}
          >
            Fix
          </AppButton>
          <AppButton
            outline={post.type !== "get"}
            onClick={() => setType("get")}
          >
            Get
          </AppButton>
        </div>
        <h1 className="font-bold text-lg py-2">Category</h1>
        <div className="">
          <ul className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.name}>
                <AppButton
                  outline={currentCategory !== category.name}
                  onClick={() => setCurrentCategory(category.name)}
                >
                  {category.name}
                </AppButton>
              </li>
            ))}
            <li>
              <AppButton
                outline={currentCategory !== "Others"}
                onClick={() => setCurrentCategory("Others")}
              >
                Others
              </AppButton>
            </li>
          </ul>
          {currentCategory === "Others" && (
            <AppButton
              outline={false}
              //   onClick={() => setCurrentSubCategory("")}
            >
              <input
                className="text-white placeholder-gray-100 outline-none bg-transparent inline-block min-w-0"
                placeholder="Enter category name"
              />
            </AppButton>
          )}
          {currentCategory && (
            <ul className="flex gap-2 overflow-x-auto">
              {categories[
                categories.findIndex(
                  (category) => category.name === currentCategory
                )
              ]?.subcategories?.map((category) => (
                <li key={category.name}>
                  <AppButton
                    outline={currentSubCategory !== category.name}
                    onClick={() => setCurrentSubCategory(category.name)}
                  >
                    {category.name}
                  </AppButton>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h1 className="font-bold text-lg py-2">Photos/Videos</h1>
        <ul className="flex gap-3 mb-2 overflow-y-auto">
          {images.map((image) => (
            <li key={image.id} className="flex flex-col w-64">
              <div className="w-64 h-56 relative">
                <Image
                  src={image.url}
                  alt={`${image.id}_img`}
                  width={250}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />

                <div className="flex gap-3 absolute top-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-lg font-bold">
                  <MdAddCircleOutline />
                  <MdOutlineEdit />
                  <FiTrash />
                </div>
              </div>
              <div className="flex row justify-between items-start">
                <div className="grow flex flex-col">
                  <input
                    className="font-bold text-md outline-none border-b-2 focus:border-blue-500 px-2 py-1"
                    placeholder="Name"
                  />
                  <input
                    className="text-sm outline-none border-b-2 focus:border-blue-500 px-2 py-1"
                    placeholder="Description"
                  />
                </div>
                <input
                  className="shrink-0 text-blue-500 font-bold text-lg outline-none border-b-2 focus:border-blue-500 px-2 py-1"
                  placeholder="Price"
                />
              </div>
            </li>
          ))}
        </ul>
        <AppButton outline={true}>Add</AppButton>
        <h1 className="font-bold text-lg py-2">Caption</h1>
        <textarea
          rows={4}
          className="w-full rounded-lg border-2 outline-none focus:border-blue-500 px-3 py-2 wy-2 mb-8 mr-2"
          type="text"
          placeholder="Write something..."
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <AppButton>Post</AppButton>
      </div>
    </div>
  );
}
