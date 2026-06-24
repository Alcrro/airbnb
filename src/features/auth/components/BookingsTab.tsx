"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BookingData } from "@/features/booking/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function nightCount(checkIn: string, checkOut: string) {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

function isUpcoming(checkIn: string) {
  return new Date(checkIn) >= new Date(new Date().setHours(0, 0, 0, 0));
}

export default function BookingsTab() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((json) => { if (json.success) setBookings(json.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bookings-tab">
        <div className="bookings-tab__skeleton">
          {[1, 2].map((i) => <div key={i} className="bookings-tab__skeleton-card" />)}
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bookings-tab">
        <div className="bookings-tab__empty">
          <div className="bookings-tab__empty-icon">
            <i className="bi bi-calendar-check" />
          </div>
          <p className="bookings-tab__empty-title">No trips yet</p>
          <span className="bookings-tab__empty-sub">
            Your upcoming and past bookings will appear here.
          </span>
          <Link href="/" className="bookings-tab__empty-cta">
            Explore stays
          </Link>
        </div>
      </div>
    );
  }

  const upcoming = bookings.filter((b) => isUpcoming(b.checkIn));
  const past = bookings.filter((b) => !isUpcoming(b.checkIn));

  return (
    <div className="bookings-tab">
      {upcoming.length > 0 && (
        <section className="bookings-tab__group">
          <h3 className="bookings-tab__group-title">Upcoming</h3>
          <ul className="bookings-tab__list">
            {upcoming.map((b) => <BookingCard key={b._id} booking={b} upcoming />)}
          </ul>
        </section>
      )}
      {past.length > 0 && (
        <section className="bookings-tab__group">
          <h3 className="bookings-tab__group-title">Past trips</h3>
          <ul className="bookings-tab__list">
            {past.map((b) => <BookingCard key={b._id} booking={b} upcoming={false} />)}
          </ul>
        </section>
      )}
    </div>
  );
}

function BookingCard({ booking: b, upcoming }: { booking: BookingData; upcoming: boolean }) {
  const n = nightCount(b.checkIn, b.checkOut);
  return (
    <li className={`booking-card${upcoming ? " booking-card--upcoming" : " booking-card--past"}`}>
      <div className="booking-card__accent" />
      <div className="booking-card__body">
        <div className="booking-card__top">
          <Link href={`/room/${b.roomId}`} className="booking-card__name">
            {b.roomName}
          </Link>
          <span className={`booking-card__badge${upcoming ? " booking-card__badge--upcoming" : " booking-card__badge--past"}`}>
            {upcoming ? "Upcoming" : "Completed"}
          </span>
        </div>

        <div className="booking-card__dates">
          <span className="booking-card__date-block">
            <span className="booking-card__date-label">Check-in</span>
            <span className="booking-card__date-value">{formatDate(b.checkIn)}</span>
          </span>
          <div className="booking-card__date-arrow">
            <i className="bi bi-arrow-right" />
          </div>
          <span className="booking-card__date-block">
            <span className="booking-card__date-label">Check-out</span>
            <span className="booking-card__date-value">{formatDate(b.checkOut)}</span>
          </span>
        </div>

        <div className="booking-card__footer">
          <span className="booking-card__pill">
            <i className="bi bi-moon" />
            {n} night{n !== 1 ? "s" : ""}
          </span>
          <span className="booking-card__pill">
            <i className="bi bi-people" />
            {b.guests} guest{b.guests !== 1 ? "s" : ""}
          </span>
          <span className="booking-card__total">
            ${b.totalPrice.toLocaleString()} total
          </span>
        </div>
      </div>
    </li>
  );
}
