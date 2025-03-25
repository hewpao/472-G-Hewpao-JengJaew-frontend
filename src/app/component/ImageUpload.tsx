"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import DOMPurify from "dompurify";

interface ImageUploadProps {
  maxImages?: number;
  images: File[];
  onImagesChange: (images: File[]) => void;
}

const ImageUpload = ({
  maxImages = 15,
  images,
  onImagesChange,
}: ImageUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const remainingSlots = maxImages - images.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const processedFiles = filesToAdd.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) }),
      );

      const updatedImages = [...images, ...processedFiles];
      onImagesChange(updatedImages);
    },
    [images, maxImages, onImagesChange],
  );

  const handleRemoveImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: maxImages,
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Upload Product Photos
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-4 hover:border-primary ${isDragActive ? "border-primary" : "border-gray-300"}`}
      >
        <input {...getInputProps()} />
        <p className="text-center text-gray-500">
          {isDragActive
            ? "Drop the files here ..."
            : "Click or drag & drop files here"}
        </p>
      </div>

      {/* Show Uploaded Images */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((file, index) => (
          <div
            key={index}
            className="relative w-[150px] h-[150px] border border-gray-300 rounded-md overflow-hidden"
          >
            <Image
              src={DOMPurify.sanitize(URL.createObjectURL(file))}
              alt={`Preview ${index + 1}`}
              width={180}
              height={180}
              className="w-full h-full object-cover transition-opacity hover:opacity-75"
            />

            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 bg-white text-gray-600 rounded-full w-6 h-6 flex items-center justify-center text-xl hover:bg-gray-100"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mt-2">
        {images.length}/{maxImages} images uploaded
      </p>
    </div>
  );
};

export default ImageUpload;
