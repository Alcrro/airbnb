import { ConnectDB } from "@/shared/db/ConnectDB";
import PropertyType from "@/features/property-filter/models/PropertyType";
import { NextRequest, NextResponse } from "next/server";

export async function getPropertyTypeHandler(req: NextRequest) {
  try {
    await ConnectDB();
    const propertyType = await PropertyType.find();
    return NextResponse.json({
      success: true,
      message: "Load successfully",
      propertyType,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
