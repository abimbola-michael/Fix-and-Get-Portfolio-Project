"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

export default function Carousel({ urls, autoSlide, slideDuration = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === urls.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(nextSlide, slideDuration);
    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <div className="max-w-2xl w-full h-full m-auto relative group overflow-hidden rounded-lg">
      <div
        className="flex w-full h-full rounded-2xl duration-500 transition-transform ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {urls.map((url) => (
          <img src={url} className="object-cover" />
          //   <Image src={url} width={500} height={250} />
        ))}
      </div>
      <div className="hidden group-hover:block absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className="hidden group-hover:block absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="absolute bottom-4 right-0 left-0 flex flex-row justify-center items-center">
        {urls.map((url, index) => (
          <div
            key={url}
            onClick={() => setCurrentIndex(index)}
            className={`text-2xl cursor-pointer transition-all ${
              index === currentIndex
                ? "text-blue-500 text-4xl"
                : "text-gray-600 bg-opacity-50"
            }`}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}
