"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "./bookingWidget.scss";

// ── Inline calendar ──────────────────────────────────────────────────
const MONTH_FULL = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_HEADERS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function MiniCalendar({
  selected,
  onSelect,
  minDate,
}: {
  selected: string;
  onSelect: (d: string) => void;
  minDate?: string;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const minD = minDate ? new Date(minDate + "T00:00:00") : today;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1);
  };

  return (
    <div className="bw-cal" onClick={e => e.stopPropagation()}>
      <div className="bw-cal__nav">
        <button className="bw-cal__arrow" onClick={prev}>‹</button>
        <span className="bw-cal__label">{MONTH_FULL[month]} {year}</span>
        <button className="bw-cal__arrow" onClick={next}>›</button>
      </div>
      <div className="bw-cal__grid">
        {DAY_HEADERS.map(d => <div key={d} className="bw-cal__head">{d}</div>)}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const d = new Date(year, month, day);
          const str = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const disabled = d < minD;
          const isSelected = str === selected;
          return (
            <div
              key={day}
              className={`bw-cal__day${isSelected ? " selected" : ""}${disabled ? " disabled" : ""}`}
              onClick={(e) => { if (!disabled) { e.stopPropagation(); onSelect(str); } }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Guest counter ────────────────────────────────────────────────────
function GuestPanel({
  guests,
  setGuests,
  maxGuests,
  onClose,
}: {
  guests: number;
  setGuests: (n: number) => void;
  maxGuests: number;
  onClose: () => void;
}) {
  return (
    <div className="bw-guests" onClick={e => e.stopPropagation()}>
      <div className="bw-guests__row">
        <div>
          <div className="bw-guests__label">Guests</div>
          <div className="bw-guests__desc">Max {maxGuests} guests</div>
        </div>
        <div className="bw-guests__ctrl">
          <button
            className="bw-guests__btn"
            onClick={() => setGuests(Math.max(1, guests - 1))}
            disabled={guests <= 1}
          >
            −
          </button>
          <span className="bw-guests__count">{guests}</span>
          <button
            className="bw-guests__btn"
            onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
            disabled={guests >= maxGuests}
          >
            +
          </button>
        </div>
      </div>
      <button className="bw-guests__done" onClick={onClose}>Done</button>
    </div>
  );
}

// ── BookingWidget ────────────────────────────────────────────────────
interface Props {
  roomId: string;
  roomName: string;
  pricePerNight: number;
  rating?: string | null;
  reviewCount?: number;
  maxGuests?: number;
}

type Panel = "checkIn" | "checkOut" | "guests" | null;

export default function BookingWidget({ roomId, roomName, pricePerNight, rating, reviewCount, maxGuests = 16 }: Props) {
  const { data: session } = useSession();
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [open, setOpen] = useState<Panel>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000))
    : 0;

  const fmt = (d: string) =>
    d ? new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Add date";

  const handleCheckInSelect = (d: string) => {
    setCheckIn(d);
    if (checkOut && d >= checkOut) setCheckOut("");
    setOpen("checkOut");
  };

  const handleReserve = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, roomName, checkIn, checkOut, guests, totalPrice: pricePerNight * nights }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Something went wrong.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bw" ref={ref}>
      <div className="bw__header">
        <div className="bw__price-row">
          <span className="bw__price">${pricePerNight}</span>
          <span className="bw__night"> / night</span>
        </div>
        {rating && (
          <div className="bw__rating">
            <i className="bi bi-star-fill" />
            {rating}
            {reviewCount ? <span className="bw__review-count"> ({reviewCount})</span> : null}
          </div>
        )}
      </div>

      <div className="bw__inputs">
        {/* Check-in */}
        <div
          className={`bw__field bw__field--in${open === "checkIn" ? " bw__field--active" : ""}`}
          onClick={() => setOpen(open === "checkIn" ? null : "checkIn")}
        >
          <label>CHECK-IN</label>
          <span className={checkIn ? "" : "bw__placeholder"}>{fmt(checkIn)}</span>
          {open === "checkIn" && (
            <div className="bw__popover">
              <MiniCalendar selected={checkIn} onSelect={handleCheckInSelect} />
            </div>
          )}
        </div>

        {/* Check-out */}
        <div
          className={`bw__field bw__field--out${open === "checkOut" ? " bw__field--active" : ""}`}
          onClick={() => setOpen(open === "checkOut" ? null : "checkOut")}
        >
          <label>CHECK-OUT</label>
          <span className={checkOut ? "" : "bw__placeholder"}>{fmt(checkOut)}</span>
          {open === "checkOut" && (
            <div className="bw__popover">
              <MiniCalendar selected={checkOut} onSelect={(d) => { setCheckOut(d); setOpen(null); }} minDate={checkIn || undefined} />
            </div>
          )}
        </div>

        {/* Guests */}
        <div
          className={`bw__field bw__field--guests${open === "guests" ? " bw__field--active" : ""}`}
          onClick={() => setOpen(open === "guests" ? null : "guests")}
        >
          <label>GUESTS</label>
          <span>{guests} guest{guests !== 1 ? "s" : ""}</span>
          {open === "guests" && (
            <GuestPanel
              guests={guests}
              setGuests={setGuests}
              maxGuests={maxGuests}
              onClose={() => setOpen(null)}
            />
          )}
        </div>
      </div>

      {nights > 0 && (
        <div className="bw__summary">
          <span>${pricePerNight} × {nights} night{nights !== 1 ? "s" : ""}</span>
          <strong>${pricePerNight * nights}</strong>
        </div>
      )}

      {success ? (
        <div className="bw__success">
          <i className="bi bi-check-circle-fill" /> Booking confirmed!
        </div>
      ) : (
        <>
          {error && <p className="bw__error">{error}</p>}
          <button className="bw__reserve" onClick={handleReserve} disabled={loading}>
            {loading ? "Reserving…" : "Reserve"}
          </button>
          <p className="bw__note">You won&apos;t be charged yet</p>
        </>
      )}
    </div>
  );
}
