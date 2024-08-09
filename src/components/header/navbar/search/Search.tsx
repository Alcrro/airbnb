import React from "react";
import "./search.scss";
import SearchButton from "./searchButton/SearchButton";
import { getSearchBar } from "@/_lib/navbar/search/getSearch";
import SearchTypesList from "./searchTypesList/SearchTypesList";
import { ISearchData } from "@/_lib/navbar/search/searchData";

export default async function Search() {
  const searchData = await getSearchBar();

  return (
    <div className="search-container">
      <div className="search">
        <div className="search-inner">
          <>
            {searchData.searchData.map((category: ISearchData) => (
              <SearchTypesList category={category} key={category.id} />
            ))}
          </>
        </div>
        <SearchButton />
      </div>
    </div>
  );
}
