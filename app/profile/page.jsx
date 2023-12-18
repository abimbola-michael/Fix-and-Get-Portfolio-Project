"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import FixGetItem from "@/components/FixGetItem";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import Loader from "@/components/Loader";
import PopupMenuButton from "@/components/PopupMenuButton";
import PostItem from "@/components/PostItem";
import ProfileDetail from "@/components/ProfileDetail";
import ProfileStats from "@/components/ProfileStats";
import {
  addItems,
  addPost,
  getBusiness,
  getUId,
  getUser,
  readUser,
  readUserStats,
  toggleFollowUser,
} from "@/firebase/firebase_api";
import { changeChatUserId } from "@/slices/appSlice";
import { fixCategories, getCategories } from "@/utils/categories";
import {
  getCategoriesAndItems,
  getLocation,
  getUserCategories,
  getUserCategoriesItems,
  haversineDistance,
  openGoogleMap,
  openMap,
  stringsToList,
} from "@/utils/helpers";
import App from "next/app";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import { FaTelegramPlane } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import VideoImageDisplay from "@/components/VideoImageDisplay";
import { BsNutFill } from "react-icons/bs";
import ProgressView from "@/components/ProgressView";

export default function Profile() {
  // const [type, setType] = useState("fix");
  const [following, setFollowing] = useState(null);
  const [currentTab, setCurrentTab] = useState("Details");
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [title, setTitle] = useState("");
  const params = useSearchParams();
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayDetails, setDisplayDetails] = useState(null);
  const [progress, setProgress] = useState(null);
  const userId = params.get("userId");
  let post = params.get("post");
  let items = params.get("items");

  if (post) {
    post = JSON.parse(post);
  }
  if (items) {
    items = JSON.parse(items);
  }

  const myId = getUId();

  const router = useRouter();

  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (post) {
      setProgress(0);
      console.log(`post: ${post}`);
      addPost(
        post,
        (progress) => {
          setProgress(progress);
        },
        (url) => {
          setProgress(null);
          router.push(`/profile?userId=${userId}`);
        }
      );
      post = null;
    }

    if (items) {
      setProgress(0);
      console.log(`items: ${items}`);
      addItems(
        items,
        (progress) => {
          setProgress(progress);
        },
        (url) => {
          setProgress(null);
          router.push(`/profile?userId=${userId}`);
        }
      );
      items = null;
    }
  }, []);
  useEffect(() => {
    getLocation((location) => {
      setLocation(location);
    });
  }, []);
  useEffect(() => {
    async function getUserData() {
      const user = await readUser(userId);
      const business = await getBusiness(userId);
      if (user) {
        const { posts, get, fix, followers, following } = await readUserStats(
          userId
        );
        console.log(
          `posts: ${posts}, get: ${get}, fix: ${fix}, followers: ${followers}, following: ${following}`
        );
        user.posts = posts ?? [];
        user.get = get ?? [];
        user.fix = fix ?? [];
        user.followers = followers ?? [];
        user.following = following ?? [];
        if (userId !== myId) {
          setFollowing(user.followers.map((value) => value.id).includes(myId));
        }
      }
      setUser(user);
      setBusiness(business);
      setLoading(false);
    }
    getUserData();
  }, [userId, myId]);

  const callOptions = [
    { name: "Phone Call", logo: <IoCall />, link: "tel:" },
    { name: "WhatsApp Voice Call", logo: <IoLogoWhatsapp />, link: "tel:" },
    { name: "WhatsApp Video Call", logo: <IoLogoWhatsapp />, link: "tel:" },
    { name: "Telegram Call", logo: <FaTelegramPlane />, link: "tel:" },
  ];
  const categories = getUserCategories(
    currentTab === "Fix" ? user?.fix : user?.get
  );
  const categoryItems = getUserCategoriesItems(
    currentTab === "Fix" ? user?.fix : user?.get,
    currentCategory,
    currentSubCategory,
    title
  );

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
  function openMap() {
    if (!business?.businessLocation) return;
    const businessLocation = stringsToList(business?.businessLocation);
    openGoogleMap(businessLocation[0], businessLocation[1]);
  }
  function getDistance() {
    if (!location || !business?.businessLocation) return "";
    const businessLocation = stringsToList(business?.businessLocation);
    const distance = haversineDistance(
      location.latitude,
      location.longitude,
      businessLocation[0],
      businessLocation[1]
    );
    return distance >= 1
      ? `${distance.toFixed(2)} km`
      : `${(distance * 1000).toFixed(2)} m`;
  }
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col">
      <Header />
      {progress !== null && progress > 0 && (
        <ProgressView progress={progress} />
      )}
      <p className="font-bold text-lg px-4 my-2">Profile</p>
      <div className="overflow-y-auto">
        <div className="flex flex-col gap-3 items-center max-w-4xl">
          <div className="w-full flex flex-col items-center px-3">
            <Image
              className="rounded-full shrink-0 aspect-square my-2 bg-gray-100"
              src={user?.profilePhoto || "/images/profile_placeholder.png"}
              alt="profile picture"
              width={150}
              height={150}
            />
            <div className="px-3 flex flex-col items-center text-center w-full">
              <h2 className="font-semibold">{user?.name ?? ""}</h2>
              {(business?.businessName || business?.businessLogo) && (
                <div className="flex items-center gap-2">
                  {business?.businessLogo && (
                    <Image
                      src={business?.businessLogo}
                      alt="Business Logo"
                      width={40}
                      height={40}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                    />
                  )}
                  {business?.businessName && (
                    <h1 className="font-bold text-2xl">
                      {business?.businessName}
                    </h1>
                  )}
                </div>
              )}

              {business?.businessDescription && (
                <p className="text-md">{business?.businessDescription}</p>
              )}

              <div className="flex items-center gap-3">
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
            {userId === myId ? (
              <div className="w-full flex justify-evenly items-center gap-3 p-3">
                <AppButton outline={true} link={"/editprofile"}>
                  Edit Profile
                </AppButton>
                <AppButton outline={true} link={"/addpost"}>
                  Add Post
                </AppButton>
                <AppButton outline={true} link={"/additem"}>
                  Add Item
                </AppButton>
              </div>
            ) : (
              <div className="w-full flex justify-evenly items-center gap-3 p-3">
                <AppButton
                  outline={!following}
                  onClick={() => {
                    toggleFollowUser(userId, following, setFollowing, setUser);
                  }}
                >
                  {following ? "Following" : "Follow"}
                </AppButton>
                <AppButton
                  outline={true}
                  onClick={() => {
                    dispatch(changeChatUserId(userId));
                    router.push("/message");
                  }}
                >
                  Message
                </AppButton>
                <PopupMenuButton
                  items={callOptions.map((option) => {
                    return {
                      child: (
                        <div className="flex gap-2 items-center w-full">
                          <p className="text-lg">{option.logo}</p>
                          <p className="text-sm ">{option.name}</p>
                        </div>
                      ),
                      action: (index) => {},
                    };
                  })}
                  useHover={false}
                >
                  <AppButton outline={true} onClick={() => {}}>
                    Call
                  </AppButton>
                </PopupMenuButton>
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-evenly mb-3">
          <HomeTab
            name="Details"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
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
          {(currentTab === "Fix" || currentTab === "Get") && (
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
            </ul>
          )}

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
            </ul>
          )}
          <div className="w-full min-h-[calc(100vh-150px)]">
            {business && currentTab === "Details" && (
              <div className="w-full flex flex-col">
                {business.businessLocationPhotos && (
                  <ProfileDetail name="Shop Location Photos">
                    <div className="w-full h-[250px]">
                      <Carousel
                        urls={stringsToList(business.businessLocationPhotos)}
                        autoSlide={false}
                        callback={(index) => {}}
                      />
                    </div>
                  </ProfileDetail>
                )}
                {/* <AppButton outline={true}>Get Directions</AppButton> */}

                {business?.businessLocation && (
                  <ProfileDetail
                    name={"Business Location From you"}
                    value={`${getDistance()} from you`}
                    rightChild={
                      <AppButton outline={true} onClick={openMap}>
                        Get Directions
                      </AppButton>
                    }
                  />
                )}
                {/* <ProfileDetail
                  name={"Business Name"}
                  value={business.businessName}
                /> */}
                <ProfileDetail
                  name={"Business Email"}
                  value={business.businessEmail}
                />
                <ProfileDetail
                  name={"Business Phone"}
                  value={business.businessPhone}
                />
                <ProfileDetail
                  name={"Business Call Phone"}
                  value={business.businessCallPhone}
                />
                <ProfileDetail
                  name={"Business Address"}
                  value={business.businessAddress}
                />
                {/* <ProfileDetail
                  name={"Business Description"}
                  value={business.businessDescription}
                /> */}
                <ProfileDetail
                  name={"Business Category"}
                  value={business.businessCategory}
                />
                <ProfileDetail
                  name={"Business Role"}
                  value={business.businessRole}
                />
                <ProfileDetail
                  name={"Business Website"}
                  value={business.businessWebsite}
                />
                <ProfileDetail
                  name={"Business Certification"}
                  value={business.businessName}
                />
              </div>
            )}
            {currentTab === "Posts" && (
              <ul className="flex gap-3 flex-wrap">
                {/* {items.map((item) => (
                <PostItem key={item.id} item={item} />
              ))} */}
                {user?.posts.map((post, index) => (
                  <PostItem
                    key={post.id}
                    post={post}
                    isFeed={false}
                    onClick={(i) => {
                      setDisplayDetails({
                        type: "Post",
                        url: post.url,
                        mediaType: post.mediaType,
                        message: post.caption,
                        index: i,
                      });
                    }}
                  />
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
            {(currentTab === "Fix" || currentTab === "Get") && (
              <ul className="flex gap-3 flex-wrap">
                {getCategoriesAndItems(
                  categoryItems,
                  "category",
                  currentCategory
                ).map((result) => (
                  <li key={result.name} className="flex flex-col gap-2 w-full">
                    <h1 className="text-xl font-bold">{result.name}</h1>
                    <ul className="flex gap-3 flex-wrap">
                      {getCategoriesAndItems(
                        result.items,
                        "subCategory",
                        currentSubCategory
                      ).map((result) => (
                        <li
                          key={result.name}
                          className="flex flex-col gap-2 w-full"
                        >
                          <h1 className="text-lg font-bold">{result.name}</h1>
                          <ul className="flex gap-3 flex-wrap">
                            {getCategoriesAndItems(
                              result.items,
                              "title",
                              title
                            ).map((result) => (
                              <li
                                key={result.name}
                                className="flex flex-col gap-2 w-full"
                              >
                                <h1 className="text-md font-semibold">
                                  {result.name}
                                </h1>
                                <ul className="flex gap-3 flex-wrap">
                                  {result.items.map((item) => (
                                    <FixGetItem
                                      key={item.id}
                                      item={item}
                                      isFeed={true}
                                    />
                                  ))}
                                </ul>
                              </li>
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
      {loading && <Loader />}
      {displayDetails && (
        <VideoImageDisplay
          {...displayDetails}
          onClose={() => setDisplayDetails(null)}
        />
      )}
    </div>
  );
}
