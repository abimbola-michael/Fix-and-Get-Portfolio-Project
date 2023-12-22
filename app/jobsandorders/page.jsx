"use client";
import CenterMessage from "@/components/CenterMessage";
import Header from "@/components/Header";
import HomeTab from "@/components/HomeTab";
import JobOrderItem from "@/components/JobOrderItem";
import JobsAorOrdersTabBar from "@/components/JobsOrOrdersTabBar";
import { readJobsOrOrders } from "@/firebase/firebase_api";
import React, { useEffect, useState } from "react";

export default function JobsAndOrders() {
  const [currentTab, setCurrentTab] = useState("Jobs");
  const [jobsOrOrders, setJobsOrOrders] = useState([]);
  useEffect(() => {
    async function readAllJobsOrOrders() {
      const jobsOrOrders = await readJobsOrOrders(currentTab.toLowerCase());
      setJobsOrOrders(jobsOrOrders);
    }
    readAllJobsOrOrders();
  }, [currentTab]);

  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Jobs and Orders</p>
      <div className="overflow-y-auto">
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
          {/* <HomeTab
            name="WishList"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          /> */}
        </div>
        {/* <div className="w-full flex justify-evenly mb-4">
          <JobsAorOrdersTabBar
            name="All"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <JobsAorOrdersTabBar
            name="Pending"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <JobsAorOrdersTabBar
            name="Completed"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
          <JobsAorOrdersTabBar
            name="Cancelled"
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div> */}
        <div className="w-full h-full">
          {jobsOrOrders.length === 0 ? (
            <CenterMessage message={`No ${currentTab}`} />
          ) : (
            <ul className="w-full flex flex-col">
              {jobsOrOrders.map((jobOrOrder) => {
                return (
                  <JobOrderItem key={jobOrOrder.id} jobororder={jobOrOrder} />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
