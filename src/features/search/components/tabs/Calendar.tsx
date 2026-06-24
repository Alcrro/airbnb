"use client";
import React, { useState } from "react";
import "./calendar.scss";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CalendarProps {
  onSelect: (date: string) => void;
  selected?: string;
  minDate?: string;
}

export default function Calendar({ onSelect, selected, minDate }: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const minD = minDate ? new Date(minDate + "T00:00:00") : today;

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const handleDay = (e: React.MouseEvent, day: number) => {
    e.stopPropagation();
    const d = new Date(year, month, day);
    if (d < minD) return;
    const str = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onSelect(str);
  };

  return (
    <div className="calendar">
      <div className="calendar-nav">
        <button className="cal-btn" onClick={(e) => { e.stopPropagation(); prevMonth(); }} aria-label="Previous month">
          <i className="bi bi-chevron-left" />
        </button>
        <span className="cal-month-label">{MONTHS[month]} {year}</span>
        <button className="cal-btn" onClick={(e) => { e.stopPropagation(); nextMonth(); }} aria-label="Next month">
          <i className="bi bi-chevron-right" />
        </button>
      </div>
      <div className="calendar-grid">
        {DAY_HEADERS.map(d => (
          <div key={d} className="cal-header">{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const d = new Date(year, month, day);
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isDisabled = d < minD;
          const isSelected = dateStr === selected;
          return (
            <div
              key={day}
              className={`cal-day${isSelected ? " selected" : ""}${isDisabled ? " disabled" : ""}`}
              onClick={(e) => handleDay(e, day)}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
