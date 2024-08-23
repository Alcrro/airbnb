import { ConnectDB } from "@/database/ConnectDB";
import CountryFilter from "@/models/auxNavbar/WhereFilter";
import { NextRequest, NextResponse } from "next/server";
ConnectDB();

export async function GET(req: NextRequest) {
  try {
    const countryFilter = await CountryFilter.find({});

    return NextResponse.json({
      success: true,
      message: "Loading successfully",
      countryFilter,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
