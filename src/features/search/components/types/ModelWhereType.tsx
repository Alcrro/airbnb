"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import React from "react";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import WhereType from "./WhereType";
import WhereTabs from "../tabs/WhereTabs";

export default function ModelWhereType({ category }: { category: ISearchData }) {
  const { indexNavbarType, searchLocation } = useNavbarContext();

  return (
    category.category === "where" && (
      <WhereType category={category}>
        <div className="label-group">
          <label htmlFor="where">{category.name}</label>
          <span>{searchLocation || "Search destination"}</span>
        </div>
        {indexNavbarType === category.id ? <WhereTabs /> : null}
      </WhereType>
    )
  );
}
