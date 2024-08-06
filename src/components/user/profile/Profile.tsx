"use client";
import Image from "next/image";
import React, { useState } from "react";
import "./profile.scss";
import Link from "next/link";

export default function Profile() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <div className="user-profile">
      {!isLogged ? (
        <Link href="/login">
          <div className="profile-guest"></div>
        </Link>
      ) : (
        <Image src={"/"} alt="" width={1000} height={1000}></Image>
      )}
    </div>
  );
}
