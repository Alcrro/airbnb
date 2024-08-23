import React from "react";
import ModelWhereType from "../searchTypesList/types/ModelWhereType";

import WhoType from "../searchTypesList/types/WhoType";
import ExperienceType from "../searchTypesList/types/ExperienceType";

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
