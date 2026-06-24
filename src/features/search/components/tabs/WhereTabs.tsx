"use client";
import React, { useEffect, useRef, useState } from "react";
import ModalType from "./ModalType";
import "./whereTabs.scss";
import { useNavbarContext } from "@/shared/context/NavbarContext";

export default function WhereTabs() {
  const { setSearchLocation, setIndexNavbarType } = useNavbarContext();
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    fetch("/api/navbar-filters")
      .then(r => r.json())
      .then(data => {
        const values: string[] = data.countryFilter?.[0]?.uniqueValues ?? [];
        setLocations(values);
      })
      .catch(() => {});
  }, []);

  const filtered = locations
    .filter(l => query === "" || l.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 8);

  const select = (loc: string) => {
    setSearchLocation(loc);
    setIndexNavbarType(1);
  };

  return (
    <ModalType>
      <div className="where-tabs">
        <div className="where-search" onClick={e => e.stopPropagation()}>
          <i className="bi bi-search" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search destinations"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {filtered.length > 0 && (
          <ul className="where-list">
            {filtered.map(loc => (
              <li
                key={loc}
                className="where-item"
                onClick={(e) => { e.stopPropagation(); select(loc); }}
              >
                <i className="bi bi-geo-alt" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>
        )}
        {filtered.length === 0 && query && (
          <p className="where-empty">No destinations found</p>
        )}
      </div>
    </ModalType>
  );
}
