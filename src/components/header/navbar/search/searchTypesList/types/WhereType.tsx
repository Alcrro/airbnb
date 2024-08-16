"use client";
import { ISearchData } from "@/_lib/navbar/search/searchData";
import React, { useEffect, useRef } from "react";

import { useNavbarContext } from "@/context/navbarContext/NavbarContext";
import WhereTabs from "../../tabs/WhereTabs";

export default function WhereType({ category }: { category: ISearchData }) {
  const { isActive, indexNavbarType, setIndexNavbarType } = useNavbarContext();

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIndexNavbarType((prev) => (prev = -1));
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div
      className={`${category.category} type relative ${
        indexNavbarType === category.id ? "active" : ""
      }`}
      onClick={() => setIndexNavbarType((prev) => (prev = category.id))}
      ref={wrapperRef}
    >
      <div className="label-group">
        <label htmlFor="where">{category.name}</label>
        <span>Search destination</span>
        <input type="text" placeholder="Search destination" hidden />
      </div>
      {indexNavbarType === category.id ? <WhereTabs /> : null}
    </div>
  );
}
