import React from "react";
import "./search.scss";

export default function Search({ params }: { params: any }) {
  return (
    <div className="search">
      <div className="search-inner">
        <div className="where type">
          <div className="label-group">
            <label htmlFor="where">Where</label>
            <input type="text" placeholder="Search destination" disabled />
          </div>
        </div>
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
        <div className="who-quest type">
          <div className="label-group">
            <label htmlFor="where">Who</label>
            <input type="text" placeholder="Add guests" disabled />
          </div>
        </div>

        <div className="search-button"></div>
      </div>
    </div>
  );
}
