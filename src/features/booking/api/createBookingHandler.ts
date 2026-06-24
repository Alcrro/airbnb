import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { ConnectDB } from "@/shared/db/ConnectDB";
import Booking from "@/features/booking/models/Booking";

export async function createBookingHandler(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { roomId, roomName, checkIn, checkOut, guests, totalPrice } = await req.json();

    if (!roomId || !roomName || !checkIn || !checkOut || !guests || totalPrice == null) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkInDate >= checkOutDate) {
      return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
    }

    await ConnectDB();

    const booking = await Booking.create({
      userId: session.user.email,
      roomId,
      roomName,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      totalPrice,
    });

    return NextResponse.json({
      success: true,
      message: "Booking confirmed",
      data: {
        _id: booking._id.toString(),
        roomId: booking.roomId,
        roomName: booking.roomName,
        checkIn: booking.checkIn.toISOString(),
        checkOut: booking.checkOut.toISOString(),
        guests: booking.guests,
        totalPrice: booking.totalPrice,
        createdAt: booking.createdAt.toISOString(),
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
