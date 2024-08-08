"use client";
import React from "react";
import "./search.scss";
import { useNavbarContext } from "@/context/navbarContext/NavbarContext";

export default function Search() {
  const { isActive, setIsActive } = useNavbarContext();
  return (
    <div className="search-container">
      <div className="search">
        <div className="search-inner">
          <div className="where type">
            <div className="label-group">
              <label htmlFor="where">Where</label>
              <input type="text" placeholder="Search destination" disabled />
            </div>
          </div>

          {isActive === -1 || isActive === 0 ? (
            <>
              <div className="check-in type">
                <div className="label-group">
                  <label htmlFor="where">Check in</label>
                  <input type="text" placeholder="Add states" disabled />
                </div>
              </div>
              <div className="check-out type">
                <div className="label-group">
                  <label htmlFor="where">Check Out</label>
                  <input type="text" placeholder="Add states" disabled />
                </div>
              </div>
            </>
          ) : (
            <div className="experience type">
              <div className="label-group">
                <label htmlFor="where">People Experience</label>
                <input type="text" placeholder="People experiences" disabled />
              </div>
            </div>
          )}
          <div className="who-quest type">
            <div className="label-group">
              <label htmlFor="where">Who</label>
              <input type="text" placeholder="Add guests" disabled />
            </div>
          </div>
        </div>
        <div className="search-button"></div>
      </div>
    </div>
  );
}
