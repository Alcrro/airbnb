import { ConnectDB } from "@/shared/db/ConnectDB";
import Rooms from "@/features/listings/models/Rooms";
import { NextRequest, NextResponse } from "next/server";

export async function getRoomsHandler(req: NextRequest) {
  try {
    await ConnectDB();
    const url = new URL(req.url);
    const location = url.searchParams.get("location");
    const type = url.searchParams.get("type");

    const match: Record<string, unknown> = { name: { $ne: "" } };
    if (location) match.country = { $regex: location, $options: "i" };
    if (type) match.property_type = type;

    const rooms = await Rooms.aggregate([
      { $match: match },
      { $limit: 20 },
      {
        $lookup: {
          from: "listingsAndReviews",
          localField: "_id",
          foreignField: "_id",
          as: "_enriched",
          pipeline: [
            {
              $project: {
                room_type: 1,
                beds: 1,
                bedrooms: 1,
                number_of_reviews: 1,
                review_scores: 1,
                host: 1,
                address: 1,
                property_type: 1,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          room_type:        { $arrayElemAt: ["$_enriched.room_type", 0] },
          beds:             { $arrayElemAt: ["$_enriched.beds", 0] },
          bedrooms:         { $arrayElemAt: ["$_enriched.bedrooms", 0] },
          number_of_reviews:{ $arrayElemAt: ["$_enriched.number_of_reviews", 0] },
          review_scores:    { $arrayElemAt: ["$_enriched.review_scores", 0] },
          host:             { $arrayElemAt: ["$_enriched.host", 0] },
          address:          { $arrayElemAt: ["$_enriched.address", 0] },
          property_type:    { $arrayElemAt: ["$_enriched.property_type", 0] },
        },
      },
      { $project: { _enriched: 0 } },
    ]);

    return NextResponse.json({
      success: true,
      message: "Load rooms successfully",
      rooms,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
