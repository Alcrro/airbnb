"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import React from "react";
import WhoTabs from "../tabs/WhoTabs";

export default function WhoType({ category }: { category: ISearchData }) {
  const { indexNavbarType, setIndexNavbarType, guests } = useNavbarContext();

  const total = guests.adults + guests.children + guests.infants;
  const label = total > 0 ? `${total} guest${total > 1 ? "s" : ""}` : "Add guests";

  return (
    category.category === "who-guest" && (
      <div
        className={`${category.category} type`}
        onClick={() => setIndexNavbarType(category.id)}
      >
        <div className="label-group">
          <label htmlFor="who">{category.name}</label>
          <span>{label}</span>
        </div>
        {indexNavbarType === category.id ? <WhoTabs /> : null}
      </div>
    )
  );
}
