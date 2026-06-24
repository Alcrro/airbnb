import { ConnectDB } from "@/shared/db/ConnectDB";
import User from "@/features/auth/models/User";

export async function getUserProfile(email: string) {
  await ConnectDB();
  const user = await User.findOne({ email }).select("name email image createdAt").lean();
  if (!user) return null;
  const u = user as any;
  return {
    name: u.name as string,
    email: u.email as string,
    image: (u.image as string) || null,
    createdAt: u.createdAt ? (u.createdAt as Date).toISOString() : null,
  };
}
