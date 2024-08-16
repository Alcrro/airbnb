import React from "react";
import "./search.scss";
import SearchButton from "./searchButton/SearchButton";
import { getSearchBar } from "@/_lib/navbar/search/getSearch";
import SearchList from "./searchTypesList/SearchList";

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
