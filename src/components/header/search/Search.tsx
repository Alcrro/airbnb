import React from "react";
import "./search.scss";
export default function Search() {
  return (
    <div className="search">
      <div className="search-inner">
        <div className="where">
          <div className="label-group">
            <label htmlFor="where">Where</label>
            <input type="text" placeholder="Search destination" />
          </div>
        </div>
        <div className="check-in">
          <div className="label-group">
            <label htmlFor="where">Check in</label>
            <input type="text" placeholder="Add states" />
          </div>
        </div>
        <div className="check-out">
          <div className="label-group">
            <label htmlFor="where">Check Out</label>
            <input type="text" placeholder="Add states" />
          </div>
        </div>
        <div className="who-quest">
          <div className="label-group">
            <label htmlFor="where">Who</label>
            <input type="text" placeholder="Add guests" />
          </div>
        </div>

        <div className="search-button"></div>
      </div>
    </div>
  );
}
