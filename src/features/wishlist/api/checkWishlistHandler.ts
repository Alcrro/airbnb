import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";

export async function checkWishlistHandler(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ listIds: [] });
    }

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    if (!roomId) return NextResponse.json({ listIds: [] });

    await ConnectDB();
    const lists = await WishlistList.find({
      userId: session.user.email,
      properties: roomId,
    })
      .select("_id")
      .lean();

    return NextResponse.json({ listIds: (lists as any[]).map((l) => l._id.toString()) });
  } catch {
    return NextResponse.json({ error: "Failed to check wishlist" }, { status: 500 });
  }
}
