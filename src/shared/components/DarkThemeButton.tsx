"use client";
import React from "react";
import { useTheme } from "next-themes";
import "./themeButton.scss";

const DarkThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-button"
    />
  );
};

export default DarkThemeButton;
