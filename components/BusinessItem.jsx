import { getUser } from "@/firebase/firebase_api";
import { changeChat } from "@/slices/appSlice";
import { convertMilisecToTime } from "@/utils/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function BusinessItem({
  business: {
    userId,
    businessName,
    businessEmail,
    businessPhone,
    businessCallPhone,
    businessLogo,
    businessAddress,
    businessLocation,
    businessLocationPhotos,
    businessDescription,
    businessCategory,
    businessRole,
    businessWebsite,
    businessCertifications,
    businessOpenHours,
  },
  onClick,
}) {
  return (
    <li
      key={userId}
      className="flex gap-2 px-4 py-2 items-center"
      onClick={onClick}
    >
      <Image
        src={profilePhoto || "/images/mechanic.jpg"}
        alt={`${businessName} Profile Photo`}
        placeholder="blur"
        blurDataURL="/images/profile_placeholder.png"
        width={50}
        height={50}
        className="rounded-full aspect-square cover shrink-0"
      />
      <div className="grow flex flex-col">
        <p className="text-md">{businessName}</p>
        <p className="text-sm text-gray-700 text-ellipsis line-clamp-3">
          {businessDescription}
        </p>
      </div>
    </li>
  );
}
