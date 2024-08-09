import { ConnectDB } from "@/database/ConnectDB";
import PropertyTypes from "@/models/auxNavbar/PropertyTypes";
import { NextRequest, NextResponse } from "next/server";

ConnectDB();

export async function GET(req: NextRequest) {
  try {
    const propertyTypes = await PropertyTypes.aggregate([
      {
        $group: {
          _id: null,
          property_type: { $addToSet: "$property_type" },
        },
      },
      {
        $unwind: "$property_type",
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    console.log(propertyTypes);

    return NextResponse.json(
      { success: true, message: "Load successfully", propertyTypes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
