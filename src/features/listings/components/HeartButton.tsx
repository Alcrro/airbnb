"use client";
import React, { useState } from "react";

export default function HeartButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      className={`room-card__heart${saved ? " room-card__heart--saved" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        setSaved((prev) => !prev);
      }}
      aria-label="Save to wishlist"
    >
      <i className={`bi ${saved ? "bi-heart-fill" : "bi-heart"}`} />
    </button>
  );
}
