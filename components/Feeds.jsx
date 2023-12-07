import Post from "@/app/post/page";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import FeedPostItem from "./FeedPostItem";
import { readPosts, readRealtimePosts } from "@/firebase/firebase_api";

export default function Feeds() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    //const unSub = readRealtimePosts(setPosts);
    async function getPosts() {
      const result = await readPosts();
      console.log(`results: ${result}`);
      setPosts(result);
    }
    getPosts();
    return () => {
      //   if (typeof unSub === "function") {
      //     unSub();
      //   }
    };
  }, []);
  return (
    <ul className="w-full">
      {posts.map((post) => (
        <FeedPostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
