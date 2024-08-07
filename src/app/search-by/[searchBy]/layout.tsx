import React from "react";

export default function layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  // console.log(params);

  return <div>{children}</div>;
}
