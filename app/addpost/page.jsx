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

const images = Array.from({ length: 10 }, (v, i) => {
  return { url: "/images/laptop.jpg", type: "image", id: i.toString() };
});
export default function AddPost() {
  const [type, setType] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [caption, setCaption] = useState("");
  const [items, setItems] = useState([]);
  const router = useRouter();

  // const name = convertToCommaString(items, (item) => item.name);
  const categories = type === "fix" ? fixCategories : getCategories;
  const post = {
    type,
    category: currentSubCategory,
    subCategory: currentSubCategory,
    title: "",
    caption,
    items,
  };
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Read the content of the file and set it as the source for image or video
        // if (selectedFile.type.startsWith("image/")) {
        //   imageRef.current.src = reader.result;
        // } else if (selectedFile.type.startsWith("video/")) {
        //   videoRef.current.src = reader.result;
        // }
        const mediaType = selectedFile.type.startsWith("image/")
          ? "image"
          : "video";
        setItems((items) => [
          ...items,
          {
            name: "",
            desc: "",
            price: "",
            discPrice: "",
            negotiable: false,
            files: reader.result,
            mediaTypes: mediaType,
          },
        ]);
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(selectedFile);
    }
  };
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">New Post</p>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden mx-4">
        <h1 className="font-bold text-lg py-4">Post Type</h1>
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
        <h1 className="font-bold text-lg py-4">Category</h1>
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
        <h1 className="font-bold text-lg py-4">Photos/Videos</h1>
        <div className="w-full flex flex-col items-start gap-4">
          <PostItemsList items={items} setItems={setItems} />
          <AppButton outline={true} onClick={handleButtonClick}>
            Add
          </AppButton>
          <input
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <h1 className="font-bold text-lg py-4">Caption</h1>
        <textarea
          rows={4}
          className="w-full rounded-lg border-2 outline-none focus:border-blue-500 px-3 py-2 wy-2 mb-[200px] mr-2"
          type="text"
          placeholder="Write something..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <div className="absolute bottom-4 right-4">
        <AppButton
          onClick={() => {
            addPost(post);
            router.back();
          }}
        >
          Post
        </AppButton>
      </div>
    </div>
  );
}
