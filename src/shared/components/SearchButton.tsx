"use client";
import React from "react";
import "./searchButton.scss";
import { useNavbarContext } from "@/shared/context/NavbarContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchButton() {
  const { searchLocation, checkIn, checkOut, guests } = useNavbarContext();
  const router = useRouter();
  const currentParams = useSearchParams();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    const totalGuests = guests.adults + guests.children + guests.infants;
    if (totalGuests > 0) params.set("guests", totalGuests.toString());
    const existingType = currentParams.get("type");
    if (existingType) params.set("type", existingType);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="search-button">
      <button className="btn-search-button icon" onClick={handleSearch} />
    </div>
  );
}
