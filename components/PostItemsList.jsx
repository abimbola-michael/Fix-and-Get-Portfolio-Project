import React, { useRef } from "react";
import PostInputItem from "./PostInputItem";
import AppButton from "./AppButton";

export default function PostItemsList({ items, setItems }) {
  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Read the content of the file and set it as the source for image or video
        // if (selectedFile.type.startsWith("image/")) {
        //   imageRef.current.src = reader.result;
        // } else if (selectedFile.type.startsWith("video/")) {
        //   videoRef.current.src = reader.result;
        // }
        const mediaType = selectedFile.type.startsWith("image/")
          ? "image"
          : "video";
        setItems((items) => [
          items,
          {
            name: "",
            desc: "",
            price: "",
            discPrice: "",
            negotiable: "",
            files: reader.result,
            mediaTypes: mediaType,
          },
        ]);
      };

      // Read the file as a data URL (base64)
      reader.readAsDataURL(selectedFile);
    }
  };
  function updateItem(type, value, index) {
    setItems((items) =>
      items.map((item, i) => (index === i ? { ...item, [type]: value } : item))
    );
  }
  return (
    <div className="flex flex-col w-full items-start">
      <ul className="flex gap-3 mb-2 overflow-y-auto">
        {items.map((item, index) => (
          <PostInputItem
            key={index}
            item={item}
            onChange={(type, value) => updateItem(type, value, index)}

            // onChangeDesc={(v) => updateItem(v, item)}
            // onChangeName={(v) => updateItem(v, item)}
            // onChangePrice={(v) => updateItem(v, item)}
            // onChangeDiscPrice={(v) => updateItem(v, item)}
            // onChangeFiles={(v) => updateItem(v, item)}
            // onChangeMediaTypes={(v) => updateItem(v, item)}
          />
        ))}
      </ul>
      <input
        type="file"
        accept="image/*,video/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <AppButton outline={true} onClick={handleButtonClick}>
        Add
      </AppButton>
    </div>
  );
}
