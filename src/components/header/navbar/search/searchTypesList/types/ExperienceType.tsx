import { ISearchData } from "@/_lib/navbar/search/searchData";
import React from "react";

export default function ExperienceType({
  category,
}: {
  category: ISearchData;
}) {
  return (
    category.category === "experience" && (
      <div className={`${category.category} type`}>
        <div className="label-group">
          <label htmlFor="experience">{category.name}</label>
          <span>Search by other people experience</span>
          <input type="text" placeholder="Search destination" hidden />
        </div>
      </div>
    )
  );
}
