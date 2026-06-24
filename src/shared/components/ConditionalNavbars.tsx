"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const AUTH_PATHS = ["/login", "/signup"];
const AUX_NAVBAR_PATHS = ["/"];

interface Props {
  children: [ReactNode, ReactNode];
}

export default function ConditionalNavbars({ children }: Props) {
  const pathname = usePathname();
  if (AUTH_PATHS.includes(pathname)) return null;
  const [navbar, auxNavbar] = children;
  return (
    <>
      {navbar}
      {AUX_NAVBAR_PATHS.includes(pathname) && auxNavbar}
    </>
  );
}
