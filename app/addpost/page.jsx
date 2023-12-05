"use client";
import AppButton from "@/components/AppButton";
import Header from "@/components/Header";
import PostInputItem from "@/components/PostInputItem";
import PostItemsList from "@/components/PostItemsList";
import { addPost } from "@/firebase/firebase_api";
import { fixCategories, getCategories } from "@/utils/categories";
import { convertToCommaString } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const [caption, setCaption] = useState("");
  // const [name, setName] = useState("");
  // const [desc, setDesc] = useState("");
  // const [price, setPrice] = useState("");
  // const [discPrice, setDiscPrice] = useState("");
  // const [negotiable, setNegotiable] = useState("");
  const [items, setItems] = useState([
    {
      name: "",
      desc: "",
      price: "",
      discPrice: "",
      negotiable: "",
      files: "",
      mediaTypes: "",
    },
  ]);
  const name = convertToCommaString(items, (item) => item.name);
  const desc = convertToCommaString(items, (item) => item.desc);
  const price = convertToCommaString(items, (item) => item.price);
  const discPrice = convertToCommaString(items, (item) => item.discPrice);
  const files = convertToCommaString(items, (item) => item.files);
  const mediaTypes = convertToCommaString(items, (item) => item.mediaTypes);
  const negotiable = convertToCommaString(items, (item) => item.negotiable);
  const router = useRouter();

  const categories = type === "fix" ? fixCategories : getCategories;
  const post = {
    type,
    category: currentSubCategory,
    url: "",
    mediaType: "",
    name,
    desc,
    price,
    caption,
    discPrice,
    negotiable,
  };
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
        <PostItemsList items={items} setItems={setItems} />
        <h1 className="font-bold text-lg py-2">Caption</h1>
        <textarea
          rows={4}
          className="w-full rounded-lg border-2 outline-none focus:border-blue-500 px-3 py-2 wy-2 mb-8 mr-2"
          type="text"
          placeholder="Write something..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <AppButton
          onClick={() => {
            addPost(post, files, mediaTypes);
            router.back();
          }}
        >
          Post
        </AppButton>
      </div>
    </div>
  );
}
