"use client";
import React, { useState } from "react";
import Image from "next/image";
import FallbackImage from "./FallbackImage";
import { Room } from "@/features/listings/types/room";

export default function ImagesRoom({ item }: { item: Pick<Room, "images" | "name"> }) {
  const [imageError, setImageError] = useState(false);
  const src = typeof item.images === "string"
    ? item.images || null
    : item.images?.xl_picture_url || item.images?.picture_url || item.images?.medium_url || item.images?.thumbnail_url || null;

  if (!src || imageError) return <FallbackImage />;

  return (
    <Image
      src={src}
      alt={item.name ?? "room"}
      fill
      style={{ objectFit: "cover" }}
      onError={() => setImageError(true)}
      sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 25vw"
    />
  );
}
