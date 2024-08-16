"use client";
import React, { ReactNode, useEffect, useRef } from "react";
import "./modalType.scss";

export default function ModalType({ children }: { children: ReactNode }) {
  const wrapperRef = useRef(null);

  return (
    <div className="modal-type-tabs" >
      {children}
    </div>
  );
}
