import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";
import mongoose from "mongoose";

export async function getListItemsHandler(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectDB();
    const list = await WishlistList.findOne({
      _id: params.id,
      userId: session.user.email,
    }).lean();

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    const properties = (list as any).properties as string[];
    let rooms: unknown[] = [];

    if (properties.length > 0) {
      rooms = await mongoose.connection
        .collection("rooms")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .find({ _id: { $in: properties as any } })
        .project({ name: 1, images: 1, price: 1, country: 1, host_name: 1 })
        .toArray();
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: (list as any)._id.toString(),
        name: (list as any).name,
        rooms: rooms.map((r: any) => ({
          _id: r._id,
          name: r.name,
          images: r.images ?? null,
          price: r.price ?? null,
          country: r.country ?? "",
          host_name: r.host_name ?? "",
        })),
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch list items" }, { status: 500 });
  }
}
