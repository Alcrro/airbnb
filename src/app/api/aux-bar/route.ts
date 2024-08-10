import { ConnectDB } from "@/database/ConnectDB";
import PropertyType from "@/models/auxNavbar/PropertyType";

import { NextRequest, NextResponse } from "next/server";

ConnectDB();

export async function GET(req: NextRequest) {
  try {
    const propertyType = await PropertyType.find();

    return NextResponse.json(
      { success: true, message: "Load successfully", propertyType },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
