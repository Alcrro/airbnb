import { ConnectDB } from "@/database/ConnectDB";
import Rooms from "@/models/rooms/Rooms";
import { NextRequest, NextResponse } from "next/server";
ConnectDB();

export async function GET(req: NextRequest) {
  try {
    const rooms = await Rooms.aggregate([
      {
        $match: {
          name: { $ne: "" },
        },
      },

      {
        $limit: 20,
      },
    ]);

    return NextResponse.json({
      success: true,
      message: "Load rooms successfully",
      rooms,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
