"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import React from "react";
import { useNavbarContext } from "@/shared/context/NavbarContext";

export default function WhereType({
  children,
  category,
}: {
  children: React.ReactNode;
  category: ISearchData;
}) {
  const { indexNavbarType, setIndexNavbarType } = useNavbarContext();

  return (
    <div
      className={`${category.category} type relative ${
        indexNavbarType === category.id ? "active" : ""
      }`}
      onClick={(e) => { e.stopPropagation(); setIndexNavbarType(category.id); }}
    >
      {children}
    </div>
  );
}
