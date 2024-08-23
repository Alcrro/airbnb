"use client";
import { ISearchData } from "@/_lib/navbar/search/searchData";
import React, { useEffect, useRef } from "react";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";

export default function WhereType({
  children,
  category,
}: {
  children: React.ReactNode;
  category: ISearchData;
}) {
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
      {children}
    </div>
  );
}
