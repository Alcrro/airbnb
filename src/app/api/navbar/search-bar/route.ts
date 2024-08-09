import { searchData } from "@/_lib/navbar/search/searchData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: "Loaded successfully",
      searchData,
    });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
