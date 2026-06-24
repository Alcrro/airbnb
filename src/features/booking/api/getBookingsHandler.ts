import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import Booking from "@/features/booking/models/Booking";

export async function getBookingsHandler() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ConnectDB();

    const bookings = await Booking.find({ userId: session.user.email }).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: bookings.map((b) => ({
        _id: b._id.toString(),
        roomId: b.roomId,
        roomName: b.roomName,
        checkIn: b.checkIn.toISOString(),
        checkOut: b.checkOut.toISOString(),
        guests: b.guests,
        totalPrice: b.totalPrice,
        createdAt: b.createdAt.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
