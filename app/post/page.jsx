"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import { fixCategories, getCategories } from "@/utils/categories";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

const images = Array.from({ length: 10 }, (v, i) => {
  return { url: "/images/laptop.jpg", type: "image", id: i.toString() };
});
export default function Post() {
  const [type, setType] = useState("fix");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");

  const post = {
    id: "0",
    type: type,
    category: "Electronics",
  };
  const urls = [
    "/images/generator.jpg",
    "/images/laptop.jpg",
    "/images/mechanic.jpg",
    "/images/phone.jpg",
    "/images/tailor.jpg",
  ];
  const categories = type === "fix" ? fixCategories : getCategories;
  const item = {
    id: "4",
    url: "/images/laptop.jpg",
    type: "image",
    category: "Laptop",
    name: "EliteBook G50",
    desc: "Core i5, 8GB RAM, 1TB SSD, 15.6 inches",
    price: 200,
    currency: "USD",
    inStock: true,
  };
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Post</p>
      <div className="w-full h-full overflow-y-auto overflow-x-hidden mx-4">
        <div className="flex flex-col w-full h-[90%] gap-3">
          <Carousel
            urls={urls}
            autoSlide={true}
            slideDuration={10000}
            indicators="images"
            callback={setCurrentIndex}
          />
        </div>
        <div className="flex row justify-between items-start">
          <div className="flex flex-col">
            <p className="font-bold text-md">{item.name}</p>
            <p className="text-sm">{item.desc}</p>
          </div>
          <p className="text-blue-500 font-bold text-lg">${item.price}</p>
        </div>
        <div className="w-full">
          <h1>Comments</h1>
        </div>
      </div>
    </div>
  );
}
