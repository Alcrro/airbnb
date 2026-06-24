import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import SearchBy from "./SearchBy";
import "./navbar.scss";
import Search from "@/features/search/components/Search";

export default function Navbar() {
  return (
    <div className="nav navbar-main">
      <div className="navbar-inner">
        <Logo />
        <SearchBy />
        <Menu />
        <Search />
      </div>
    </div>
  );
}
