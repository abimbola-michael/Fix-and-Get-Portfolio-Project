import Image from "next/image";
import React, { useRef, useState } from "react";
import { FiTrash } from "react-icons/fi";
import { MdAddCircleOutline, MdOutlineEdit } from "react-icons/md";

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
    <li className="flex flex-col w-64">
      <div className="w-64 h-56 relative">
        <div className="w-64 h-full" onClick={handleButtonClick}>
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

        <div className="flex gap-3 absolute top-3 right-3 rounded-full bg-gray-900/10 text-white p-2 text-lg font-bold">
          <MdAddCircleOutline />
          <MdOutlineEdit />
          <FiTrash />
        </div>
      </div>
      <div className="flex row justify-between items-start">
        <div className="grow flex flex-col">
          <input
            className="font-bold text-md outline-none border-b-2 focus:border-blue-500 px-2 py-1"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              onChange("name", e.target.value);
            }}
          />
          <input
            className="text-sm outline-none border-b-2 focus:border-blue-500 px-2 py-1"
            placeholder="Description"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
              onChange("desc", e.target.value);
            }}
          />
        </div>
        <input
          className="shrink-0 text-blue-500 font-bold text-lg outline-none border-b-2 focus:border-blue-500 px-2 py-1"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            onChange("price", e.target.value);
          }}
        />
      </div>
    </li>
  );
}
