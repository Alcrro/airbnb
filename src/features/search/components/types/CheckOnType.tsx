"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import React from "react";
import CheckOutTabs from "../tabs/CheckOutTabs";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function CheckOnType({ category }: { category: ISearchData }) {
  const { indexNavbarType, setIndexNavbarType, checkOut } = useNavbarContext();

  return (
    category.category === "check-out" && (
      <div className="relative">
        <div
          className={`${category.category} type`}
          onClick={() => setIndexNavbarType(category.id)}
        >
          <div className="label-group">
            <label htmlFor="check-out">{category.name}</label>
            <span>{formatDate(checkOut) || "Add dates"}</span>
          </div>
          {indexNavbarType === category.id ? <CheckOutTabs /> : null}
        </div>
      </div>
    )
  );
}
