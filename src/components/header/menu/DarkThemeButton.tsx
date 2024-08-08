"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import "./themeButton.scss";
const DarkThemeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme, resolvedTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className={`theme-button ${theme === "dark" ? "dark" : "light"}`}
    ></button>
  );
};

export default DarkThemeButton;
