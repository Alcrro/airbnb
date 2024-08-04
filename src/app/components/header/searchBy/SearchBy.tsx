"use client";
import React, { useState } from "react";
import "./searchBy.scss";
export default function Search() {
  const [active, setActive] = useState(0);

  const searchArray = ["stays", "Experience by"];
  return (
    <div className="search-by">
      <ul>
        {searchArray.map((search: string, key) => (
          <li
            key={key}
            className={`stays${active === key ? " active" : ""}`}
            onClick={() => setActive((prev) => (prev === 0 ? 1 : 0))}
          >
            {search}
          </li>
        ))}
      </ul>
    </div>
  );
}
