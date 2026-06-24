"use client";
import React from "react";
import ModalType from "./ModalType";
import Calendar from "./Calendar";
import { useNavbarContext } from "@/shared/context/NavbarContext";

export default function CheckInTabs() {
  const { checkIn, setCheckIn, setIndexNavbarType } = useNavbarContext();

  const handleSelect = (date: string) => {
    setCheckIn(date);
    setIndexNavbarType(2);
  };

  return (
    <ModalType>
      <Calendar onSelect={handleSelect} selected={checkIn} />
    </ModalType>
  );
}
