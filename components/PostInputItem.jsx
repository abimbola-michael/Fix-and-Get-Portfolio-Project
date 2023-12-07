import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAddCircleOutline, MdOutlineEdit } from "react-icons/md";
import AppButton from "./AppButton";

export default function PostInputItem({ item, onChange }) {
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState("image");

  const [files, setFiles] = useState(item.files);
  const [mediaTypes, setTypes] = useState(item.mediaTypes);

  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.desc);
  const [price, setPrice] = useState(item.price);
  const [discPrice, setDiscPrice] = useState(item.discPrice);
  const [negotiable, setNegotiable] = useState(item.negotiable);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const type = selectedFile.type.startsWith("image/") ? "image" : "video";
      setFile(selectedFile);
      setMediaType(type);

      const reader = new FileReader();

      reader.onloadend = () => {
        // Read the content of the file and set it as the preview
        // const mediaType = selectedFile.type.startsWith("image/")
        //   ? "image"
        //   : "video";
        setFiles(reader.result);
        onChange("files", reader.result);
        onChange("mediaTypes", mediaType);
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  return (
    <li className="flex flex-col w-[300px] gap-2">
      <div className="w-full h-[250px] relative">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url(/images/img_placeholder.png)" }}
          onClick={handleButtonClick}
        >
          {files &&
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
            ))}
          <input
            type="file"
            className="hidden w-full h-full"
            accept="image/*,video/*"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        <div className="flex gap-5 absolute bottom-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-2xl font-bold">
          <MdAddCircleOutline />
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
        <div className="flex gap-2 items-center">
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
