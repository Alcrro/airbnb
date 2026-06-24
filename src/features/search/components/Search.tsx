import React from "react";
import "./search.scss";
import SearchButton from "@/shared/components/SearchButton";
import { getSearchBar } from "@/features/search/lib/getSearch";
import SearchList from "./SearchList";

export default async function Search() {
  const { searchData } = await getSearchBar();

  return (
    <div className="search-container">
      <div className="search">
        <div className="search-inner">
          <SearchList searchData={searchData} />
        </div>
        <SearchButton />
      </div>
    </div>
  );
}
