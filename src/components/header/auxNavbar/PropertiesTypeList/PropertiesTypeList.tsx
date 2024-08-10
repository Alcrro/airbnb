import React from "react";
import ModalPropTypeList from "./ModalPropTypeList";

import LiTypes from "./LiTypes";

export default function PropertiesTypeList({
  propertyTypes,
}: {
  propertyTypes: any;
}) {
  return (
    <ModalPropTypeList>
      {propertyTypes?.map((propTypes: any, key: number) => (
        <LiTypes key={key} propTypes={propTypes} />
      ))}
    </ModalPropTypeList>
  );
}
