"use client";
import { fixCategories, getCategories } from "@/utils/categories";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Carousel from "./Carousel";
import HomeTab from "./HomeTab";

export default function CategoriesBar() {
  //const currentTab = useSelector((state) => state.app.tab);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentTab, setCurrentTab] = useState("Fix");
  const hoverTimeout = useRef(null);
  const categories = currentTab === "Fix" ? fixCategories : getCategories;

  const handleMouseEnter = (category) => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setCurrentCategory((cat) => (cat != "" ? "" : category.name));
    }, 100);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setCurrentCategory("");
    }, 100);
  };

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);
  return (
    <div
      className="max-w-4xl h-[60%] w-full p-2 mx-auto flex items-stretch gap-3 group"
      onMouseLeave={handleMouseLeave}
    >
      <ul className="w-[20%] shrink-0 flex flex-col gap-2 justify-between overflow-y-auto">
        {categories.map((category) => (
          <li
            key={category.name}
            onClick={() => setCurrentCategory(category.name)}
            onMouseEnter={() => {
              handleMouseEnter(category);
            }}
            className="hover:text-blue-500 relative"
          >
            {category.name}
          </li>
        ))}
      </ul>
      <div className="w-[80%] h-full">
        {currentCategory ? (
          <div className="w-full h-full flex flex-col">
            <div className="w-full flex justify-evenly mb-4">
              <HomeTab
                name="Fix"
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                hoverSelect={true}
              />
              <HomeTab
                name="Get"
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                hoverSelect={true}
              />
            </div>
            <ul className="flex flex-wrap items-stretch w-full gap-4">
              {categories[
                categories.findIndex(
                  (category) => category.name === currentCategory
                )
              ]?.subcategories?.map((category) => (
                <li
                  key={category.name}
                  className="hover:text-blue-500 w-[47%] md:w-[30%]"
                >
                  {category.name}
                  <ul className="flex flex-col gap-1 text-sm text-gray-700">
                    {category.items.map((item) => (
                      <li key={item} className="hover:text-blue-500">
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Carousel
            urls={[
              "/images/generator.jpg",
              "/images/laptop.jpg",
              "/images/mechanic.jpg",
              "/images/phone.jpg",
              "/images/tailor.jpg",
            ]}
            autoSlide={true}
          />
        )}
      </div>
    </div>
  );
}
