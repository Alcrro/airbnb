import React from "react";
import ModelWhereType from "../searchTypesList/types/ModelWhereType";
import CheckInType from "../searchTypesList/types/CheckInType";
import CheckOnType from "../searchTypesList/types/CheckOnType";
import WhoType from "../searchTypesList/types/WhoType";

export default function Stays({ category }: { category: any }) {
  return (
    <>
      <ModelWhereType category={category} />
      <CheckInType category={category} />
      <CheckOnType category={category} />
      <WhoType category={category} />
    </>
  );
}
