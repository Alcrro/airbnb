"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  name: string;
}

export default function HostAvatar({ src, name }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return <i className="bi bi-person-fill" />;
  }

  return (
    <Image
      src={src}
      alt={name}
      width={56}
      height={56}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      onError={() => setError(true)}
    />
  );
}
