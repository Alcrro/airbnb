import React from "react";
import ModalType from "./ModalType";
import "./whereTabs.scss";
import { getCountries } from "@/_lib/navbar/getCountry/getCountry";
export default async function WhereTabs() {
  const countryFilters = await getCountries();
  console.log(countryFilters);

  return (
    <ModalType>
      <div className="where-tabs">Where</div>;
    </ModalType>
  );
}
