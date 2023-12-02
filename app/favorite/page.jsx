"use client";
import FavoriteTabBar from "@/components/FavoriteTabBar";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import React, { useState } from "react";

export default function Favorite() {
  const [currentTab, setCurrentTab] = useState("Fixers");
  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Favorites</p>

      <div className="overflow-y-auto">
        <div className="w-full flex justify-evenly mb-4">
          <HomeTab
            name="Fixers"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <HomeTab
            name="Sellers"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          <HomeTab
            name="Items"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
      </div>
    </div>
  );
}
