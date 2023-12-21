import React, { useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import AppButton from "./AppButton";
import LoginInput from "./LoginInput";
import ProfileDetail from "./ProfileDetail";
import Login from "@/app/login/page";

export default function OrderOrBooking({
  title,
  negotiable,
  currency,
  price,
  type,
  onComplete,
  onClose,
}) {
  const [qty, setQty] = useState(1);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(price ?? 0);

  return (
    <div
      className="absolute left-0 right-0 bg-gray-300/50 w-full flex flex-col items-center justify-end h-screen py-2 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full h-full overflow-y-auto py-4 justify-center items-center rounded-2xl outline-none border-2 border-grey-400 shadow-md px-3 mx-3 z-40"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full text-center">
          <h1 className="font-bold text-xl">
            {type === "fix" ? "Booking" : "Order"}
          </h1>
          <h2 className="font-bold text-md">{title}</h2>
          <p className="py-2 font-bold text-3xl text-blue-500">
            {currency} {price}
          </p>
        </div>
        {(type === "fix" || (type === "get" && negotiable)) && (
          <LoginInput
            placeholder="Your Budget"
            type="number"
            value={budget}
            minValue={0}
            maxValue={price}
            onChange={setBudget}
          />
        )}
        {type === "get" && (
          <LoginInput
            placeholder="Quantity"
            type="number"
            value={qty}
            minValue={1}
            onChange={setQty}
          />
        )}
        <LoginInput
          name={"Date"}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <LoginInput
          name={"Time"}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <LoginInput
          name={"Time"}
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <LoginInput
          name={"Meeting Location"}
          type="text"
          value={meetingLocation}
          onChange={(e) => setMeetingLocation(e.target.value)}
          placeholder="Where to meet"
        />
        <LoginInput
          name={"Description"}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your order or booking"
        />

        {type === "get" && price && (
          <p className="text-center font-bold text-xl">
            Total price = {currency}{" "}
            {budget ? `${budget * qty}` : `${price * qty}`}
          </p>
        )}

        <div className="w-full flex justify-evenly items-center py-4">
          <AppButton outline={true} onClick={onClose}>
            Cancel
          </AppButton>
          <AppButton
            onClick={() => {
              onComplete?.({
                qty,
                time,
                date,
                meetingLocation,
                description,
                budget,
              });
            }}
          >
            {type === "fix" ? "Book for Job" : "Send Order"}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
