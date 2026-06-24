"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import React, { useEffect, useRef } from "react";
import SearchTypesList from "./SearchTypesList";
import { useNavbarContext } from "@/shared/context/NavbarContext";

export default function SearchList({ searchData }: { searchData: [] }) {
  const { setIndexNavbarType } = useNavbarContext();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIndexNavbarType(-1);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [setIndexNavbarType]);

  return (
    <div ref={containerRef} style={{ display: "contents" }}>
      {searchData.map((category: ISearchData) => (
        <SearchTypesList category={category} key={category.id} />
      ))}
    </div>
  );
}
