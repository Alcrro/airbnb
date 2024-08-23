"use client";
import { ISearchData } from "@/_lib/navbar/search/searchData";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";
import React from "react";
import CheckOutTabs from "../../tabs/CheckOutTabs";

export default function CheckInType({ category }: { category: ISearchData }) {
  const { isActive, indexNavbarType, setIndexNavbarType } = useNavbarContext();

  return (
    category.category === "check-out" && (
      <div className="relative">
        <div
          className={`${category.category} type `}
          onClick={() => setIndexNavbarType((prev) => (prev = category.id))}
        >
          <div className="label-group">
            <label htmlFor="check-out">{category.name}</label>
            <span>Add guests</span>
            <input type="text" placeholder="Search destination" hidden />
          </div>
          {indexNavbarType === category.id ? <CheckOutTabs /> : null}
        </div>
      </div>
    )
  );
}
