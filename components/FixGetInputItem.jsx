import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAddCircleOutline, MdOutlineEdit } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";

import AppButton from "./AppButton";
import { convertFileToPath, stringsToList } from "@/utils/helpers";

export default function FixGetInputItem({ item, index, onChange }) {
  const fileInputRef = useRef(null);

  // const [file, setFile] = useState(null);
  // const [mediaType, setMediaType] = useState("image");

  //const [files, setFiles] = useState(item.files);
  const [paths, setPaths] = useState(item.paths);

  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.desc);
  const [price, setPrice] = useState(item.price);
  const [discPrice, setDiscPrice] = useState(item.discPrice);
  const [negotiable, setNegotiable] = useState(item.negotiable);

  function removeFile(index) {
    //const newFiles = [...files];
    const newPaths = [...paths];
    //newFiles.splice(index, 1);
    newPaths.splice(index, 1);
    //setFiles(newFiles);
    setPaths(newPaths);
    onChange("paths", newPaths);
  }
  function replaceFile(index, file) {
    //const newFiles = [...files];
    const newPaths = [...paths];
    //newFiles[index] = file;
    newPaths[index] = convertFileToPath(file);
    //setFiles(newFiles);
    setPaths(newPaths);
    onChange("paths", newPaths);
  }

  const handleFileChange = (event) => {
    //const selectedFile = event.target.files[0];
    //const path = convertFileToPath(selectedFile);

    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.isEmpty) return;

    const selectedPaths = selectedFiles.map((file) => convertFileToPath(file));

    //const newFiles = [...files, ...selectedFiles];
    const newPaths = [...paths, ...selectedPaths];

    //setFiles(newFiles);
    onChange("paths", newPaths);
    setPaths(newPaths);
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
            backgroundImage:
              paths.length === 0 ? "url(/images/img_placeholder.png)" : "",
          }}
        >
          {paths &&
            paths.map((path, index) => {
              return (
                <div
                  key={path}
                  className={`relative p-1 ${
                    paths.length < 3 ? "h-full" : "h-[50%]"
                  } ${
                    paths.length == 1 || (index === 2 && paths.length === 3)
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
                    onClick={handleButtonClick}
                  />
                  <IoMdCloseCircle
                    className="absolute top-3 right-3 text-gray-100 text-xl"
                    onClick={() => removeFile(index)}
                  />
                </div>
              );
            })}

          <input
            type="file"
            className="hidden w-full h-full"
            accept="image/*,video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            multiple={true}
          />
        </div>

        <div className="flex gap-5 absolute bottom-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-2xl font-bold">
          <MdAddCircleOutline onClick={handleButtonClick} />
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
