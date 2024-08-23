"use client";
import { ISearchData } from "@/_lib/navbar/search/searchData";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";
import { useWidth } from "@/context/width/WidthContext";
import React from "react";

import Stays from "../stays/Stays";
import Experience from "../experience/Experience";

export default function SearchTypesList({
  category,
}: {
  category: ISearchData;
}) {
  const { isActive } = useNavbarContext();
  const { width } = useWidth();

  return isActive < 1 ? (
    <Stays category={category} />
  ) : (
    isActive >= 1 && <Experience category={category} />
  );
}
