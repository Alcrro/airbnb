"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import "./profile.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BookingData } from "@/features/booking/types";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function nights(checkIn: string, checkOut: string) {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

export default function Profile() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((json) => { if (json.success) setBookings(json.data); });
  }, [isLoggedIn]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const upcoming = bookings.filter(
    (b) => new Date(b.checkIn) >= new Date(new Date().setHours(0, 0, 0, 0))
  );

  return (
    <div className="user-profile">
      {isLoggedIn ? (
        <div className="profile-popover-wrap" ref={ref}>
          <button className="profile-avatar-btn" onClick={() => setOpen((o) => !o)}>
            {session!.user!.image ? (
              <Image src={session!.user!.image} alt={session!.user!.name ?? ""} width={42} height={42} />
            ) : (
              <div className="profile-guest" />
            )}
          </button>

          {open && (
            <div className="profile-popover">
              <p className="profile-popover__heading">Upcoming trips</p>

              {upcoming.length === 0 ? (
                <p className="profile-popover__empty">No upcoming trips planned.</p>
              ) : (
                <ul className="profile-popover__list">
                  {upcoming.slice(0, 4).map((b) => {
                    const n = nights(b.checkIn, b.checkOut);
                    return (
                      <li key={b._id}>
                        <Link href={`/room/${b.roomId}`} className="profile-popover__item" onClick={() => setOpen(false)}>
                          <span className="profile-popover__room">{b.roomName}</span>
                          <span className="profile-popover__dates">
                            <i className="bi bi-calendar3" />
                            {fmtDate(b.checkIn)} — {fmtDate(b.checkOut)}
                          </span>
                          <div className="profile-popover__meta">
                            <span>
                              <i className="bi bi-moon" />
                              {n} night{n !== 1 ? "s" : ""}
                            </span>
                            <span className="profile-popover__price">
                              ${b.totalPrice.toLocaleString()} total
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              <Link href="/profile?tab=bookings" className="profile-popover__see-all" onClick={() => setOpen(false)}>
                See all bookings <i className="bi bi-arrow-right" />
              </Link>
            </div>
          )}
        </div>
      ) : (
        <Link href="/login">
          <div className="profile-guest" />
        </Link>
      )}
    </div>
  );
}
