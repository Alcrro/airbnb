"use client";
import { ISearchData } from "@/_lib/navbar/search/searchData";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";
import { useWidth } from "@/context/width/WidthContext";

import React from "react";
import WhereType from "./types/WhereType";
import CheckInType from "./types/CheckInType";
import CheckOnType from "./types/CheckOnType";

export default function SearchTypesList({
  category,
}: {
  category: ISearchData;
}) {
  const { isActive } = useNavbarContext();
  const { width } = useWidth();

  return isActive < 1 ? (
    category.category === "where" ? (
      <WhereType category={category} />
    ) : category.category === "check-in" ? (
      <div className="">
        <CheckInType category={category} />
      </div>
    ) : category.category === "check-out" ? (
      <div className="">
        <CheckOnType category={category} />
      </div>
    ) : category.category === "who-guest" ? (
      <div className="">
        <CheckOnType category={category} />
      </div>
    ) : null
  ) : (
    isActive >= 1 &&
      category.category !== "check-in" &&
      category.category !== "check-out" && (
        <div className={`${category.category} type`}>
          <div className="label-group">
            <label htmlFor="where">{category.name}</label>
            <input type="text" placeholder="Search destination" disabled />
          </div>
        </div>
      )
  );
}
