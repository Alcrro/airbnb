"use client";
import React from "react";
import "./searchBy.scss";
import { useNavbarContext } from "@/shared/context/NavbarContext";

export default function SearchBy() {
  const { isActive, setIsActive } = useNavbarContext();

  const searchedBy = (key: number) => setIsActive(() => key);

  const searchArray = ["stays", "Experience"];
  return (
    <div className="search-by">
      <ul>
        {searchArray.map((search: string, key) => (
          <li
            key={key}
            className={`stays${isActive === key ? " active" : ""}`}
            onClick={() => searchedBy(key)}
          >
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
}
