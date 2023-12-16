"use client";
import React, { useEffect, useState } from "react";
import pdfjs from "pdfjs-dist";
import Image from "next/image";

export default function PdfThumbnail({ file, url }) {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (file) {
      generateThumbnail(file).then(setThumbnail);
    } else if (url) {
      setThumbnail(url);
    }
  }, [file, url]);

  async function generateThumbnail(file) {
    const fileReader = new FileReader();

    const loadingTask = pdfjs.getDocument({ data: await file.arrayBuffer() });

    return loadingTask.promise.then(async (pdf) => {
      const page = await pdf.getPage(1); // Get the first page
      const viewport = page.getViewport({ scale: 0.5 }); // Adjust scale as needed
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      return canvas.toDataURL("image/png");
    });
  }
  return (
    <div className="w-full h-full">
      <Image
        src={thumbnail}
        alt="PDF Thumbnail"
        style={{ maxWidth: "100%" }}
        width={200}
        height={150}
        className="object-cover rounded-lg"
      />
    </div>
  );
}
