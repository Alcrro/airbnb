import { ISearchData } from "@/_lib/navbar/search/searchData";
import React from "react";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";
import WhereType from "./WhereType";
import WhereTabs from "../../tabs/WhereTabs";

export default function ModelWhereType({
  category,
}: {
  category: ISearchData;
}) {
  const { indexNavbarType } = useNavbarContext();

  return (
    category.category === "where" && (
      <WhereType category={category}>
        <div className="label-group">
          <label htmlFor="where">{category.name}</label>
          <span>Search destination</span>
          <input type="text" placeholder="Search destination" hidden />
        </div>
        {indexNavbarType === category.id ? <WhereTabs /> : null}
      </WhereType>
    )
  );
}
