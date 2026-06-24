"use client";
import React, { ReactNode } from "react";
import "./modalType.scss";

export default function ModalType({ children }: { children: ReactNode }) {
  return <div className="modal-type-tabs">{children}</div>;
}
