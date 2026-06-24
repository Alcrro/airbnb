import React from "react";
import ModelWhereType from "../types/ModelWhereType";
import CheckInType from "../types/CheckInType";
import CheckOnType from "../types/CheckOnType";
import WhoType from "../types/WhoType";

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
