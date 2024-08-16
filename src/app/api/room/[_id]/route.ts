import { ConnectDB } from "@/database/ConnectDB";
import Rooms from "@/models/rooms/Rooms";
import { NextRequest, NextResponse } from "next/server";
ConnectDB();

export async function GET(req: NextRequest, { params }: { params: any }) {
  try {
 

    const room = await Rooms.aggregate([
      {
        $match: params,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Load rooms successfully",
      room,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
