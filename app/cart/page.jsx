import CartItem from "@/components/CartItem";
import Header from "@/components/Header";
import React from "react";

export default function Cart() {
  const items = Array.from({ length: 10 }, (v, i) => {
    return {
      id: i.toString(),
      url: "/images/laptop.jpg",
      type: "image",
      category: "Laptop",
      name: "EliteBook G50",
      desc: "Core i5, 8GB RAM, 1TB SSD, 15.6 inches",
      price: 200,
      currency: "USD",
      inStock: true,
    };
  });
  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Cart</p>
      <div className=" overflow-y-auto">
        <ul className="flex gap-3 flex-wrap mx-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
