import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/api/authOptions";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/features/auth/lib/getUserProfile";
import ProfileTabs from "@/features/auth/components/ProfileTabs";
import "@/features/auth/components/auth.scss";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await getUserProfile(session.user.email);
  if (!user) redirect("/login");

  return (
    <main className="profile-page">
      <ProfileTabs
        name={user.name}
        email={user.email}
        image={user.image}
        createdAt={user.createdAt}
      />
    </main>
  );
}
