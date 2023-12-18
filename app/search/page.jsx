"use client";
import BusinessItem from "@/components/BusinessItem";
import CenterMessage from "@/components/CenterMessage";
import FixGetItem from "@/components/FixGetItem";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import PostItem from "@/components/PostItem";
import SearchItem from "@/components/SearchItem";
import UserItem from "@/components/UserItem";
import { readAll, readUsers } from "@/firebase/firebase_api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Search() {
  const [currentTab, setCurrentTab] = useState("People");
  const router = useRouter();
  // const text = useSelector((state) => state.app.searchText);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [fix, setFix] = useState([]);
  const [get, setGet] = useState([]);
  const params = useSearchParams();
  const keyword = params.get("keyword");
  const items = currentTab === "Fix" ? fix : get;
  useEffect(() => {
    async function readAllUsers() {
      const users = await readAll("users");
      const posts = await readAll("posts");
      const businesses = await readAll("businesses");
      const fix = await readAll("fix");
      const get = await readAll("get");
      console.log(
        `users = ${users}, posts = ${posts}, businesses = ${businesses}, fix = ${fix}, get = ${get}`
      );

      setUsers(
        users.filter((user) =>
          user.name
            ?.toLowerCase()
            .trim()
            ?.includes(keyword.toLowerCase().trim())
        )
      );
      setBusinesses(
        businesses.filter((business) =>
          business.businessName
            ?.toLowerCase()
            .trim()
            ?.includes(keyword.toLowerCase().trim())
        )
      );
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
    }
    readAllUsers();
  }, [keyword]);

  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Search: {keyword}</p>

      <div className="overflow-y-auto h-full">
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
        <div className="w-full h-full">
          {currentTab === "People" && (
            <ul className="flex flex-col overflow-auto gap-2">
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
          {currentTab === "Businesses" && (
            <ul className="flex flex-col overflow-auto gap-2">
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
          {currentTab === "Posts" && (
            <ul className="flex flex-col overflow-auto gap-2">
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
          {(currentTab === "Fix" || currentTab === "Get") && (
            <ul className="flex flex-col overflow-auto gap-2">
              {items.length > 0 ? (
                items.map((items) => {
                  return <FixGetItem key={item.id} item={item} isFeed={true} />;
                })
              ) : (
                <CenterMessage message={"No item found"} />
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
