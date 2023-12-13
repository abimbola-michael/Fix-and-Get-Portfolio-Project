"use client";
import CategoriesBar from "@/components/CategoriesBar";
import Feeds from "@/components/Feeds";
import Header from "@/components/Header";
import MainPageDisplay from "@/components/MainPageDisplay";
import { auth, db } from "@/firebase";
import { getUId } from "@/firebase/firebase_api";
import { changeCurrentUser, changeCurrentUserId } from "@/slices/appSlice";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  // useEffect(
  //   () =>
  //     onAuthStateChanged(auth, (user) => {
  //       dispatch(changeCurrentUserId(user?.uid ?? ""));
  //     }),
  //   []
  // );
  // useEffect(
  //   () =>
  //     onSnapshot(collection(db, "users"), (snapshot) => {
  //       const result = snapshot.docs.map((doc) => doc.data());
  //       setUsers(result);
  //     }),
  //   []
  // );
  return (
    <main className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="overflow-y-auto px-4 flex flex-col">
        {/* <CategoriesBar /> */}
        <MainPageDisplay />
        <div className="w-full flex flex-col my-4 gap-3">
          <h1 className="font-bold text-lg">Feeds</h1>
          <Feeds />
        </div>
      </div>
    </main>
  );
}
