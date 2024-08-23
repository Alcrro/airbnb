"use client";
import { ISearchData } from "@/_lib/navbar/search/searchData";
import React from "react";
import CheckInTabs from "../../tabs/CheckInTabs";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";
import ModalType from "../../tabs/ModalType";

export default function CheckInType({ category }: { category: ISearchData }) {
  const { isActive, indexNavbarType, setIndexNavbarType } = useNavbarContext();

  return (
    category.category === "check-in" && (
      <div className="relative">
        <div
          className={`${category.category} type`}
          onClick={() => setIndexNavbarType((prev) => (prev = category.id))}
        >
          <div className="label-group">
            <label htmlFor="check-in">{category.name}</label>
            <span>Add dates</span>
            <input type="text" placeholder="Search destination" hidden />
          </div>

          {indexNavbarType === category.id && <CheckInTabs />}
        </div>
      </div>
    )
  );
}
