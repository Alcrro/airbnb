import React from "react";
import Logo from "./logo/Logo";
import Menu from "./menu/Menu";
import SearchBy from "./searchBy/SearchBy";
import "./navbar.scss";
import Search from "./search/Search";

export default function Navbar() {
  return (
    <div className="nav navbar-main">
      <Logo />
      <SearchBy />
      <Menu />
      <Search />
    </div>
  );
}
