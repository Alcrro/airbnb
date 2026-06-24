"use client";
import Link from "next/link";
import React from "react";
import "./filterItem.scss";
import { useSearchParams } from "next/navigation";

const PROPERTY_ICONS: Record<string, string> = {
  Campsite: "bi-tree",
  "Nature lodge": "bi-tree-fill",
  Apartment: "bi-building",
  Boat: "bi-water",
  "Earth house": "bi-globe",
  Hut: "bi-house",
  Guesthouse: "bi-door-open",
  "Boutique hotel": "bi-stars",
  Hostel: "bi-people",
  Villa: "bi-house-fill",
  Resort: "bi-sun",
  House: "bi-house-door",
  Aparthotel: "bi-building-fill",
  "Guest suite": "bi-door-open",
  "Bed and breakfast": "bi-cup-hot",
  Treehouse: "bi-tree",
  "Farm stay": "bi-flower1",
  Chalet: "bi-house",
  Houseboat: "bi-water",
  Cabin: "bi-house",
  Townhouse: "bi-houses",
  "Tiny house": "bi-house-heart",
  "Camper/RV": "bi-truck",
  "Pension (South Korea)": "bi-building",
  "Serviced apartment": "bi-building",
  Bungalow: "bi-house-door",
  Condominium: "bi-building",
  Train: "bi-train-front-fill",
  Other: "bi-three-dots",
  "Casa particular (Cuba)": "bi-house",
  Hotel: "bi-building-fill",
  Cottage: "bi-house-door",
  Castle: "bi-bank",
  Loft: "bi-columns-gap",
  "Heritage hotel (India)": "bi-bank2",
  Barn: "bi-house",
};

export default function LiTypes({
  propTypes,
}: {
  propTypes: { _id: string; property_type: string };
}) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type");
  const currentLocation = searchParams.get("location");
  const isActive = currentType === propTypes.property_type;
  const icon = PROPERTY_ICONS[propTypes.property_type] ?? "bi-house";

  const params = new URLSearchParams();
  if (currentLocation) params.set("location", currentLocation);
  if (!isActive) params.set("type", propTypes.property_type);

  const href = `/?${params.toString()}`;

  return (
    <li className={`filter-item${isActive ? " filter-item--active" : ""}`}>
      <Link href={href} className="filter-item__link">
        <i className={`bi ${icon}`} />
        <span>{propTypes.property_type}</span>
      </Link>
    </li>
  );
}
