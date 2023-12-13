"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import LoginInput from "@/components/LoginInput";
import { changePassword, comfirmPassword } from "@/firebase";
import {
  getBusiness,
  getUser,
  updateBusinessProfile,
  updateUserProfile,
} from "@/firebase/firebase_api";
import { convertFileToPath } from "@/utils/helpers";
import axios from "axios";
import { updateEmail } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function EditProfile() {
  const [editType, setEditType] = useState("profile");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [businessCallPhone, setBusinessCallPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessLogo, setBusinessLogo] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessLocation, setBusinessLocation] = useState("");
  const [businessLocationPhotos, setBusinessLocationPhotos] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessRole, setBusinessRole] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessCertifications, setBusinessCertifications] = useState("");
  const [currentlocation, setCurrentlocation] = useState("");
  const [comfirimPassword, setComfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const userId = useSelector((state) => state.app.currentUserId);
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [paths, setPaths] = useState([]);
  const [file, setFile] = useState(null);
  const [path, setPath] = useState(null);

  const [isLocationPhotos, setIsLocationPhotos] = useState(false);
  const [comfirm, setComfirm] = useState(false);
  const [comfirmed, setComfirmed] = useState(false);
  const APIKEY = "";

  const newUser = {
    userId,
    name,
    email,
    phone,
    profilePhoto,
  };

  const newBusiness = {
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
    currentlocation,
  };

  function openGoogleMaps() {
    // Replace '1600 Amphitheatre Parkway, Mountain View, CA' with your desired address
    const address = "1600 Amphitheatre Parkway, Mountain View, CA";

    // Encode the address for the URL
    const encodedAddress = encodeURIComponent(address);
    getLatLngFromAddress(address);

    // Construct the Google Maps URL
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    // Open the URL in a new tab or window
    window.open(googleMapsUrl, "_blank");
  }
  const getLatLngFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.API_KEY}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        console.log("Latitude:", lat);
        console.log("Longitude:", lng);
        setLocation({ lat, lng });
        return { lat, lng };
      } else {
        console.error("No results found for the given address");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data from Google Maps API:", error.message);
      return null;
    }
  };
  useEffect(() => {
    async function readUser() {
      const user = await getUser(userId);
      const business = await getBusiness(userId);
      if (user) {
        setUser(user);
        setBusiness(business);
        setName(user?.name ?? "");
        setEmail(user?.email ?? "");
        setPhone(user?.phone ?? "");
        setProfilePhoto(user?.profilePhoto ?? "");
      }

      if (business) {
        setBusinessName(business?.businessName ?? "");
        setBusinessEmail(business?.businessEmail ?? "");
        setBusinessPhone(business?.businessPhone ?? "");
        setBusinessCallPhone(business?.businessCallPhone ?? "");
        setBusinessLogo(business?.businessLogo ?? "");
        setBusinessAddress(business?.businessAddress ?? "");
        setBusinessLocation(business?.businessLocation ?? "");
        setBusinessLocationPhotos(business?.businessLocationPhotos ?? "");
        setBusinessDescription(business?.businessDescription ?? "");
        setBusinessCategory(business?.businessCategory ?? "");
        setBusinessRole(business?.businessRole ?? "");
        setBusinessWebsite(business?.businessWebsite ?? "");
        setBusinessCertifications(business?.businessCertifications ?? "");
      }
    }
    readUser();
  }, [userId]);
  function setUserDetails() {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phone ?? "");
    setProfilePhoto(user?.profilePhoto ?? "");
  }
  function setBusinessDetails() {
    setBusinessCallPhone(business?.businessCallPhone ?? "");
    setBusinessLogo(business?.businessLogo ?? "");
    setBusinessAddress(business?.businessAddress ?? "");
    setBusinessLocation(business?.businessLocation ?? "");
    setBusinessLocationPhotos(business?.businessLocationPhotos ?? "");
    setBusinessDescription(business?.businessDescription ?? "");
    setBusinessCategory(business?.businessCategory ?? "");
    setBusinessRole(business?.businessRole ?? "");
    setBusinessWebsite(business?.businessWebsite ?? "");
    setBusinessCertifications(business?.businessCertifications ?? "");
  }
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    if (isLocationPhotos) {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.isEmpty) return;

      const selectedPaths = selectedFiles.map((file) =>
        convertFileToPath(file)
      );

      const newFiles = [...files, ...selectedFiles];
      const newPaths = [...paths, ...selectedPaths];

      setFiles(newFiles);
      setPaths(newPaths);
    } else {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        setFile(selectedFile);
        setPath(convertFileToPath(selectedFile));
      }
    }
  };

  function getLocation() {
    //console.log(`key = ${process.env.API_KEY}`);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(`Error getting location: ${err.message}`);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  async function comfirmPasswordAndSave(password) {
    const userCred = await comfirmPassword(password);
    if (userCred?.user?.uid === userId) {
      setComfirmed(true);
      // if (user) {
      //   if (user.name !== name) {
      //     await user.updateProfile({
      //       displayName: name,
      //     });
      //   }
      // }
      if (editType === "profile") {
        if (user.email !== email) {
          await updateEmail(email);
        }
        await updateUserProfile(user, newUser);
      } else if (editType === "business") {
        await updateBusinessProfile(business, newBusiness);
      } else if (editType === "password") {
        await changePassword(password);
      }
      toast.success("Changes saved successfully");
      router.back();
    } else {
      setComfirmed(false);
      toast.error("Password incorrect");
    }
  }
  function saveChanges() {}
  return (
    <div className="w-full max-w-4xl mx-auto h-screen overflow-hidden flex flex-col">
      <Header />
      <p className="font-bold text-lg mx-4 my-2">
        <input
          type="file"
          accept="image/*,video/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={isLocationPhotos}
        />
        {editType === "profile"
          ? "Edit Profile"
          : editType === "password"
          ? "Change Password"
          : editType === "business"
          ? "Edit Business"
          : null}
      </p>
      <div className="overflow-y-auto py-4 px-4 w-full flex flex-col gap-3 items-center">
        {editType === "profile" ? (
          <>
            <div className="flex flex-col gap-3">
              <Image
                className="bg-gray-100 rounded-full shrink-0 aspect-square"
                src={profilePhoto || path || "/images/profile_placeholder.png"}
                alt="profile picture"
                width={150}
                height={150}
              />
              <div className="flex gap-3 items-center justify-center">
                <AppButton
                  className="bg-blue-500 text-white rounded-md px-2 py-1"
                  onClick={() => {
                    setIsLocationPhotos(false);
                    handleButtonClick();
                  }}
                >
                  {path ? "Change" : "Add"} Photo
                </AppButton>

                {path && (
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={() => {}}
                  >
                    Remove Photo
                  </AppButton>
                )}
              </div>
            </div>
            <LoginInput placeholder={"Name"} value={name} onChange={setName} />

            <LoginInput
              placeholder={"Email"}
              value={email}
              onChange={setEmail}
              type="email"
            />
            <LoginInput
              placeholder={"Phone"}
              value={phone}
              onChange={setPhone}
              type="phone"
            />
          </>
        ) : editType === "password" ? (
          <LoginInput
            placeholder={"Password"}
            value={password}
            onChange={setPassword}
            type="password"
          />
        ) : editType === "business" ? (
          <>
            <div
              className="flex flex-col gap-3 w-full"
              style={{ backgroundImage: `url(${businessLocationPhotos})` }}
            >
              <div className="flex flex-col w-full">
                <p className="text-md text-black py-2">
                  Business Location Photos
                </p>
                <div className="w-full h-[200px]">
                  <Carousel urls={[]} autoSlide={false} />
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-3">
                <AppButton
                  className="bg-blue-500 text-white rounded-md px-2 py-1"
                  onChange={() => {
                    setIsLocationPhotos(true);
                    handleButtonClick();
                  }}
                >
                  Add Photo
                </AppButton>
                {paths.length > 0 && (
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onChange={() => {}}
                  >
                    Change Photo
                  </AppButton>
                )}

                {paths.length > 0 && (
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onChange={() => {}}
                  >
                    Remove Photo
                  </AppButton>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <Image
                  className="rounded-full shrink-0 aspect-square"
                  src={businessLogo || "/images/photo.jpg"}
                  alt="profile picture"
                  width={50}
                  height={50}
                />
                <AppButton
                  className="bg-blue-500 text-white rounded-md px-2 py-1"
                  onChange={() => {}}
                >
                  {path ? "Change" : "Add"} Logo
                </AppButton>
              </div>
            </div>
            <LoginInput
              placeholder={"Business Name"}
              value={businessName}
              onChange={setBusinessName}
            />

            <LoginInput
              placeholder={"Business Email"}
              value={businessEmail}
              onChange={setBusinessEmail}
              type="email"
            />
            <LoginInput
              placeholder={"Business Phone"}
              value={businessPhone}
              onChange={setBusinessPhone}
              type="phone"
            />

            <LoginInput
              placeholder={"Business Call Phone"}
              value={businessCallPhone}
              onChange={setBusinessCallPhone}
              type="phone"
            />
            <LoginInput
              placeholder={"Business Address"}
              value={businessAddress}
              onChange={setBusinessAddress}
            />
            <LoginInput
              placeholder={"Business Description"}
              value={businessDescription}
              onChange={setBusinessDescription}
            />

            <LoginInput
              placeholder={"Business Role"}
              value={businessRole}
              onChange={setBusinessRole}
            />
            <LoginInput
              placeholder={"Business Website"}
              value={businessWebsite}
              onChange={setBusinessWebsite}
            />
            <div className="w-full flex gap-3 items-center">
              <p className="text-md text-black py-2">
                Business Location
                <br /> <span className="font-bold">Location Added</span>{" "}
              </p>
              <AppButton onClick={() => {}}>Use current location</AppButton>
              <AppButton onClick={() => {}}>Use map location</AppButton>
            </div>

            <div className="w-full flex gap-3 items-center">
              <p className="text-md text-black py-2">
                Current Location
                <br /> <span className="font-bold">Location Added</span>{" "}
              </p>
              <AppButton onClick={() => {}}>Get current location</AppButton>
            </div>
            <div className="w-full flex gap-3 items-center">
              <p className="text-md text-black py-2">
                Business Category
                <br /> <span className="font-bold">
                  {businessCategory}
                </span>{" "}
              </p>
              <AppButton
                outline={!businessCategory.includes("fix")}
                onClick={() => {
                  if (businessCategory.includes("fix")) {
                    setBusinessCategory(
                      businessCategory.replace("fix", "").trim()
                    );
                  } else {
                    setBusinessCategory((businessCategory + " fix").trim());
                  }
                }}
              >
                Fix
              </AppButton>
              <AppButton
                outline={!businessCategory.includes("get")}
                onClick={() => {
                  if (businessCategory.includes("get")) {
                    setBusinessCategory(
                      businessCategory.replace("get", "").trim()
                    );
                  } else {
                    setBusinessCategory((businessCategory + " get").trim());
                  }
                }}
              >
                Get
              </AppButton>
            </div>

            <div className="w-full flex gap-3 items-center">
              <p className="text-md text-black py-2">
                Certifications
                <br /> <span className="font-bold">Location Added</span>{" "}
              </p>
              <AppButton onClick={() => {}}>Add Certification</AppButton>
            </div>
            {/* <div className="flex flex-col">
          
            <p>
              Business Location - {location?.latitude} {location?.longitude}
            </p>
            <AppButton
              onClick={() => {
                getLocation();
                //openGoogleMaps();
                // const businessAddress = "79Karimu, Karimu Ikotun Cl, Lagos";
                // getLatLngFromAddress(businessAddress);
              }}
            >
              Choose Location
            </AppButton>
          </div> */}
          </>
        ) : null}

        <div className="w-full flex flex-col gap-2">
          <button
            className="w-full text-start font-bold text-black text-md"
            onClick={() => {
              if (editType === "profile") {
                setEditType("password");
              } else if (editType === "password") {
                setEditType("profile");
              } else if (editType === "business") {
                setEditType("profile");
              }
            }}
          >
            {editType === "profile"
              ? "Change Password"
              : editType === "password"
              ? "Edit Profile"
              : "Change Password"}
          </button>
          <button
            className="w-full text-start font-bold text-black text-md"
            onClick={() => {
              if (editType === "profile") {
                setEditType("business");
              } else if (editType === "password") {
                setEditType("business");
              } else if (editType === "business") {
                setEditType("password");
              }
            }}
          >
            {editType === "profile"
              ? "Edit Business"
              : editType === "password"
              ? "Edit Business"
              : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 left-4">
        <ToastContainer />
      </div>
      <div className="absolute bottom-4 right-4">
        <AppButton
          onClick={() => {
            setComfirm(true);
          }}
        >
          Save
        </AppButton>
      </div>
      {comfirm && (
        <div
          className="left-0 right-0 bg-gray-300/50 absolute w-full h-full flex flex-col items-center justify-center"
          onClick={() => {
            //setComfirm(false);
          }}
        >
          <div className="bg-white flex flex-col items-center justify-center gap-5 px-3 md:px-5 py-4 rounded-lg w-[50%] h-[50%]">
            <h2 className="font-bold text-lg text-center">Comfirm Password</h2>
            <LoginInput
              placeholder={"Password"}
              value={comfirimPassword}
              onChange={setComfirmPassword}
              type="password"
            />

            <div className="w-full flex justify-evenly items-center">
              <AppButton
                outline={true}
                onClick={() => {
                  setComfirm(false);
                }}
              >
                Cancel
              </AppButton>
              <AppButton
                onClick={() => {
                  comfirmPasswordAndSave(comfirimPassword);
                }}
              >
                Save
              </AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
