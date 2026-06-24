import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { ConnectDB } from "@/shared/db/ConnectDB";
import User from "@/features/auth/models/User";

export async function registerHandler(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    await ConnectDB();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const passwordHash = await bcryptjs.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    return NextResponse.json({
      success: true,
      message: "Account created",
      data: { id: user._id.toString(), name, email },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
