import React from "react";

import "./menu.scss";
import DarkThemeButton from "./DarkThemeButton";
import DropdownMenu from "../dropdownMenu/DropdownMenu";
import Profile from "@/components/user/profile/Profile";
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
