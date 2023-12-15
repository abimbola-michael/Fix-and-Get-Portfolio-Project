"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import LoginInput from "@/components/LoginInput";
import ProfileDetail from "@/components/ProfileDetail";
import { changePassword, comfirmPassword } from "@/firebase";
import {
  getBusiness,
  getUser,
  updateBusinessLocationPhotos,
  updateBusinessLogo,
  updateBusinessProfile,
  updateProfilePhoto,
  updateUserProfile,
} from "@/firebase/firebase_api";
import { useLocation } from "@/hooks/useLocation";
import { convertFileToPath, getLocation, stringsToList } from "@/utils/helpers";
import axios from "axios";
import { updateEmail } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export default function EditProfile() {
  //const { location, setLocation } = useLocation();
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
  const [currentLocation, setCurrentLocation] = useState("");
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
  const [logofile, setLogoFile] = useState(null);
  const [logopath, setLogoPath] = useState(null);
  const [fileUploadType, setFileUploadType] = useState("");
  const [isReplace, setIsReplace] = useState(false);
  const [fileIndex, setFileIndex] = useState(-1);
  const [comfirm, setComfirm] = useState(false);
  const [comfirmed, setComfirmed] = useState(false);
  const [loading, setLoading] = useState(true);
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
    currentLocation,
  };

  useEffect(() => {
    async function readUser() {
      const user = await getUser(userId);
      const business = await getBusiness(userId);
      setLoading(false);
      if (user) {
        setUser(user);
        setBusiness(business);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setProfilePhoto(user.profilePhoto);
        setPath(user.profilePhoto);
      }

      if (business) {
        setBusinessName(business.businessName);
        setBusinessEmail(business.businessEmail);
        setBusinessPhone(business.businessPhone);
        setBusinessCallPhone(business.businessCallPhone);
        setBusinessLogo(business.businessLogo);
        setBusinessAddress(business.businessAddress);
        setBusinessLocation(business.businessLocation);
        setBusinessLocationPhotos(business.businessLocationPhotos);
        setBusinessDescription(business.businessDescription);
        setBusinessCategory(business.businessCategory);
        setBusinessRole(business.businessRole);
        setBusinessWebsite(business.businessWebsite);
        setBusinessCertifications(business.businessCertifications);
        setLogoPath(business.businessLogo);
        setPaths(stringsToList(business.businessLocationPhotos));
      }
    }
    readUser();
  }, [userId]);
  function removeShopPhoto() {
    setFiles((files) => files.filter((file, i) => i != fileIndex));
    setPaths((paths) => paths.filter((path, i) => i != fileIndex));
  }
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    if (fileUploadType === "shop") {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.isEmpty) return;

      const selectedPaths = selectedFiles.map((file) =>
        convertFileToPath(file)
      );

      const newFiles = isReplace
        ? files.map((file, i) => (fileIndex === i ? selectedFiles[0] : file))
        : [...files, ...selectedFiles];
      const newPaths = isReplace
        ? paths.map((path, i) => (fileIndex === i ? selectedPaths[0] : path))
        : [...paths, ...selectedPaths];

      setFiles(newFiles);
      setPaths(newPaths);
      if (!isReplace) {
        setFileIndex(newFiles.length - 1);
      }
    } else {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        if (fileUploadType === "logo") {
          setLogoFile(selectedFile);
          setLogoPath(convertFileToPath(selectedFile));
        } else {
          setFile(selectedFile);
          setPath(convertFileToPath(selectedFile));
        }
      }
    }
  };

  function finish() {
    toast.success("Changes saved successfully");
    router.back();
    setLoading(false);
  }
  async function comfirmPasswordAndSave(password) {
    const userCred = await comfirmPassword(password);
    if (userCred?.user?.uid === userId) {
      setComfirmed(true);
      setLoading(true);

      if (editType === "profile") {
        if (user.email !== email) {
          await updateEmail(email);
        }
        if (path && path != profilePhoto) {
          updateProfilePhoto(file, async (url) => {
            newUser.profilePhoto = url;
            await updateUserProfile(user, newUser);
            setProfilePhoto(url);
            finish();
          });
        } else {
          if (!path) {
            newUser.profilePhoto = "";
          }
          await updateUserProfile(user, newUser);
          finish();
        }
      } else if (editType === "business") {
        async function uploadLogo(callback) {
          if (logopath && logopath !== businessLogo) {
            updateBusinessLogo(logofile, async (url) => {
              newBusiness.businessLogo = url;
              callback();
            });
          } else {
            if (!logopath) {
              newBusiness.businessLogo = "";
            }
            callback();
          }
        }
        if (
          paths.length > 0 &&
          paths !== stringsToList(businessLocationPhotos)
        ) {
          updateBusinessLocationPhotos(files, async (url) => {
            newBusiness.businessLocationPhotos = url;
            uploadLogo(async () => {
              await updateBusinessProfile(business, newBusiness);
              finish();
            });
          });
        } else {
          if (paths.length === 0) {
            newBusiness.businessLocationPhotos = "";
          }
          uploadLogo(async () => {
            await updateBusinessProfile(business, newBusiness);
            finish();
          });
        }
      } else if (editType === "password") {
        await changePassword(password);
        finish();
      }
    } else {
      setLoading(false);
      setComfirmed(false);
      toast.error("Password incorrect");
    }
  }
  function getCurrentLocation() {
    getLocation(({ latitude, longitude, error }) => {
      setLocation({ latitude, longitude });
    });
  }

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
          multiple={fileUploadType === "shop" && !isReplace}
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
            <div className="flex flex-col gap-3 items-center w-full">
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
                    setFileUploadType("profile");
                    handleButtonClick();
                  }}
                >
                  {path ? "Change" : "Add"} Photo
                </AppButton>

                {path && (
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={() => {
                      setFile(null);
                      setPath(null);
                    }}
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
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-full">
                <p className="text-md text-black py-2">
                  Business Location Photos
                </p>
                <div className="w-full h-[250px]">
                  <Carousel
                    urls={paths}
                    index={fileIndex}
                    autoSlide={false}
                    callback={(index) => {
                      setFileIndex(index);
                    }}
                  />
                </div>
              </div>

              <div className="flex w-full items-center justify-center gap-3">
                <AppButton
                  className="bg-blue-500 text-white rounded-md px-2 py-1"
                  onClick={() => {
                    setIsReplace(false);
                    setFileUploadType("shop");
                    handleButtonClick();
                  }}
                >
                  Add Photo
                </AppButton>
                {paths.length > 0 && (
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={() => {
                      setIsReplace(true);
                      setFileUploadType("shop");
                      handleButtonClick();
                    }}
                  >
                    Change Photo
                  </AppButton>
                )}

                {paths.length > 0 && (
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={() => {
                      setIsReplace(false);
                      removeShopPhoto();
                    }}
                  >
                    Remove Photo
                  </AppButton>
                )}
              </div>
              <div className="flex gap-3 items-center">
                <Image
                  className="rounded-full shrink-0 aspect-square"
                  src={businessLogo || logopath || "/images/photo.jpg"}
                  alt="profile picture"
                  width={50}
                  height={50}
                />
                <div className="flex items-center gap-2">
                  <AppButton
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={() => {
                      setFileUploadType("logo");
                      setIsReplace(false);
                      handleButtonClick();
                    }}
                  >
                    {logopath ? "Change" : "Add"} Logo
                  </AppButton>

                  {logopath && (
                    <AppButton
                      className="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={() => {
                        setLogoPath(null);
                        setLogoFile(null);
                      }}
                    >
                      Remove Logo
                    </AppButton>
                  )}
                </div>
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
            <ProfileDetail
              name="Business Location"
              value={
                businessLocation ? "Location Added" : "Click to Add Location"
              }
            >
              <div className="flex items-center gap-3">
                <AppButton
                  onClick={() => {
                    getLocation(({ latitude, longitude, error }) => {
                      if (!error) {
                        const location = `${latitude},${longitude}`;
                        setBusinessLocation(location);
                      }
                    });
                  }}
                >
                  Use current location
                </AppButton>
                <AppButton onClick={() => {}}>Use map location</AppButton>
              </div>
            </ProfileDetail>
            <ProfileDetail
              name="Current Location"
              value={
                currentLocation ? "Location Added" : "Click to Add Location"
              }
            >
              <AppButton
                onClick={() => {
                  getLocation(({ latitude, longitude, error }) => {
                    if (!error) {
                      const location = `${latitude},${longitude}`;
                      setBusinessLocation(location);
                    }
                  });
                }}
              >
                Get current location
              </AppButton>
            </ProfileDetail>

            <ProfileDetail name="Business Category" value={businessCategory}>
              <div className="flex items-center gap-2">
                <AppButton
                  outline={!businessCategory?.includes("fix")}
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
                  outline={!businessCategory?.includes("get")}
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
            </ProfileDetail>

            <ProfileDetail name="Certifications">
              <AppButton onClick={() => {}}>Add Certification</AppButton>
            </ProfileDetail>

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
                setEditType("password");
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
                setEditType("profile");
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
      {loading && <Loader message={comfirm ? "Saving" : ""} />}
    </div>
  );
}
