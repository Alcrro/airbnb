import React from "react";
import Profile from "../../user/profile/Profile";
import "./menu.scss";
import DarkThemeButton from "./DarkThemeButton";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
export default function Menu() {
  return (
    <div className="navbar-menu relative">
     
        <div className="dropdown-menu-icon"></div>
        <Profile />
        <DarkThemeButton />
      
      <DropdownMenu />
    </div>
  );
}
