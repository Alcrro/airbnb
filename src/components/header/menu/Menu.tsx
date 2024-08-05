import React from "react";
import Profile from "../../user/profile/Profile";
import "./menu.scss";
export default function Menu() {
  return (
    <div className="navbar-menu">
      <div className="dropdown-menu-icon"></div>
      <Profile />
    </div>
  );
}
