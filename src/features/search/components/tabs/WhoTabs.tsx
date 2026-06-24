"use client";
import React from "react";
import ModalType from "./ModalType";
import "./whoTabs.scss";
import { useNavbarContext } from "@/shared/context/NavbarContext";

type GuestKey = "adults" | "children" | "infants";

const ROWS: { label: string; description: string; key: GuestKey }[] = [
  { label: "Adults", description: "Ages 13 or above", key: "adults" },
  { label: "Children", description: "Ages 2–12", key: "children" },
  { label: "Infants", description: "Under 2", key: "infants" },
];

export default function WhoTabs() {
  const { guests, setGuests, setIndexNavbarType } = useNavbarContext();

  const update = (key: GuestKey, delta: number) => {
    setGuests(prev => ({ ...prev, [key]: Math.max(0, prev[key] + delta) }));
  };

  return (
    <ModalType>
      <div className="who-tabs">
        {ROWS.map(row => (
          <div key={row.key} className="guest-row">
            <div className="guest-info">
              <div className="guest-label">{row.label}</div>
              <div className="guest-desc">{row.description}</div>
            </div>
            <div className="guest-controls">
              <button
                className="guest-btn"
                onClick={(e) => { e.stopPropagation(); update(row.key, -1); }}
                disabled={guests[row.key] <= 0}
              >
                −
              </button>
              <span className="guest-count">{guests[row.key]}</span>
              <button
                className="guest-btn"
                onClick={(e) => { e.stopPropagation(); update(row.key, 1); }}
              >
                +
              </button>
            </div>
          </div>
        ))}
        <button
          className="who-done-btn"
          onClick={(e) => { e.stopPropagation(); setIndexNavbarType(-1); }}
        >
          Done
        </button>
      </div>
    </ModalType>
  );
}
