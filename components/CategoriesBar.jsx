"use client";
import { fixCategories, getCategories } from "@/utils/categories";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";

export default function CategoriesBar({ tab }) {
  const currentTab = useSelector((state) => state.app.tab);
  const categories = currentTab === 0 ? fixCategories : getCategories;
  const [currentCategory, setCurrentCategory] = useState("");
  return (
    <div className="max-w-3xl p-2 mx-auto flex justify-start gap-3">
      <ul className="shrink-0 flex flex-col gap-2">
        {Object.keys(categories).map((category) => (
          <li
            key={category}
            onClick={() => setCurrentCategory(category)}
            onMouseEnter={() => setCurrentCategory(category)}
            onMouseLeave={() => setCurrentCategory("")}
            className="hover:text-blue-500 relative"
          >
            {category}
          </li>
        ))}
      </ul>
      <div className="grow">
        <Carousel
          urls={[
            "/images/generator.jpg",
            "/images/laptop.jpg",
            "/images/mechanic.jpg",
            "/images/phone.jpg",
            "/images/tailor.jpg",
          ]}
          autoSlide={false}
        />
        {/* <ul className=" flex flex-col gap-2">
          {categories[currentCategory]?.map((category) => (
            <li key={category} className="hover:text-blue-500">{category} </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
}
