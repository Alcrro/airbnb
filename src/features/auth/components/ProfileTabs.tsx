"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import InfoTab from "./InfoTab";
import BookingsTab from "./BookingsTab";
import WishlistsTab from "@/features/wishlist/components/WishlistsTab";
import "./profileTabs.scss";

type Tab = "info" | "bookings" | "wishlists";

interface Props {
  name: string;
  email: string;
  image: string | null;
  createdAt: string | null;
}

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "info", label: "Info", icon: "bi-person" },
  { id: "bookings", label: "Bookings", icon: "bi-calendar-check" },
  { id: "wishlists", label: "Wishlists", icon: "bi-heart" },
];

function formatMemberDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function ProfileTabs({ name, email, image, createdAt }: Props) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as Tab | null;
  const [active, setActive] = useState<Tab>(tabParam && ["info", "bookings", "wishlists"].includes(tabParam) ? tabParam : "info");

  useEffect(() => {
    if (tabParam && ["info", "bookings", "wishlists"].includes(tabParam)) {
      setActive(tabParam as Tab);
    }
  }, [tabParam]);

  return (
    <div className="profile-layout">
      <aside className="profile-sidebar">
        <div className="profile-sidebar__avatar">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} />
          ) : (
            <i className="bi bi-person-circle" />
          )}
        </div>
        <h2 className="profile-sidebar__name">{name}</h2>
        <p className="profile-sidebar__role">Guest</p>
        <div className="profile-sidebar__divider" />
        <p className="profile-sidebar__member">
          <i className="bi bi-calendar3" />
          Member since {formatMemberDate(createdAt)}
        </p>
        <div className="profile-sidebar__badge">
          <i className="bi bi-patch-check-fill" />
          Email verified
        </div>
        <div className="profile-sidebar__divider" />
        <nav className="profile-sidebar__nav">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`profile-sidebar__nav-btn${active === tab.id ? " profile-sidebar__nav-btn--active" : ""}`}
              onClick={() => setActive(tab.id)}
            >
              <i className={`bi ${tab.icon}`} />
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="profile-main">
        {active === "info" && (
          <InfoTab name={name} email={email} image={image} createdAt={createdAt} />
        )}
        {active === "bookings" && <BookingsTab />}
        {active === "wishlists" && <WishlistsTab />}
      </section>
    </div>
  );
}
