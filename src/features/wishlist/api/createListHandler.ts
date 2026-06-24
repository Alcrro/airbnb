import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";

export async function createListHandler(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    await ConnectDB();
    const list = await WishlistList.create({
      userId: session.user.email,
      name: name.trim(),
    });

    return NextResponse.json({
      success: true,
      data: { _id: list._id.toString(), name: list.name, count: 0, coverImage: "" },
    });
  } catch {
    return NextResponse.json({ error: "Failed to create wishlist" }, { status: 500 });
  }
}
