import { ISearchData } from "@/_lib/navbar/search/searchData";
import React from "react";

export default function CheckInType({ category }: { category: ISearchData }) {
  return (
    <div className={`${category.category} type`}>
      <div className="label-group">
        <label htmlFor="check-in">{category.name}</label>
        <input type="text" placeholder="Search destination" disabled />
      </div>
    </div>
  );
}
