import {
  convertMilisecToTime,
  convertToDate,
  convertTwentyFourHoursToTwelveHours,
  stringsToList,
} from "@/utils/helpers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function JobOrderItem({
  jobororder: {
    id,
    bookOrOrderTime,
    time,
    status,
    ownerId,
    userId,
    title,
    url,
    mediaType,
    fixOrGetId,
    fixOrGet,
    currency,
    qty,
    date,
    meetingLocation,
    description,
    price,
  },
}) {
  // useEffect(() => {
  // }, [])
  const router = useRouter();
  const urls = stringsToList(url);
  const mediaTypes = stringsToList(mediaType);
  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  }
  return (
    <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row px-3 py-2">
      <div className="w-full h-[200px] md:w-[20%]">
        <Image
          src={urls[0]}
          alt={`${mediaTypes[0]}`}
          width={250}
          height={200}
          className="w-full h-full object-cover rounded-lg"
          onClick={() => {}}
        />
      </div>
      <div className="w-full md:w-[80%]">
        <div className="w-full flex justify-between items-center">
          <p className="text-lg font-bold">{title}</p>
          <p
            className={`text-md text-semibold text-white rounded-lg px-3 py-1 ${getStatusColor(
              status
            )}`}
          >
            {status}
          </p>
        </div>
        <p className="text-lg">{description}</p>

        <div className="w-full flex justify-between items-center">
          <p className="font-semibold text-lg">
            {currency} {price}
            <span className="text-lg"> x{qty}</span>
          </p>
          <p className="font-bold text-xl text-blue-500">
            {currency} {price * qty}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          <span className="font-bold">
            {fixOrGet == "get" ? "Order" : "Book"} Date -{" "}
            {convertToDate(bookOrOrderTime)}
          </span>{" "}
          {convertMilisecToTime(bookOrOrderTime)}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-bold">
            Scheduled Date and Time - {date.replace("-", "/")}
          </span>{" "}
          {convertTwentyFourHoursToTwelveHours(time)}
        </p>
      </div>
    </div>
  );
}
