import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";

export async function getListsHandler() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectDB();
    const lists = await WishlistList.find({ userId: session.user.email })
      .sort({ createdAt: -1 })
      .lean();

    const data = (lists as any[]).map((list) => ({
      _id: list._id.toString(),
      name: list.name,
      count: list.properties.length,
      coverImage: list.coverImage ?? "",
    }));

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch wishlists" }, { status: 500 });
  }
}
