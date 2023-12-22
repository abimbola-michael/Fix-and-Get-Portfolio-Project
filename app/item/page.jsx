"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import CartItem from "@/components/CartItem";
import CenterMessage from "@/components/CenterMessage";
import CommentItem from "@/components/CommentItem";
import FixGetItem from "@/components/FixGetItem";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import Messager from "@/components/Messager";
import OrderOrBooking from "@/components/OrderOrBooking";
import RatingBar from "@/components/RatingBar";
import {
  getUId,
  readFixGetItem,
  readPost,
  readSimilarItems,
  readUser,
  sendChatMessage,
  sendOrderOrBookingRequest,
} from "@/firebase/firebase_api";
import { changeChatUserId } from "@/slices/appSlice";
import { convertMilisecToTime, stringsToList } from "@/utils/helpers";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function ItemPage() {
  const [showMessager, setShowMessager] = useState(false);
  const [showOrderOrBooking, setShowOrderOrBooking] = useState(false);
  const params = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [reposts, setReposts] = useState([]);
  const [comment, setComment] = useState("");
  const type = params.get("type");
  const id = params.get("id");
  const userId = params.get("userId");
  const myId = useSelector((state) => state.app.currentUserId);
  // const {
  //   name,
  //   desc,
  //   price,
  //   discPrice,
  //   negotiable,
  //   url,
  //   mediaType,
  //   currency,
  //   available = true,
  // } = item;
  useEffect(() => {
    async function getItem() {
      const item = await readFixGetItem(type, id);
      if (!item) return;
      const items = await readSimilarItems(userId, id, type, item.subCategory);
      const user = await readUser(userId);
      setUser(user);
      setItem(item);
      setSimilarItems(items);
      setLoading(false);
    }

    getItem();
  }, [type, id, userId]);

  function sendMessage(text) {
    const message = {
      userId: myId,
      receiverId: userId,
      message: text,
      messageType: "text",
      url: "",
      mediaType: "",
      for: type,
      forId: id,
      time: Date.now(),
      read: false,
    };
    sendChatMessage(message);
    setText("");
  }
  return (
    <div className="h-screen w-full max-w-4xl mx-auto overflow-hidden flex flex-col relative text-black">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">Item</p>
      {!item && !loading && <CenterMessage message={"No item found"} />}
      {item && (
        <div className="w-full h-full overflow-y-auto overflow-x-hidden px-4">
          <div className="flex flex-col w-full h-[90%] gap-3">
            <Carousel
              urls={stringsToList(item.url)}
              autoSlide={true}
              slideDuration={10000}
              indicators="images"
              // callback={setCurrentIndex}
            />
          </div>
          <div className="flex flex-col w-full text-black">
            <div className="flex gap-2 items-center">
              <p className="text-md py-1 font-bold text-blue-500 text-2xl">
                NGN {item.discPrice ? item.discPrice : item.price}
              </p>

              {item.discPrice && (
                <p className="text-sm py-1 font-bold line-through text-gray-500">
                  NGN {item.price}
                </p>
              )}
              {item.negotiable && (
                <AppButton outline={true} small={true}>
                  Negotiable
                </AppButton>
              )}
            </div>
            <h2 className="w-full font-bold text-md">{item.name}</h2>
            <p className="w-full text-sm">{item.desc}</p>
          </div>
          {/* <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-blue-500 font-bold text-4xl mb-3">
              ${item.price}
            </p>
            <div className="flex gap-4 md:gap-8 text-3xl md:mx-8 mx-4 items-center">
              <AiOutlineLike className={`hover:text-blue-500 `} />
              <BsCartPlus className={`hover:text-blue-500 text-2xl`} />
              <MdOutlineSaveAlt className={`hover:text-blue-500 `} />
            </div>
          </div>

          <p className="font-bold text-xl">{item.name}</p>
          <p className="text-sm">{item.desc}</p>
          <RatingBar size={30} showRating={false} />
        </div> */}
          <div className="flex flex-col py-2 gap-2 text-black">
            {user && (
              <div
                key={userId}
                className="flex gap-2 items-center"
                onClick={() => {}}
              >
                <Image
                  src={`${user.profilePic || "/images/mechanic.jpg"}`}
                  alt={`${user.name} Image`}
                  width={50}
                  height={50}
                  className="rounded-full aspect-square cover shrink-0"
                />
                <div className="grow flex flex-col">
                  <div className="flex justify-between items-center">
                    <p
                      className="text-md"
                      onClick={() => {
                        router.push(`/profile?userId=${userId}`);
                      }}
                    >
                      {user.name}
                    </p>
                    <p className="text-[12px] text-gray-500">
                      {convertMilisecToTime(item.time)}
                    </p>
                  </div>
                  <h1 className="text-sm">{item.title}</h1>
                </div>
              </div>
            )}
            {
              /*userId !== myId*/ true && (
                <div className="flex gap-2">
                  <AppButton
                    outline={true}
                    onClick={() => {
                      setShowOrderOrBooking(true);
                    }}
                  >
                    {type === "fix" ? "Book" : "Order"}
                  </AppButton>
                  <AppButton
                    outline={true}
                    onClick={() => {
                      setShowMessager(true);
                      // dispatch(changeChatUserId(userId));
                      // router.push("/message");
                    }}
                  >
                    Message
                  </AppButton>
                  <AppButton outline={true} onClick={() => {}}>
                    Call
                  </AppButton>
                  {/* <AppButton outline={true}>Voice Call</AppButton> */}
                </div>
              )
            }
          </div>
          {similarItems.length > 0 && (
            <div className="w-full my-4 space-y-3">
              <h1 className="font-bold text-lg">Similar Items</h1>
              <div className="overflow-y-auto">
                <ul className="flex gap-3 mx-2">
                  {similarItems.map((item) => (
                    <FixGetItem key={item.id} item={item} isFeed={true} />
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="w-full my-4  space-y-3">
            <h1 className="font-bold text-lg">Reviews</h1>
            {/* <ul className="overflow-y-auto">
            {users.map((user) => (
              <CommentItem key={user.id} user={user} comment={comment} />
            ))}
          </ul> */}
            {/* <div className="flex gap-2 items-center mx-3 my-4">
            <Image
              src={"/images/mechanic.jpg"}
              alt={`_img`}
              width={50}
              height={50}
              className="rounded-full cover aspect-square"
            />
            <input
              className="w-full outline-none px-4 py-2 border-2 focus:border-blue-500 rounded-full"
              placeholder="Comment"
            />
            <AppButton outline={false}>Send</AppButton>
          </div> */}
          </div>
        </div>
      )}
      {loading && <Loader />}
      {showMessager && (
        <Messager
          onClose={() => {
            setShowMessager(false);
          }}
          onSend={(text) => {
            sendMessage(text);
            setShowMessager(false);
          }}
        />
      )}
      {showOrderOrBooking && (
        <OrderOrBooking
          id={item?.id}
          url={item?.url}
          mediaType={item?.mediaType}
          title={item?.title}
          negotiable={item?.negotiable}
          currency={item?.currency}
          price={item?.discPrice || item?.price}
          type={type}
          onClose={() => {
            setShowOrderOrBooking(false);
          }}
          onComplete={(result) => {
            setLoading(true);
            setShowOrderOrBooking(false);

            sendOrderOrBookingRequest(result, type, userId).then(() => {
              setLoading(false);
              toast.success("Request sent successfully");
            });
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
}
