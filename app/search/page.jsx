"use client";
import BusinessItem from "@/components/BusinessItem";
import CenterMessage from "@/components/CenterMessage";
import FixGetItem from "@/components/FixGetItem";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import Loader from "@/components/Loader";
import PostItem from "@/components/PostItem";
import SearchItem from "@/components/SearchItem";
import UserItem from "@/components/UserItem";
import { readAll, readUsers } from "@/firebase/firebase_api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Search() {
  const [currentTab, setCurrentTab] = useState("");
  const router = useRouter();
  // const text = useSelector((state) => state.app.searchText);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [fix, setFix] = useState([]);
  const [get, setGet] = useState([]);
  const params = useSearchParams();
  const keyword = params.get("keyword");
  const category = params.get("category");
  const title = params.get("title");
  const type = params.get("type");

  const items =
    currentTab === "Fix" || type === "fix"
      ? fix
      : currentTab === "Get" || type === "get"
      ? get
      : [];
  useEffect(() => {
    async function readList() {
      if (currentTab !== "" || type) {
        setLoading(true);
      }
      if (currentTab === "People") {
        const users = await readAll("users");
        setUsers(
          users.filter((user) =>
            user.name
              ?.toLowerCase()
              .trim()
              ?.includes(keyword.toLowerCase().trim())
          )
        );
      } else if (currentTab === "Posts") {
        const posts = await readAll("posts");
        setPosts(
          posts.filter(
            (post) =>
              post.caption
                ?.toLowerCase()
                .trim()
                ?.includes(keyword.toLowerCase().trim()) ||
              post.title
                ?.toLowerCase()
                .trim()
                ?.includes(keyword.toLowerCase().trim()) ||
              post.category
                ?.toLowerCase()
                .trim()
                ?.includes(keyword.toLowerCase().trim()) ||
              post.subCategory
                ?.toLowerCase()
                .trim()
                ?.includes(keyword.toLowerCase().trim())
          )
        );
      } else if (currentTab === "Businesses") {
        const businesses = await readAll("businesses");

        setBusinesses(
          businesses.filter((business) =>
            business.businessName
              ?.toLowerCase()
              .trim()
              ?.includes(keyword.toLowerCase().trim())
          )
        );
      } else if (currentTab === "Fix" || type === "fix") {
        const fix = await readAll("fix");

        if (category) {
          setFix(
            fix.filter(
              (fix) =>
                fix.subCategory
                  ?.toLowerCase()
                  .trim()
                  ?.includes(category.toLowerCase().trim()) ||
                (title &&
                  fix.title
                    ?.toLowerCase()
                    .trim()
                    ?.includes(title.toLowerCase().trim()))
            )
          );
        } else {
          setFix(
            fix.filter(
              (fix) =>
                fix.title
                  ?.toLowerCase()
                  .trim()
                  ?.includes(keyword.toLowerCase().trim()) ||
                fix.category
                  ?.toLowerCase()
                  .trim()
                  ?.includes(keyword.toLowerCase().trim()) ||
                fix.subCategory
                  ?.toLowerCase()
                  .trim()
                  ?.includes(keyword.toLowerCase().trim())
            )
          );
        }
      } else if (currentTab === "Get" || type === "get") {
        const get = await readAll("get");
        if (category) {
          setGet(
            get.filter(
              (get) =>
                get.subCategory
                  ?.toLowerCase()
                  .trim()
                  ?.includes(category.toLowerCase().trim()) ||
                (title &&
                  get.title
                    ?.toLowerCase()
                    .trim()
                    ?.includes(title.toLowerCase().trim()))
            )
          );
        } else {
          setGet(
            get.filter(
              (get) =>
                get.title
                  ?.toLowerCase()
                  .trim()
                  ?.includes(keyword.toLowerCase().trim()) ||
                get.category
                  ?.toLowerCase()
                  .trim()
                  ?.includes(keyword.toLowerCase().trim()) ||
                get.subCategory
                  ?.toLowerCase()
                  .trim()
                  ?.includes(keyword.toLowerCase().trim())
            )
          );
        }
      }
      setLoading(false);
    }
    readList();
  }, [keyword, currentTab, type, category, title]);
  const searchType = type ? type.toUpperCase() + " " : "";
  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">
        {searchType}Search: {keyword || category}{" "}
        {title !== null && ` - ${title}`}
      </p>

      <div className="overflow-y-auto h-full">
        {!type && (
          <div className="w-full flex justify-evenly mb-3">
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
            <HomeTab
              name="Posts"
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <HomeTab
              name="Businesses"
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
            <HomeTab
              name="People"
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        )}
        <div className="w-full h-full">
          {!loading && currentTab === "" && !type && (
            <CenterMessage message={"Tap on what to search for"} />
          )}
          {!loading && currentTab === "People" && (
            <ul className="flex flex-col overflow-auto gap-2 h-full">
              {users.length > 0 ? (
                users.map((user) => {
                  return (
                    <UserItem
                      key={user.userId}
                      user={user}
                      onClick={() => {
                        router.push(`/profile?userId=${user.userId}`);
                      }}
                    />
                  );
                })
              ) : (
                <CenterMessage message={"No user found"} />
              )}
            </ul>
          )}
          {!loading && currentTab === "Businesses" && (
            <ul className="flex flex-col overflow-auto gap-2 h-full">
              {businesses.length > 0 ? (
                businesses.map((business) => {
                  return (
                    <BusinessItem
                      key={business.userId}
                      business={business}
                      onClick={() => {
                        router.push(`/profile?userId=${business.userId}`);
                      }}
                    />
                  );
                })
              ) : (
                <CenterMessage message={"No business found"} />
              )}
            </ul>
          )}
          {!loading && currentTab === "Posts" && (
            <ul className="flex flex-col overflow-auto gap-2 h-full">
              {posts.length > 0 ? (
                posts.map((post) => {
                  return (
                    <PostItem
                      key={post.id}
                      post={post}
                      isFeed={false}
                      onClick={(i) => {
                        // setDisplayDetails({
                        //   type: "Post",
                        //   url: post.url,
                        //   mediaType: post.mediaType,
                        //   message: post.caption,
                        //   index: i,
                        // });
                      }}
                    />
                  );
                })
              ) : (
                <CenterMessage message={"No post found"} />
              )}
            </ul>
          )}
          {!loading &&
            (currentTab === "Fix" ||
              type === "fix" ||
              currentTab === "Get" ||
              type === "get") && (
              <ul className="flex flex-col overflow-auto gap-2 h-full">
                {items.length > 0 ? (
                  items.map((item) => {
                    return (
                      <FixGetItem key={item.id} item={item} isFeed={true} />
                    );
                  })
                ) : (
                  <CenterMessage message={"No item found"} />
                )}
              </ul>
            )}
        </div>
      </div>
      {loading && <Loader />}
    </div>
  );
}
