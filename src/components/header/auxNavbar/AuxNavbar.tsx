import { getPropertyType } from "@/_lib/navbar/auxNavbar/getPropeprtyType";
import React from "react";
import "./auxNavbar.scss";
import Link from "next/link";
import PropertiesTypeList from "./PropertiesTypeList/PropertiesTypeList";

export default async function AuxNavbar() {
  const { propertyTypes } = await getPropertyType();

  return (
    <div className="aux-navbar">
      <PropertiesTypeList propertyTypes={propertyTypes} />
    </div>
  );
}
