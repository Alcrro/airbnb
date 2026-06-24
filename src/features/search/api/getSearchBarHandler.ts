import { searchData } from "@/features/search/lib/searchData";
import { NextRequest, NextResponse } from "next/server";

export async function getSearchBarHandler(req: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: "Loaded successfully",
      searchData,
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
