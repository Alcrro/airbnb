import { getRoom } from "@/_lib/rooms/getRoom";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  // console.log(room);
  console.log(room);

  return <div></div>;
}
