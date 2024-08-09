import { ISearchData } from "@/_lib/navbar/search/searchData";
import React from "react";

export default function WhereType({ category }: { category: ISearchData }) {
  return (
    <div className={`${category.category} type`}>
      <div className="label-group">
        <label htmlFor="where">{category.name}</label>
        <input type="text" placeholder="Search destination" disabled />
      </div>
    </div>
  );
}
