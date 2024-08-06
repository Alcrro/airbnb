"use client";
import React from "react";
import { useTheme } from "next-themes";
import "./themeButton.scss";
const DarkThemeButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className={`theme-button ${theme === "dark" ? "dark" : "light"}`}
    ></button>
  );
};

export default DarkThemeButton;
