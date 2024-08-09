"use client";
import Link from "next/link";
import React from "react";

export default function LiTypes({ propTypes }: { propTypes: any }) {
  return (
    <li>
      <Link href={"/"}>{propTypes.property_type}</Link>
    </li>
  );
}
