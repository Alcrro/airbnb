import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";

export async function getSavedIdsHandler() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ roomIds: [] });
    }
    await ConnectDB();
    const lists = await WishlistList.find({ userId: session.user.email })
      .select("properties")
      .lean();
    const all = (lists as any[]).flatMap((l) => l.properties as string[]);
    const roomIds = all.filter((id, i) => all.indexOf(id) === i);
    return NextResponse.json({ roomIds });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
