import { ConnectDB } from "@/shared/db/ConnectDB";
import ListingsAndReviews from "@/features/listings/models/ListingsAndReviews";
import { NextRequest, NextResponse } from "next/server";

export async function getRoomHandler(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    await ConnectDB();
    const [room] = await ListingsAndReviews.aggregate([{ $match: { _id: params._id } }]);
    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      message: "Load room successfully",
      room,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
