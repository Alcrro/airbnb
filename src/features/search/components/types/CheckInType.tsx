"use client";
import { ISearchData } from "@/features/search/lib/searchData";
import React from "react";
import CheckInTabs from "../tabs/CheckInTabs";
import { useNavbarContext } from "@/shared/context/NavbarContext";

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function CheckInType({ category }: { category: ISearchData }) {
  const { indexNavbarType, setIndexNavbarType, checkIn } = useNavbarContext();

  return (
    category.category === "check-in" && (
      <div className="relative">
        <div
          className={`${category.category} type`}
          onClick={() => setIndexNavbarType(category.id)}
        >
          <div className="label-group">
            <label htmlFor="check-in">{category.name}</label>
            <span>{formatDate(checkIn) || "Add dates"}</span>
          </div>
          {indexNavbarType === category.id && <CheckInTabs />}
        </div>
      </div>
    )
  );
}
