"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./imagesRoom.scss";
import FallbackImage from "./FallbackImage";

export default function ImagesRoom({ item }: { item: any }) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="image">
      {!imageError ? (
        <Image
          src={item.images}
          alt="room"
          width={1000}
          height={1000}
          onError={() => setImageError(true)}
        ></Image>
      ) : (
        <FallbackImage />
      )}
    </div>
  );
}
