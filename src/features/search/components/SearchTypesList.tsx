"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import { useWidth } from "@/shared/context/WidthContext";
import React from "react";
import Stays from "./stays/Stays";
import Experience from "./experience/Experience";

export default function SearchTypesList({ category }: { category: ISearchData }) {
  const { isActive } = useNavbarContext();
  const { width } = useWidth();

  return isActive < 1 ? (
    <Stays category={category} />
  ) : (
    isActive >= 1 && <Experience category={category} />
  );
}
