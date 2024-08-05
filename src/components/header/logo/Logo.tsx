import React from "react";
import "./logo.scss";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="logo-container">
      <Link href={"/"}>Airbnb</Link>
    </div>
  );
}
