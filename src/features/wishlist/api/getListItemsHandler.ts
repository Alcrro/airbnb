import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import WishlistList from "@/features/wishlist/models/WishlistList";
import mongoose from "mongoose";

interface WishlistDoc {
  _id: mongoose.Types.ObjectId;
  name: string;
  properties: string[];
}

interface RoomDoc {
  _id: unknown;
  name?: string;
  images?: unknown;
  price?: unknown;
  country?: string;
  host_name?: string;
}

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
    const list = (await WishlistList.findOne({
      _id: params.id,
      userId: session.user.email,
    }).lean()) as WishlistDoc | null;

    if (!list) {
      return NextResponse.json({ error: "List not found" }, { status: 404 });
    }

    let rooms: RoomDoc[] = [];

    if (list.properties.length > 0) {
      rooms = (await mongoose.connection
        .collection("rooms")
        .find({ _id: { $in: list.properties.map((id) => new mongoose.Types.ObjectId(id)) } })
        .project({ name: 1, images: 1, price: 1, country: 1, host_name: 1 })
        .toArray()) as RoomDoc[];
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: list._id.toString(),
        name: list.name,
        rooms: rooms.map((r) => ({
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
