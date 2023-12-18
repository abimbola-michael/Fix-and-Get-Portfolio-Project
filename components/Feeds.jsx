import Post from "@/app/post/page";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { readAll, readPosts, readRealtimePosts } from "@/firebase/firebase_api";

export default function Feeds() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const posts = await readAll("posts");
      setPosts(posts);
    }
    getPosts();
  }, []);
  return (
    <div className="w-full">
      <ul className="w-full flex flex-col">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
