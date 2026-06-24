"use client";
import React, { useState } from "react";
import { RoomReview } from "@/features/listings/types/room";

const LIMIT = 6;

export default function ReviewsExpand({ reviews }: { reviews: RoomReview[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? reviews : reviews.slice(0, LIMIT);

  return (
    <>
      <div className="room-detail__reviews">
        {shown.map((r) => (
          <div key={r._id} className="room-detail__review">
            <div className="room-detail__review-header">
              <div className="room-detail__review-avatar">
                {r.reviewer_name?.[0]?.toUpperCase() ?? "?"}
              </div>
              <div>
                <p className="room-detail__review-name">{r.reviewer_name}</p>
                {r.date && (
                  <p className="room-detail__review-date">
                    {new Date(r.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </p>
                )}
              </div>
            </div>
            {r.comments && <p className="room-detail__review-text">{r.comments}</p>}
          </div>
        ))}
      </div>
      {reviews.length > LIMIT && (
        <button className="room-detail__show-more" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </>
  );
}
