"use client";
import React from "react";
import ModalType from "./ModalType";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import "./experienceTabs.scss";

const EXPERIENCES = [
  { label: "Yoga",              icon: "bi-person-arms-up" },
  { label: "Cooking class",     icon: "bi-egg-fried" },
  { label: "Surfing",           icon: "bi-water" },
  { label: "Hiking",            icon: "bi-tree" },
  { label: "Photography",       icon: "bi-camera" },
  { label: "Wine tasting",      icon: "bi-cup-hot" },
  { label: "City tour",         icon: "bi-map" },
  { label: "Art workshop",      icon: "bi-palette" },
  { label: "Meditation",        icon: "bi-flower1" },
  { label: "Kayaking",          icon: "bi-tsunami" },
  { label: "Dance class",       icon: "bi-music-note-beamed" },
  { label: "Cycling tour",      icon: "bi-bicycle" },
  { label: "Pottery",           icon: "bi-brush" },
  { label: "Snorkeling",        icon: "bi-droplet" },
  { label: "Food tour",         icon: "bi-shop" },
  { label: "Fitness class",     icon: "bi-trophy" },
];

export default function ExperienceTabs() {
  const { experienceQuery, setExperienceQuery, setIndexNavbarType } = useNavbarContext();

  const toggle = (label: string) => {
    setExperienceQuery(prev =>
      prev.includes(label) ? prev.filter(e => e !== label) : [...prev, label]
    );
  };

  return (
    <ModalType>
      <div className="experience-tabs" onClick={e => e.stopPropagation()}>
        <div className="experience-tabs__header">
          <p className="experience-tabs__title">Select experiences</p>
          {experienceQuery.length > 0 && (
            <button className="experience-tabs__clear" onClick={() => setExperienceQuery([])}>
              Clear all
            </button>
          )}
        </div>
        <div className="experience-grid">
          {EXPERIENCES.map(exp => {
            const selected = experienceQuery.includes(exp.label);
            return (
              <button
                key={exp.label}
                className={`experience-card${selected ? " selected" : ""}`}
                onClick={() => toggle(exp.label)}
              >
                <i className={`bi ${exp.icon}`} />
                <span>{exp.label}</span>
                {selected && <i className="bi bi-check-circle-fill experience-card__check" />}
              </button>
            );
          })}
        </div>
        <div className="experience-tabs__footer">
          <button
            className="experience-tabs__done"
            onClick={() => setIndexNavbarType(-1)}
          >
            {experienceQuery.length > 0
              ? `Done (${experienceQuery.length} selected)`
              : "Done"}
          </button>
        </div>
      </div>
    </ModalType>
  );
}
