"use client";
import React, { useState } from "react";

const AMENITY_ICONS: Record<string, string> = {
  Internet: "bi-wifi",
  Wifi: "bi-wifi",
  Kitchen: "bi-cup-hot",
  TV: "bi-tv",
  "Cable TV": "bi-tv",
  "Air conditioning": "bi-wind",
  Heating: "bi-thermometer-half",
  Washer: "bi-moisture",
  Dryer: "bi-wind",
  "Free parking on premises": "bi-p-square",
  "Free Parking on Premises": "bi-p-square",
  Pool: "bi-water",
  "Hot tub": "bi-droplet-half",
  Gym: "bi-bicycle",
  Elevator: "bi-arrow-up-square",
  "Pets allowed": "bi-heart",
  "Laptop friendly workspace": "bi-laptop",
  "Coffee maker": "bi-cup",
  Shampoo: "bi-droplet",
  Iron: "bi-fire",
  "Hair dryer": "bi-wind",
  "Smoke detector": "bi-bell",
  "Carbon monoxide detector": "bi-exclamation-triangle",
  "First aid kit": "bi-plus-circle",
  Hangers: "bi-bag",
};

const LIMIT = 12;

export default function AmenitiesExpand({ amenities }: { amenities: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? amenities : amenities.slice(0, LIMIT);

  return (
    <>
      <div className="room-detail__amenities-grid">
        {shown.map((a) => (
          <div key={a} className="room-detail__amenity">
            <i className={`bi ${AMENITY_ICONS[a] ?? "bi-check-circle"}`} />
            <span>{a}</span>
          </div>
        ))}
      </div>
      {amenities.length > LIMIT && (
        <button className="room-detail__show-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : `Show all ${amenities.length} amenities`}
        </button>
      )}
    </>
  );
}
