import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAddCircleOutline, MdOutlineEdit } from "react-icons/md";
import AppButton from "./AppButton";
import { convertFileToPath, stringsToList } from "@/utils/helpers";

export default function FixGetInputItem({ item, onChange }) {
  const fileInputRef = useRef(null);

  // const [file, setFile] = useState(null);
  // const [mediaType, setMediaType] = useState("image");

  const [files, setFiles] = useState(item.files);
  const [paths, setPaths] = useState(() => [convertFileToPath(item.files[0])]);

  const [mediaTypes, setMediaTypes] = useState(item.mediaTypes);

  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.desc);
  const [price, setPrice] = useState(item.price);
  const [discPrice, setDiscPrice] = useState(item.discPrice);
  const [negotiable, setNegotiable] = useState(item.negotiable);
  function updateFile(result, type) {
    setFiles((files) =>
      files === `${files},${result}` ? files : `${files},${result}`
    );

    // setMediaTypes((mediaTypes) =>
    //   mediaTypes === `${mediaTypes},${type}`
    //     ? mediaTypes
    //     : `${mediaTypes},${type}`
    // );

    // onChange("files", `${files},${result}`);
    // onChange("mediaTypes", `${mediaTypes},${type}`);
    // console.log(files, mediaTypes);
  }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const path = convertFileToPath(selectedFile);

    setFiles((files) => [...files, selectedFile]);
    setPaths((paths) => [...paths, path]);
    onChange("files", [...files, selectedFile]);

    // if (selectedFile) {
    //   const type = selectedFile.type.startsWith("image/") ? "image" : "video";
    //   // setFile(selectedFile);
    //   // setMediaType(type);

    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     console.log("onloadend");
    //     // Read the content of the file and set it as the preview
    //     // const mediaType = selectedFile.type.startsWith("image/")
    //     //   ? "image"
    //     //   : "video";
    //     updateFile(reader.result, type);
    //     // setFiles((files) => `${files},${reader.result}`);
    //     // setMediaTypes((mediaTypes) => `${mediaTypes},${mediaType}`);

    //     // onChange("files", `${files},${reader.result}`);
    //     // onChange("mediaTypes", `${mediaTypes},${type}`);
    //   };

    //   // Read the file as a data URL (base64)
    //   reader.readAsDataURL(selectedFile);
    // }
  };
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  return (
    <li className="flex flex-col w-[300px] gap-2">
      <div className="w-full h-[250px] relative">
        <div
          className="w-full h-[250px] bg-cover bg-center flex flex-wrap"
          style={{
            backgroundImage: files.isEmpty
              ? "url(/images/img_placeholder.png)"
              : "",
          }}
          onClick={handleButtonClick}
        >
          {paths &&
            paths.map((path, index) => {
              return (
                <div
                  key={path}
                  className={`p-1 ${files.length < 3 ? "h-full" : "h-[50%]"} ${
                    files.length == 1 || (index === 2 && files.length === 3)
                      ? "w-full"
                      : "w-[50%]"
                  }`}
                >
                  <Image
                    src={path}
                    alt={`${index + 1} Image`}
                    width={250}
                    height={200}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              );
            })}
          {/* {files &&
            stringsToList(files).map((file, index) => (
              <div key={file} className="">
                <Image
                  src={files}
                  alt={`${files}_img`}
                  width={250}
                  height={200}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))} */}
          {/* {files &&
            (mediaType === "image" ? (
              <Image
                src={files}
                alt={`${files}_img`}
                width={250}
                height={200}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <video controls style={{ maxWidth: "100%", maxHeight: "300px" }}>
                <source src={files} type={file.type} />
                Your browser does not support the video tag.
              </video>
            ))} */}
          <input
            type="file"
            className="hidden w-full h-full"
            accept="image/*,video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        <div className="flex gap-5 absolute bottom-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-2xl font-bold">
          <MdAddCircleOutline onClick={handleButtonClick} />
          <MdOutlineEdit />
          <FiTrash />
        </div>
      </div>
      <div className="flex flex-col w-full gap-2">
        <input
          className="w-full font-bold text-md outline-none border-b-2 focus:border-blue-500 px-2 py-1"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onChange("name", e.target.value);
          }}
        />
        <input
          className="w-full text-sm outline-none border-b-2 focus:border-blue-500 px-2 py-1"
          placeholder="Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
            onChange("desc", e.target.value);
          }}
        />
        <div className="flex gap-2 items-center text-blue-500 font-bold text-sm">
          <input
            type="number"
            className="w-full text-blue-500 font-bold text-sm outline-none border-b-2 focus:border-blue-500 px-2 py-1"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              onChange("price", e.target.value);
            }}
          />

          <input
            type="number"
            className="w-full text-blue-500 font-bold text-sm outline-none border-b-2 focus:border-blue-500 px-2 py-1"
            placeholder="Discount Price"
            value={discPrice}
            onChange={(e) => {
              setDiscPrice(e.target.value);
              onChange("discPrice", e.target.value);
            }}
          />
          <AppButton
            outline={!negotiable}
            small={true}
            onClick={() => {
              setNegotiable(!negotiable);
              onChange("negotiable", !negotiable);
            }}
          >
            Negotiable
          </AppButton>
        </div>
      </div>
    </li>
  );
}
