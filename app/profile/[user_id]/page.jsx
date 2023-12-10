"use client";
import AppButton from "@/components/AppButton";
import FixGetItem from "@/components/FixGetItem";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import PostItem from "@/components/PostItem";
import ProfileStats from "@/components/ProfileStats";
import { getUser, readUserStats } from "@/firebase/firebase_api";
import { fixCategories, getCategories } from "@/utils/categories";
import { getUserCategories } from "@/utils/helpers";
import App from "next/app";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Profile() {
  // const [type, setType] = useState("fix");
  const [currentTab, setCurrentTab] = useState("Fix");
  const [currentCategory, setCurrentCategory] = useState("Electronics");
  const [currentSubCategory, setCurrentSubCategory] = useState("Smartphones");
  const [title, setTitle] = useState("");
  const params = useParams();
  const [user, setUser] = useState(null);
  const user_id = params.user_id;

  const router = useRouter();
  useEffect(() => {
    async function getUserData() {
      const user = await readUserStats(user_id);
      setUser(user);
    }
    getUserData();
  }, [user_id]);
  // const categories =
  //   currentTab === "Fix"
  //     ? fixCategories
  //     : currentTab === "Get"
  //     ? getCategories
  //     : [];
  const categories = getUserCategories(
    currentTab === "Fix" ? user?.fix : user?.get
  );
  const items = Array.from({ length: 10 }, (v, i) => {
    return {
      id: i.toString(),
      name: "EliteBook G50",
      desc: "Core i5, 8GB RAM, 1TB SSD, 15.6 inches",
      price: "200",
      discPrice: "150",
      negotiable: false,
      url: "/images/laptop.jpg",
      mediaType: "image",
      available: true,
    };
  });
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
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Profile</p>
      <div className="overflow-y-auto">
        <div className="flex flex-col gap-3 items-center max-w-4xl">
          <div
            className="w-full h-[150px] relative"
            style={{
              backgroundImage: `url(${
                user?.coverPhoto || "/images/laptop.jpg"
              })`,
            }}
          >
            <Image
              className="absolute left-[20px] bottom-[-50px] rounded-full shrink-0 aspect-square"
              src={user?.profilePhoto || "/images/photo.jpg"}
              alt="profile picture"
              width={100}
              height={100}
            />
            <div className="w-full flex justify-end gap-3 absolute bottom-[-50px] px-3">
              <AppButton outline={true} link={"/editprofile"}>
                Edit Profile
              </AppButton>
              <AppButton link={"/addpost"}>Add Post</AppButton>
              <AppButton link={"/additem"}>Add Item</AppButton>
            </div>
          </div>

          <div className="mt-[40px] px-3 flex flex-col w-full">
            <h2 className="font-semibold">{user?.name}</h2>
            <h1 className="font-bold text-2xl">Fixit Enterprise</h1>
            <p className="">
              Fixit Enterprise is a company that assist in fixing of cars and
              other forms of electronics like Refridgerators, Fans, Generators
              etc
            </p>
            <div className="flex items-center gap-3 w-full">
              {user?.fix?.length > 0 && (
                <ProfileStats
                  title="Fix Items"
                  count={user?.fix?.length ?? 0}
                />
              )}
              {user?.get?.length > 0 && (
                <ProfileStats
                  title="Get Items"
                  count={user?.get?.length ?? 0}
                />
              )}
              <ProfileStats title="Posts" count={user?.posts?.length ?? 0} />
              <ProfileStats
                title="Followers"
                count={user?.followers?.length ?? 0}
              />
              <ProfileStats
                title="Following"
                count={user?.following?.length ?? 0}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-evenly mb-3">
          {user?.fix?.length > 0 && (
            <HomeTab
              name="Fix"
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          )}
          {user?.get?.length > 0 && (
            <HomeTab
              name="Get"
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          )}
          <HomeTab
            name="Posts"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>

        {/* <ul className="my-2 mx-2 flex gap-2 overflow-x-auto">
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
        </ul> */}

        <div className="w-full flex flex-col gap-2 px-4">
          <ul className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <li key={category.name}>
                <AppButton
                  outline={currentCategory !== category.name}
                  onClick={() => {
                    setCurrentCategory(category.name);
                    setCurrentSubCategory("");
                    setTitle("");
                  }}
                >
                  {category.name}
                </AppButton>
              </li>
            ))}
          </ul>

          {currentCategory && (
            <ul className="flex gap-2 overflow-x-auto">
              {getSubCategories()?.map((category) => (
                <li key={category.name}>
                  <AppButton
                    outline={currentSubCategory !== category.name}
                    onClick={() => {
                      setCurrentSubCategory(category.name);
                      setTitle("");
                    }}
                  >
                    {category.name}
                  </AppButton>
                </li>
              ))}
            </ul>
          )}
          {currentSubCategory && (
            <ul className="flex gap-2 overflow-x-auto">
              {getSubCategoryItems()?.map((name) => (
                <li key={name}>
                  <AppButton
                    outline={title !== name}
                    onClick={() => setTitle(name)}
                  >
                    {name}
                  </AppButton>
                </li>
              ))}
            </ul>
          )}
          <div className="w-full min-h-[calc(100vh-150px)]">
            {currentTab === "Posts" && (
              <ul className="flex gap-3 flex-wrap">
                {/* {items.map((item) => (
                <PostItem key={item.id} item={item} />
              ))} */}
                {user?.posts.map((post) => (
                  <PostItem key={post.id} post={post} isFeed={false} />
                ))}
              </ul>
            )}
            {currentTab === "Fix" && (
              <ul className="flex gap-3 flex-wrap">
                {user?.fix.map((item) => (
                  <FixGetItem key={item.id} item={item} />
                ))}
              </ul>
            )}
            {currentTab === "Get" && (
              <ul className="flex gap-3 flex-wrap">
                {user?.get.map((item) => (
                  <FixGetItem key={item.id} item={item} />
                ))}
              </ul>
            )}
            {/* {(currentTab === "Fix" || currentTab === "Get") && (
            <ul className="flex gap-3 flex-wrap">
              {items.map((item) => (
                <FixGetItem key={item.id} item={item} />
              ))}
            </ul>
          )} */}
          </div>
        </div>
        {/* {currentCategory && (
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
                      <div className="w-full flex justify-between items-center">
                        <h1 className="text-lg font-semibold">{item}</h1>
                        <button
                          className="shrink-0 text-blue-500 text-md mr-3"
                          onClick={() => {}}
                        >
                          View All
                        </button>
                      </div>
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
        )} */}
      </div>
    </div>
  );
}
