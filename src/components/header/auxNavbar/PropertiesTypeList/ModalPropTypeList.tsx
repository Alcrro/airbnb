"use client";
import React, { ReactNode } from "react";

export default function ModalPropTypeList({
  children,
}: {
  children: ReactNode;
}) {
  return <ul>{children}</ul>;
}
