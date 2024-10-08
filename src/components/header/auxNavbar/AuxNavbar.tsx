import { getPropertyType } from "@/_lib/navbar/auxNavbar/getPropeprtyType";
import React from "react";
import "./auxNavbar.scss";

import PropertiesTypeList from "./PropertiesTypeList/PropertiesTypeList";

export default async function AuxNavbar() {
  const { propertyType } = await getPropertyType();

  return (
    <div className="aux-navbar">
      <PropertiesTypeList propertyTypes={propertyType} />
    </div>
  );
}
