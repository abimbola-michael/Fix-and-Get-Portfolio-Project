"use client";
import AppButton from "@/components/AppButton";
import FixGetItem from "@/components/FixGetItem";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import ProfileTabBar from "@/components/ProfileTabBar";
import { fixCategories, getCategories } from "@/utils/categories";
import App from "next/app";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const [currentTab, setCurrentTab] = useState("Fix");
  const [currentCategory, setCurrentCategory] = useState("Electronics");
  const router = useRouter();
  const categories = currentTab === "Fix" ? fixCategories : getCategories;
  const items = Array.from({ length: 5 }, (v, i) => {
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
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Profile</p>
      <div className="overflow-y-auto">
        <div className="flex flex-col gap-3 items-center max-w-4xl">
          <div
            className="w-full h-[150px] relative"
            style={{ backgroundImage: "url(images/laptop.jpg)" }}
          >
            <Image
              className="absolute left-[calc(50%-50px)] bottom-[-50px] rounded-full shrink-0 aspect-square"
              src="/images/photo.jpg"
              alt="profile picture"
              width={100}
              height={100}
            />
            <div className="absolute bottom-[-50px] w-[calc(50%-50px)] flex justify-center">
              <AppButton
                outline={true}
                onClick={() => {
                  router.push("/editprofile");
                }}
              >
                Edit Profile
              </AppButton>
            </div>
            <div className="absolute bottom-[-50px] right-0 w-[calc(50%-50px)] flex justify-center">
              <AppButton
                onClick={() => {
                  router.push("/addpost");
                }}
              >
                Add Post
              </AppButton>
            </div>
          </div>

          <div className="mt-[40px] mx-2 flex flex-col items-center">
            <h1 className="font-bold text-2xl">Fixit Enterprise</h1>
            <h2 className="font-semibold">Abimbola Michael</h2>
            <p className="text-ellipsis overflow-hidden">
              Fixit Enterprise is a company that assist in fixing of cars and
              other forms of electronics like Refridgerators, Fans, Generators
              etc
            </p>
          </div>
        </div>
        <div className="w-full flex justify-evenly">
          <HomeTab
            name="Fix"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <HomeTab
            name="Get"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
        <ul className="my-3 mx-2 flex gap-2 overflow-x-auto">
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
        {currentCategory && (
          <ul className="flex flex-col gap-2 overflow-x-auto px-2 text-black">
            {categories[
              categories.findIndex(
                (category) => category.name === currentCategory
              )
            ]?.subcategories?.map((category) => (
              <li key={category.name} className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{category.name}</h1>
                <ul className="flex flex-col gap-1 text-sm text-gray-700">
                  {category.items.map((item) => (
                    <li key={item} className="flex flex-col gap-2 my-2">
                      <h1 className="text-lg font-semibold">{item}</h1>
                      <ul className="flex gap-3 overflow-x-auto">
                        {items.map((item) => (
                          <FixGetItem key={item.id} item={item} />
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
