import React from "react";
import "./dropdownMenu.scss";
import Link from "next/link";

export default function DropdownMenu() {
  return (
    <div className="dropdown-menu absolute">
      <div className="dropdown-menu-inner">
        <div className="auth-container">
          <ul>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/singup"}>Singup</Link>
            </li>
          </ul>
        </div>
        <div className="aux-container">
          <ul>
            <li>Help Center</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
