"use client";
import AppButton from "@/components/AppButton";
import AppInput from "@/components/AppInput";
import Header from "@/components/Header";
import { addItems, addPost } from "@/firebase/firebase_api";
import { fixCategories, getCategories } from "@/utils/categories";
import { convertFileToPath, convertToCommaString } from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import FixGetItemsList from "@/components/FixGetItemsList";
import { useSelector } from "react-redux";

export default function AddItem() {
  const [type, setType] = useState("fix");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [items, setItems] = useState([]);
  const userId = useSelector((state) => state.app.currentUserId);
  const router = useRouter();

  // const name = convertToCommaString(items, (item) => item.name);
  const categories = type === "fix" ? fixCategories : getCategories;

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    // const selectedFile = event.target.files[0];
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.isEmpty) return;
    const selectedPaths = selectedFiles.map((file) => convertFileToPath(file));
    setItems((items) => [
      ...items,
      {
        type,
        category: currentCategory,
        subCategory: currentSubCategory,
        title,
        name: "",
        desc: "",
        price: "",
        discPrice: "",
        negotiable: false,
        //files: selectedFiles,
        paths: selectedPaths,
        currency,
      },
    ]);
  };

  function getSubCategories() {
    return categories[
      categories.findIndex((category) => category.name === currentCategory)
    ]?.subcategories;
  }
  function getSubCategoryItems() {
    return getSubCategories()?.[
      getSubCategories().findIndex(
        (category) => category.name === currentSubCategory
      )
    ]?.items;
  }
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">New Fix or Get Item</p>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden mx-4">
        <h1 className="font-bold text-lg py-4">Type</h1>
        <div className="flex gap-3">
          <AppButton outline={type !== "fix"} onClick={() => setType("fix")}>
            Fix
          </AppButton>
          <AppButton outline={type !== "get"} onClick={() => setType("get")}>
            Get
          </AppButton>
        </div>
        <h1 className="font-bold text-lg py-4">Category</h1>
        <div className="w-full flex flex-col gap-2">
          <ul className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.name}>
                <AppButton
                  outline={currentCategory !== category.name}
                  onClick={() => {
                    setCurrentCategory((cat) =>
                      cat != "" ? "" : category.name
                    );
                    setCurrentSubCategory("");
                    setTitle("");
                  }}
                >
                  {category.name}
                </AppButton>
              </li>
            ))}
            <li>
              <AppInput
                placeholder={"Others"}
                outline={true}
                value={currentCategory}
                onChange={setCurrentCategory}
              />
            </li>
          </ul>

          {currentCategory && (
            <ul className="flex gap-2 overflow-x-auto">
              {getSubCategories()?.map((category) => (
                <li key={category.name}>
                  <AppButton
                    outline={currentSubCategory !== category.name}
                    onClick={() => {
                      setCurrentSubCategory((cat) =>
                        cat != "" ? "" : category.name
                      );
                      setTitle("");
                    }}
                  >
                    {category.name}
                  </AppButton>
                </li>
              ))}
              <li>
                <AppInput
                  placeholder={"Others"}
                  outline={true}
                  value={currentSubCategory}
                  onChange={setCurrentSubCategory}
                />
              </li>
            </ul>
          )}
          {currentSubCategory && (
            <ul className="flex gap-2 overflow-x-auto">
              {getSubCategoryItems()?.map((name) => (
                <li key={name}>
                  <AppButton
                    outline={title !== name}
                    onClick={() => setTitle((tit) => (tit != "" ? "" : name))}
                  >
                    {name}
                  </AppButton>
                </li>
              ))}
              <li>
                <AppInput
                  placeholder={"Others"}
                  outline={true}
                  value={title}
                  onChange={setTitle}
                />
              </li>
            </ul>
          )}
        </div>
        <h1 className="font-bold text-lg py-4">Currency</h1>
        <select
          className={`focus:outline-none text-md px-4 py-2 bg-transparent rounded-full text-blue-500 font-bold border-2 border-blue-500 whitespace-nowrap`}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="NGN">NGN</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        <h1 className="font-bold text-lg py-4">Items Photos/Videos</h1>
        <div className="w-full flex flex-col items-start gap-4 mb-[200px]">
          <FixGetItemsList items={items} setItems={setItems} />
          <AppButton outline={true} onClick={handleButtonClick}>
            Add
          </AppButton>
          <input
            type="file"
            accept="image/*,video/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple={true}
          />
        </div>
        {/* <h1 className="font-bold text-lg py-4">Caption</h1>
        <textarea
          rows={4}
          className="w-full rounded-lg border-2 outline-none focus:border-blue-500 px-3 py-2 wy-2 mb-[200px] mr-2"
          type="text"
          placeholder="Write something..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        /> */}
      </div>
      <div className="absolute bottom-4 right-4">
        <AppButton
          onClick={() => {
            router.push(
              `/profile?userId=${userId}&items=${JSON.stringify(items)}`
            );
            // addItems(items);
            // router.back();
          }}
        >
          Post
        </AppButton>
      </div>
    </div>
  );
}
