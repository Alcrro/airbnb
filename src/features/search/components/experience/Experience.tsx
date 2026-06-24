import React from "react";
import ModelWhereType from "../types/ModelWhereType";
import WhoType from "../types/WhoType";
import ExperienceType from "../types/ExperienceType";

export default function Experience({ category }: { category: any }) {
  return (
    <>
      <ModelWhereType category={category} />
      <ExperienceType category={category} />
      <div className="">
        <WhoType category={category} />
      </div>
    </>
  );
}
