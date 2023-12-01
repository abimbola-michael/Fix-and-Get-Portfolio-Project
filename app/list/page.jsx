"use client";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import JobsAorOrdersTabBar from "@/components/JobsOrOrdersTabBar";
import React, { useState } from "react";

export default function JobsAndOrders() {
  const [currentTab, setCurrentTab] = useState("Jobs");

  return (
    <div className="h-screen overflow-hidden flex flex-col">
      <Header />
      <div className="w-full max-w-4xl mx-auto overflow-y-auto">
        <p className="font-bold text-lg mx-4 my-2">Jobs and Orders</p>
        {/* <JobsAorOrdersTabBar /> */}
        <div className="w-full flex justify-evenly mb-4">
          <HomeTab
            name="Jobs"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <HomeTab
            name="Orders"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
      </div>
    </div>
  );
}
