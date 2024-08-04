import React from "react";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import Search from "./searchBy/SearchBy";
import "./navbar.scss";

export default function Navbar() {
  return (
    <div className="nav navbar-main">
      <Logo />
      <Search />
      <Menu />
    </div>
  );
}
