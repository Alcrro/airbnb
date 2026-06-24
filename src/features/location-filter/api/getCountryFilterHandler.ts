import { ConnectDB } from "@/shared/db/ConnectDB";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function getCountryFilterHandler() {
  try {
    await ConnectDB();

    const db = mongoose.connection.db;
    if (!db) return NextResponse.json({ error: "DB not connected" }, { status: 500 });

    const result = await db.collection("listingsAndReviews").aggregate([
      { $match: { "address.country": { $exists: true, $ne: "" } } },
      { $group: { _id: "$address.country" } },
      { $sort: { _id: 1 } },
    ]).toArray();

    const uniqueValues = result.map((r) => r._id as string).filter(Boolean);

    return NextResponse.json({
      success: true,
      countryFilter: [{ uniqueValues }],
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
