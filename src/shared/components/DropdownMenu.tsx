"use client";
import React from "react";
import "./dropdownMenu.scss";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

interface Props {
  onClose: () => void;
}

export default function DropdownMenu({ onClose }: Props) {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <div className="dropdown-menu">
      <div className="dropdown-menu-inner">
        <div className="auth-container">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/profile" onClick={onClose}>Profile</Link>
                </li>
                <li>
                  <button onClick={() => { onClose(); signOut({ callbackUrl: "/" }); }}>
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" onClick={onClose}>Log in</Link>
                </li>
                <li>
                  <Link href="/signup" onClick={onClose}>Sign up</Link>
                </li>
              </>
            )}
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
