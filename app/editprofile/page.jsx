"use client";
import AppButton from "@/components/AppButton";
import Carousel from "@/components/Carousel";
import Header from "@/components/Header";
import HoursChooser from "@/components/HoursChooser";
import Loader from "@/components/Loader";
import LoginInput from "@/components/LoginInput";
//import PdfThumbnail from "@/components/PdfThumbnail";
import ProfileDetail from "@/components/ProfileDetail";
import { changePassword, comfirmPassword } from "@/firebase";
import {
  deleteMultpleFiles,
  deleteSingleFile,
  getBusiness,
  getUser,
  updateBusinessCertification,
  updateBusinessLocationPhotos,
  updateBusinessLogo,
  updateBusinessProfile,
  updateProfilePhoto,
  updateUserProfile,
  uploadMultipleFiles,
  uploadSingleFile,
} from "@/firebase/firebase_api";
import {
  convertFileToPath,
  getLocation,
  listToStrings,
  stringsToList,
} from "@/utils/helpers";
import axios from "axios";
import { updateEmail } from "firebase/auth";
import { list } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { IoMdCloseCircle } from "react-icons/io";
// import { Document, Page, pdfjs } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function convertBusinessHoursStringToObjects(businessOpenHours) {
  if (!businessOpenHours) {
    return [
      {
        startDay: "",
        endDay: "",
        startTime: "",
        endTime: "",
      },
    ];
  }
  const values = stringsToList(businessOpenHours);
  const hoursValues = values.map((value) => {
    const daysTimes = stringsToList(value, " ");
    const days = stringsToList(daysTimes[0], "-");
    const times = stringsToList(daysTimes[1], "-");
    const startDay = days[0];
    const endDay = days[1];
    const startTime = times[0];
    const endTime = times[1];

    return {
      startDay,
      endDay,
      startTime,
      endTime,
    };
  });
  return hoursValues;
}
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
  const [businessOpenHours, setBusinessOpenHours] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [comfirimPassword, setComfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);
  const userId = useSelector((state) => state.app.currentUserId);
  const router = useRouter();
  //const [certfiles, setCertFiles] = useState([]);
  const [certpaths, setCertPaths] = useState([]);
  //const [files, setFiles] = useState([]);
  const [paths, setPaths] = useState([]);
  //const [file, setFile] = useState(null);
  const [path, setPath] = useState(null);
  //const [logofile, setLogoFile] = useState(null);
  const [logopath, setLogoPath] = useState(null);
  const [fileUploadType, setFileUploadType] = useState("");
  const [isReplace, setIsReplace] = useState(false);
  const [fileIndex, setFileIndex] = useState(-1);
  const [comfirm, setComfirm] = useState(false);
  const [comfirmed, setComfirmed] = useState(false);
  const [selectWorkHours, setSelectWorkHours] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const APIKEY = "";
  const fileInputRef = useRef(null);
  const certfileInputRef = useRef(null);

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
    businessOpenHours,
    // currentLocation,
  };
  const times = Array.from({ length: 24 }, (_, i) => {
    //const hour =  i < 10 ? `0${i}` : i;
    const hour = i % 12 || 12;
    return `${hour}:00 ${i < 12 ? "AM" : "PM"}`;
  });
  const days = Array.from({ length: 7 }, (_, i) => {
    if (i === 0) return "Monday";
    if (i === 1) return "Tuesday";
    if (i === 2) return "Wednesday";
    if (i === 3) return "Thursday";
    if (i === 4) return "Friday";
    if (i === 5) return "Saturday";
    if (i === 6) return "Sunday";
  });
  function getPreviouslyUnSelectedDays(index) {
    const list = hours.slice(0, index);
    let prevSelDays = [];
    list.forEach((hour) => {
      const startIndex = days.indexOf(hour.startDay);
      const endIndex = hour.endDay ? days.indexOf(hour.endDay) : startIndex;
      const possibleDays = days.slice(startIndex, endIndex + 1);
      prevSelDays = [...prevSelDays, ...possibleDays];
    });
    return days.filter((day, i) => !prevSelDays.includes(day));
  }
  function getUnselectedDays() {
    return days.filter((day, i) => !selectedDays.includes(day));
  }

  function removeWorkingHour(index) {
    setHours((hours) => hours.filter((hour, i) => i !== index));
  }
  function addNewWorkingHour() {
    setHours((hours) => [
      ...hours,
      { startDay: "", endDay: "", startTime: "", endTime: "" },
    ]);
  }
  function updateWorkingHours(type, index, value) {
    if (type === "startDay" || type === "endDay") {
      setSelectedDays((seldays) => {
        if (
          seldays.length > 0 &&
          days.indexOf(value) > days.indexOf(seldays[seldays.length - 1])
        ) {
          return [
            ...seldays,
            ...days.slice(
              days.indexOf(seldays[seldays.length - 1]) + 1,
              days.indexOf(value) + 1
            ),
          ];
        }
        return [...seldays, value];
      });
    }
    setHours((hours) => {
      const newHours = hours.map((hour, i) => {
        if (i === index) {
          return { ...hour, [type]: value };
        } else {
          return hour;
        }
      });
      return newHours;
    });
  }
  function getSelectedDaysFromBusinessOpenHours() {
    if (!businessOpenHours) {
      // setHours([
      //   {
      //     startDay: "Monday",
      //     endDay: "Friday",
      //     startTime: "7:00 AM",
      //     endTime: "7:00 PM",
      //   },
      // ]);
      setHours([
        {
          startDay: "",
          endDay: "",
          startTime: "",
          endTime: "",
        },
      ]);
    }
    const values = stringsToList(businessOpenHours);
    const hoursValues = values.map((value) => {
      const daysTimes = stringsToList(value, " ");
      const days = stringsToList(daysTimes[0], "-");
      const times = stringsToList(daysTimes[1], "-");
      const startDay = days[0];
      const endDay = days[1];
      const startTime = times[0];
      const endTime = times[1];

      return {
        startDay,
        endDay,
        startTime,
        endTime,
      };
    });
    setHours(hoursValues);
  }

  function convertToBusinessHours() {
    const hoursStrings = hours.map((hour) => {
      const startDay = hour.startDay;
      const endDay = hour.endDay;
      const startTime = hour.startTime;
      const endTime = hour.endTime;
      return `${startDay}-${endDay} ${startTime}-${endTime}`;
    });
    return listToStrings(hoursStrings);
  }

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
        setCertPaths(stringsToList(business.businessCertifications));
        setBusinessOpenHours(business.businessOpenHours ?? "");
        convertBusinessHoursStringToObjects(business?.businessOpenHours ?? "");
      }
    }
    readUser();
  }, [userId]);
  function removeShopPhoto() {
    setFileIndex(fileIndex === paths.length - 1 ? fileIndex - 1 : fileIndex);
    //setFiles((files) => files.filter((file, i) => i != fileIndex));
    setPaths((paths) => paths.filter((path, i) => i != fileIndex));
  }
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleCertButtonClick = () => {
    // Trigger the file input click event
    certfileInputRef.current.click();
  };

  const handleCertFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.isEmpty) return;

    const selectedPaths = selectedFiles.map((file) => convertFileToPath(file));

    //const newFiles = [...certfiles, ...selectedFiles];
    const newPaths = [...certpaths, ...selectedPaths];

    //setCertFiles(newFiles);
    setCertPaths(newPaths);
  };
  const handleFileChange = (event) => {
    if (fileUploadType === "shop") {
      const selectedFiles = Array.from(event.target.files);
      if (selectedFiles.isEmpty) return;

      const selectedPaths = selectedFiles.map((file) =>
        convertFileToPath(file)
      );

      if (!isReplace) {
        setFileIndex(paths.files + selectedFiles.length - 1);
      }
      // const newFiles = isReplace
      //   ? files.map((file, i) => (fileIndex === i ? selectedFiles[0] : file))
      //   : [...files, ...selectedFiles];
      const newPaths = isReplace
        ? paths.map((path, i) => (fileIndex === i ? selectedPaths[0] : path))
        : [...paths, ...selectedPaths];

      //setFiles(newFiles);
      setPaths(newPaths);
    } else {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        if (fileUploadType === "logo") {
          //setLogoFile(selectedFile);
          setLogoPath(convertFileToPath(selectedFile));
        } else {
          //setFile(selectedFile);
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
        if (path !== user.profilePhoto) {
          if (path) {
            uploadSingleFile(
              ["users", userId],
              path,
              "profilePhoto",
              async (url) => {
                newUser.profilePhoto = url;
                await updateUserProfile(user, newUser);
                setProfilePhoto(url);
                finish();
              }
            );
          } else {
            await deleteSingleFile(["users", userId], "profilePhoto");
            newUser.profilePhoto = "";
            await updateUserProfile(user, newUser);
            setProfilePhoto("");
            finish();
          }
        } else {
          await updateUserProfile(user, newUser);
          finish();
        }
      } else if (editType === "business") {
        async function uploadLogo(callback) {
          if (logopath !== business.businessLogo) {
            if (logopath) {
              uploadSingleFile(
                ["businesses", userId],
                logopath,
                "businessLogo",
                async (url) => {
                  newBusiness.businessLogo = url;
                  callback();
                }
              );
            } else {
              await deleteSingleFile(["businesses", userId], "businessLogo");
              newBusiness.businessLogo = "";
              callback();
            }
          } else {
            callback();
          }
        }
        async function uploadLocationPhotos(callback) {
          if (listToStrings(paths) !== business.businessLocationPhotos) {
            const prevPaths = stringsToList(business.businessLocationPhotos);
            const deletedFileNames = [];
            const uploadFileNames = [];
            const uploadPaths = [];

            prevPaths.forEach((path, i) => {
              if (!paths.includes(path)) {
                deletedFileNames.push(`file_${i}`);
              }
            });

            paths.forEach((path, i) => {
              if (!path.startsWith("https://")) {
                uploadFileNames.push(`file_${i}`);
                uploadPaths.push(path);
              }
            });

            if (deletedFileNames.length > 0) {
              await deleteMultpleFiles(
                ["businesses", userId, "businessLocationPhotos"],
                deletedFileNames
              );
            }
            if (uploadPaths.length > 0) {
              uploadMultipleFiles(
                ["businesses", userId, "businessLocationPhotos"],
                uploadPaths,
                uploadFileNames,
                async (urls) => {
                  const values = uploadFileNames.map((v, i) => {
                    return { fileName: v, url: urls[i] };
                  });
                  const newUrls = paths.map((path, i) =>
                    path.startsWith("https://")
                      ? path
                      : values.find((v) => v.fileName === `file_${i}`).url
                  );
                  // console.log(`values`, values);
                  // console.log(`newUrls`, newUrls);
                  newBusiness.businessLocationPhotos = listToStrings(newUrls);
                  // console.log(
                  //   `businessLocationPhotos = ${businessLocationPhotos}`
                  // );
                  callback();
                }
              );
            } else {
              if (deletedFileNames.length > 0) {
                newBusiness.businessLocationPhotos = listToStrings(
                  paths.filter((path) => path.startsWith("https://"))
                );
              }
              callback();
            }
          } else {
            callback();
          }
        }
        async function uploadCertifications(callback) {
          if (listToStrings(certpaths) !== business.businessCertifications) {
            const prevPaths = stringsToList(business.businessCertifications);
            const deletedFileNames = [];
            const uploadFileNames = [];
            const uploadPaths = [];

            prevPaths.forEach((path, i) => {
              if (!certpaths.includes(path)) {
                deletedFileNames.push(`file_${i}`);
              }
            });

            certpaths.forEach((path, i) => {
              if (!path.startsWith("https://")) {
                uploadFileNames.push(`file_${i}`);
                uploadPaths.push(path);
              }
            });

            if (deletedFileNames.length > 0) {
              await deleteMultpleFiles(
                ["businesses", userId, "businessCertifications"],
                deletedFileNames
              );
            }
            if (uploadPaths.length > 0) {
              uploadMultipleFiles(
                ["businesses", userId, "businessCertifications"],
                uploadPaths,
                uploadFileNames,
                async (urls) => {
                  const values = uploadFileNames.map((v, i) => {
                    return { index: fileName, url: urls[i] };
                  });
                  const newUrls = certpaths.map((path, i) =>
                    path.startsWith("https://")
                      ? path
                      : values.find((v) => v.fileName === `file_${i}`).url
                  );
                  newBusiness.businessCertifications = listToStrings(newUrls);
                  callback();
                }
              );
            } else {
              if (deletedFileNames.length > 0) {
                newBusiness.businessCertifications = listToStrings(
                  certpaths.filter((path) => path.startsWith("https://"))
                );
              }
              callback();
            }
          } else {
            callback();
          }
        }

        uploadLocationPhotos(async () => {
          uploadCertifications(async () => {
            uploadLogo(async () => {
              await updateBusinessProfile(business, newBusiness);
              finish();
            });
          });
        });
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
        <input
          type="file"
          accept="application/pdf, image/*"
          style={{ display: "none" }}
          ref={certfileInputRef}
          onChange={handleCertFileChange}
          multiple={true}
        />
        {editType === "profile"
          ? "Edit Profile"
          : editType === "password"
          ? "Change Password"
          : editType === "business"
          ? "Edit Business"
          : null}
      </p>
      <div className="overflow-y-auto py-4 px-4 w-full flex flex-col items-center">
        {editType === "profile" ? (
          <>
            <div className="flex flex-col gap-3 items-center w-full">
              <Image
                className="bg-gray-100 rounded-full shrink-0 aspect-square"
                src={path || "/images/profile_placeholder.png"}
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
            {/* <ProfileDetail
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
            </ProfileDetail> */}
            <ProfileDetail
              name="Business Work Hours"
              value={businessOpenHours}
              rightChild={
                <AppButton
                  outline={true}
                  onClick={() => {
                    setSelectWorkHours(true);
                  }}
                >
                  Choose Work Hours
                </AppButton>
              }
            />
            <ProfileDetail
              name="Business Location"
              value={
                businessLocation
                  ? location
                    ? "New Location Added"
                    : "Location Added"
                  : "Click to Add Location"
              }
              rightChild={
                <AppButton
                  outline={true}
                  onClick={() => {
                    getLocation(({ latitude, longitude, error }) => {
                      if (!error) {
                        setLocation({ latitude, longitude });
                        const location = `${latitude},${longitude}`;
                        setBusinessLocation(location);
                      }
                    });
                  }}
                >
                  Get current location
                </AppButton>
              }
            ></ProfileDetail>

            <ProfileDetail
              name="Business Category"
              value={businessCategory}
              rightChild={
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
              }
            ></ProfileDetail>

            <ProfileDetail
              name="Certifications"
              rightChild={
                <AppButton
                  outline={true}
                  onClick={() => {
                    handleCertButtonClick();
                  }}
                >
                  Add Certification
                </AppButton>
              }
            >
              <div className="flex flex-col gap-2">
                {certpaths.map((path, i) => (
                  <div
                    key={i}
                    className="w-full flex items-center gap-2 justify-between"
                  >
                    {/* <Document file={path} onLoadSuccess={(pages) => {}}>
                      <Page pageNumber={1} />
                    </Document> */}
                    <AppButton
                      outline={true}
                      onClick={() => {
                        setCertPaths((paths) =>
                          paths.filter((path, index) => index !== i)
                        );
                      }}
                    >
                      Remove
                    </AppButton>
                  </div>
                ))}
              </div>
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
      {!loading && (
        <div className="absolute bottom-4 right-4">
          <AppButton
            onClick={() => {
              setComfirm(true);
            }}
          >
            Save
          </AppButton>
        </div>
      )}
      {selectWorkHours && (
        <div
          className="left-0 right-0 bg-gray-300/50 absolute w-full h-full flex flex-col items-center justify-center"
          onClick={() => {}}
        >
          <div className="bg-white flex flex-col items-center justify-center gap-5 px-3 md:px-5 py-4 rounded-lg w-full md:w-[70%] min-h-[50%]">
            <h2 className="font-bold text-lg text-center">Select Work Hours</h2>
            <ul className="w-full flex flex-col gap-6 md:gap-3 overflow-y-auto">
              {hours.map((hour, i) => (
                <div
                  key={i}
                  className="w-full flex flex-col gap-3 md:gap-0 md:flex-row items-center justify-evenly px-2 group"
                >
                  <div className="flex items-center">
                    <HoursChooser
                      title={"Start Day"}
                      list={getPreviouslyUnSelectedDays(i)}
                      value={hour.startDay}
                      onChange={(value) => {
                        updateWorkingHours("startDay", i, value);
                      }}
                    />
                    <HoursChooser
                      title={"End Day"}
                      list={getPreviouslyUnSelectedDays(i)}
                      value={hour.endDay}
                      onChange={(value) => {
                        updateWorkingHours("endDay", i, value);
                      }}
                    />
                  </div>

                  <div className="flex items-center">
                    <HoursChooser
                      title={"Start Time"}
                      list={times}
                      value={hour.startTime}
                      onChange={(value) => {
                        updateWorkingHours("startTime", i, value);
                      }}
                    />
                    <HoursChooser
                      title={"End Time"}
                      list={times}
                      value={hour.endTime}
                      onChange={(value) => {
                        updateWorkingHours("endTime", i, value);
                      }}
                    />
                  </div>

                  <IoMdCloseCircle
                    className="hidden group-hover:block text-lg duration-300 ease-in-out transition-all"
                    onClick={() => {
                      removeWorkingHour(i);
                    }}
                  />
                </div>
              ))}
            </ul>

            <div className="w-full flex justify-evenly items-center">
              <AppButton
                outline={true}
                onClick={() => {
                  setSelectWorkHours(false);
                }}
              >
                Cancel
              </AppButton>
              <AppButton
                outline={true}
                onClick={() => {
                  addNewWorkingHour();
                }}
              >
                Add
              </AppButton>

              <AppButton
                onClick={() => {
                  const businessHourString = convertToBusinessHours();
                  if (businessHourString != businessOpenHours) {
                    setBusinessOpenHours(businessHourString);
                  }
                  setSelectWorkHours(false);
                }}
              >
                Done
              </AppButton>
            </div>
          </div>
        </div>
      )}
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
