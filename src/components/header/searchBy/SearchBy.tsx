"use client";
import React, { useState } from "react";
import "./searchBy.scss";
import Link from "next/link";
export default function SearchBy() {
  const [active, setActive] = useState(0);

  const searchArray = ["stays", "Experience"];
  return (
    <div className="search-by">
      <ul>
        {searchArray.map((search: string, key) => (
          <li
            key={key}
            className={`stays${active === key ? " active" : ""}`}
            onClick={() => setActive((prev) => (prev === 0 ? 1 : 0))}
          >
            <Link href={`/search-by/${search.toLocaleLowerCase()}`}>
              {search}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
