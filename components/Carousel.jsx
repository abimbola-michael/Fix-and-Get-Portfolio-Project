"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
// export default function Carousel({ urls, autoSlide, slideInterval = 3000 }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const prevSlide = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };
//   const nextSlide = () => {
//     const isLastSlide = currentIndex === urls.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

// useEffect(() => {
//     if (!autoSlide) return;
//     const slideInterval = setInterval(nextSlide, slideDuration);
//     return () => {
//       clearInterval(slideInterval);
//     };
//   }, []);

//   return (
//     <div className="max-w-[1400px] w-full h-[50%] m-auto px-4 relative group overflow-hidden">
//       <div
//         style={{ backgroundImage: `url(${urls[currentIndex]})` }}
//         className="w-full h-full rounded-2xl bg-cover duration-500"
//       >
//         {/* {urls.map((url) => (
//           <Image src={url} />
//         ))} */}
//       </div>
//       <div className="hidden group-hover:block absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
//         <BsChevronCompactLeft onClick={prevSlide} size={30} />
//       </div>
//       <div className="hidden group-hover:block absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
//         <BsChevronCompactRight onClick={nextSlide} size={30} />
//       </div>
//       <div className="flex top-4 justify-center py-2">
//         {urls.map((url, index) => (
//           <div
//             key={url}
//             onClick={() => setCurrentIndex(index)}
//             className="text-2xl cursor-pointer"
//           >
//             <RxDotFilled />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

export default function Carousel({
  urls,
  mediaTypes,
  index = 0,
  autoSlide,
  slideDuration = 3000,
  callback,
  indicators = "dots",
}) {
  if (!mediaTypes) mediaTypes = Array(urls.length).fill("image");

  const [currentIndex, setCurrentIndex] = useState(index < 0 ? 0 : index);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    callback && callback(newIndex);
  };
  const isLastSlide = currentIndex === urls.length - 1;
  const isFirstSlide = currentIndex === 0;

  const nextSlide = useCallback(() => {
    const isLastSlide = currentIndex === urls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    callback && callback(newIndex);
  }, [currentIndex, urls.length, callback]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, slideDuration);
    return () => {
      clearInterval(slideInterval);
    };
  }, [autoSlide, nextSlide, slideDuration]);

  return (
    <div
      className={`bg-center flex flex-col gap-2 w-full h-full relative group overflow-hidden ${
        indicators === "images" ? "" : "rounded-lg"
      }`}
      style={{
        backgroundImage:
          urls.length === 0 ? `url(/images/img_placeholder.png)` : null,
      }}
    >
      {urls.length > 0 && (
        <ul
          className={`${
            indicators === "images" ? "h-[80%]" : "h-full"
          } flex w-full rounded-2xl duration-500 transition-transform ease-out`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {urls.map((url, index) => (
            <li className="w-full h-full flex-none" key={index}>
              {mediaTypes[index] === "video" ? (
                <video
                  className="object-cover w-full h-full aspect-auto"
                  src={url}
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <Image
                  className="object-cover w-full h-full aspect-auto"
                  src={url}
                  alt={`${url}_image`}
                  width={1000}
                  height={700}
                />
              )}
            </li>
          ))}
        </ul>
      )}
      <div
        className={`hidden group-hover:${
          urls.length === 0 || isFirstSlide ? "hidden" : "block"
        } absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer`}
      >
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div
        className={`hidden group-hover:${
          urls.length === 0 || isLastSlide ? "hidden" : "block"
        } absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer`}
      >
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      {indicators === "images" && (
        <ul className="w-full h-[20%] flex gap-2">
          {urls.map((url, index) => (
            <li
              key={url}
              className={`w-[20%] h-[80%] ${
                currentIndex === index ? "border-2 border-blue-500" : ""
              }`}
            >
              <Image
                className="w-full h-full aspect-auto object-cover"
                src={url}
                alt={`imag_${url}`}
                width={70}
                height={50}
                onClick={() => setCurrentIndex(index)}
              />
            </li>
          ))}
        </ul>
      )}
      {indicators === "dots" && (
        <div className="absolute bottom-4 right-0 left-0 flex flex-row justify-center items-center">
          {urls.map((url, index) => (
            <div
              key={url}
              onClick={() => setCurrentIndex(index)}
              className={`text-2xl cursor-pointer transition-all ${
                index === currentIndex
                  ? "text-blue-500 text-4xl"
                  : "text-gray-400 bg-opacity-50"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
