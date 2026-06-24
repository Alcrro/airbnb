"use client";
import React from "react";
import ModalType from "./ModalType";
import Calendar from "./Calendar";
import { useNavbarContext } from "@/shared/context/NavbarContext";

export default function CheckOutTabs() {
  const { checkOut, setCheckOut, checkIn, setIndexNavbarType } = useNavbarContext();

  const handleSelect = (date: string) => {
    setCheckOut(date);
    setIndexNavbarType(3);
  };

  return (
    <ModalType>
      <Calendar
        onSelect={handleSelect}
        selected={checkOut}
        minDate={checkIn || undefined}
      />
    </ModalType>
  );
}
