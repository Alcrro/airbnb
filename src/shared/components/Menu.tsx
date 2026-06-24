"use client";
import React, { useState, useRef, useEffect } from "react";
import "./menu.scss";
import DarkThemeButton from "./DarkThemeButton";
import DropdownMenu from "./DropdownMenu";
import Profile from "@/features/auth/components/Profile";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="navbar-menu relative" ref={ref}>
      <button
        className="dropdown-menu-icon"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
      />
      {open && <DropdownMenu onClose={() => setOpen(false)} />}
      <Profile />
      <DarkThemeButton />
    </div>
  );
}
