import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";

export async function addItemHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roomId, imageUrl } = await req.json();
    if (!roomId) {
      return NextResponse.json({ error: "roomId is required" }, { status: 400 });
    }

    await ConnectDB();
    const list = await WishlistList.findOne({ _id: params.id, userId: session.user.email });
    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    if (!list.properties.includes(roomId)) {
      list.properties.push(roomId);
      if (!list.coverImage && imageUrl) {
        list.coverImage = imageUrl;
      }
      await list.save();
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
