"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import React from "react";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import ExperienceTabs from "../tabs/ExperienceTabs";

export default function ExperienceType({ category }: { category: ISearchData }) {
  const { indexNavbarType, setIndexNavbarType, experienceQuery } = useNavbarContext();

  const label = experienceQuery.length === 0
    ? "Search by other people experience"
    : experienceQuery.length === 1
      ? experienceQuery[0]
      : `${experienceQuery[0]} +${experienceQuery.length - 1} more`;

  return (
    category.category === "experience" && (
      <div
        className={`${category.category} type`}
        onClick={() => setIndexNavbarType(category.id)}
      >
        <div className="label-group">
          <label htmlFor="experience">{category.name}</label>
          <span>{label}</span>
        </div>
        {indexNavbarType === category.id && <ExperienceTabs />}
      </div>
    )
  );
}
