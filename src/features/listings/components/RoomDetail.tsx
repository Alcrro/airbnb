import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./roomDetail.scss";
import { Room, RoomImages } from "@/features/listings/types/room";
import BookingWidget from "@/features/booking/components/BookingWidget";
import AmenitiesExpand from "@/features/listings/components/AmenitiesExpand";
import ReviewsExpand from "@/features/listings/components/ReviewsExpand";
import HostAvatar from "@/features/listings/components/HostAvatar";

function getPrice(price: Room["price"]): number {
  if (price == null) return 0;
  if (typeof price === "number") return Math.round(price);
  return Math.round(parseFloat(price.$numberDecimal));
}

function getImageUrl(images: Room["images"]): string | null {
  if (!images) return null;
  if (typeof images === "string") return images || null;
  const img = images as RoomImages;
  return img.xl_picture_url || img.picture_url || img.medium_url || img.thumbnail_url || null;
}

function getRating(room: Room): string | null {
  const score = room.review_scores?.review_scores_rating ?? room.review_scores_rating;
  if (!score) return null;
  return (score / 20).toFixed(2);
}

function parseBathrooms(bathrooms: Room["bathrooms"]): string {
  if (bathrooms == null) return "";
  if (typeof bathrooms === "number") return bathrooms % 1 === 0 ? bathrooms.toString() : bathrooms.toFixed(1);
  const n = parseFloat(bathrooms.$numberDecimal);
  return n % 1 === 0 ? n.toString() : n.toFixed(1);
}

function parseDecimal(val?: { $numberDecimal: string }): string {
  if (!val) return "";
  const n = Math.round(parseFloat(val.$numberDecimal));
  return n === 0 ? "" : n.toString();
}


const SCORE_LABELS: [string, keyof NonNullable<Room["review_scores"]>][] = [
  ["Cleanliness", "review_scores_cleanliness"],
  ["Accuracy", "review_scores_accuracy"],
  ["Check-in", "review_scores_checkin"],
  ["Communication", "review_scores_communication"],
  ["Location", "review_scores_location"],
  ["Value", "review_scores_value"],
];

export default function RoomDetail({ room }: { room: Room }) {
  const imageUrl = getImageUrl(room.images);
  const price = getPrice(room.price);
  const rating = getRating(room);
  const reviewCount = room.number_of_reviews ?? 0;
  const hostName = room.host?.host_name ?? room.host_name;
  const hostAvatar = room.host?.host_thumbnail_url || room.host?.host_picture_url || null;
  const country = room.address?.country ?? room.country;
  const market = room.address?.market;
  const suburb = room.address?.suburb;
  const fullLocation = [suburb ?? market, country].filter(Boolean).join(", ");
  const amenities = room.amenities ?? [];
  const bathrooms = parseBathrooms(room.bathrooms);
  const cleaningFee = parseDecimal(room.cleaning_fee);
  const securityDeposit = parseDecimal(room.security_deposit);
  const reviews = room.reviews ?? [];

  return (
    <div className="room-detail">
      <Link href="/" className="room-detail__back">
        <i className="bi bi-arrow-left" /> Back to listings
      </Link>

      <h1 className="room-detail__title">{room.name}</h1>

      <div className="room-detail__meta">
        {rating && (
          <span className="room-detail__rating">
            <i className="bi bi-star-fill" />
            {rating} &middot; {reviewCount} review{reviewCount !== 1 ? "s" : ""}
          </span>
        )}
        {room.host?.host_is_superhost && (
          <span className="room-detail__superhost">
            <i className="bi bi-patch-check-fill" /> Superhost
          </span>
        )}
        {fullLocation && (
          <span className="room-detail__location">
            <i className="bi bi-geo-alt-fill" /> {fullLocation}
          </span>
        )}
        {room.property_type && (
          <span className="room-detail__type">{room.property_type}</span>
        )}
      </div>

      {/* Hero image */}
      <div className="room-detail__gallery">
        {imageUrl ? (
          <div className="room-detail__gallery-main">
            <Image src={imageUrl} alt={room.name} fill style={{ objectFit: "cover" }} priority />
          </div>
        ) : (
          <div className="room-detail__gallery-fallback">
            <i className="bi bi-image" />
          </div>
        )}
      </div>

      <div className="room-detail__body">
        {/* ── Info column ── */}
        <div className="room-detail__info">

          {/* Host */}
          <div className="room-detail__section">
            <div className="room-detail__host">
              <div className="room-detail__avatar">
                {hostAvatar ? (
                  <HostAvatar src={hostAvatar} name={hostName} />
                ) : (
                  <i className="bi bi-person-fill" />
                )}
              </div>
              <div>
                <p className="room-detail__host-label">Hosted by</p>
                <p className="room-detail__host-name">{hostName}</p>
                {room.host?.host_response_rate != null && (
                  <p className="room-detail__host-meta">
                    {room.host.host_response_rate}% response rate
                    {room.host.host_response_time ? ` · ${room.host.host_response_time}` : ""}
                  </p>
                )}
              </div>
            </div>
            {room.host?.host_about && (
              <p className="room-detail__host-about">{room.host.host_about}</p>
            )}

            {/* Quick stats */}
            {(room.accommodates || room.bedrooms != null || room.beds != null || bathrooms) && (
              <div className="room-detail__stats">
                {room.accommodates && (
                  <div className="room-detail__stat">
                    <i className="bi bi-people" />
                    <span>{room.accommodates} guest{room.accommodates !== 1 ? "s" : ""}</span>
                  </div>
                )}
                {room.bedrooms != null && (
                  <div className="room-detail__stat">
                    <i className="bi bi-door-closed" />
                    <span>{room.bedrooms} bedroom{room.bedrooms !== 1 ? "s" : ""}</span>
                  </div>
                )}
                {room.beds != null && (
                  <div className="room-detail__stat">
                    <i className="bi bi-moon" />
                    <span>{room.beds} bed{room.beds !== 1 ? "s" : ""}</span>
                  </div>
                )}
                {bathrooms && (
                  <div className="room-detail__stat">
                    <i className="bi bi-droplet" />
                    <span>{bathrooms} bath{parseFloat(bathrooms) !== 1 ? "s" : ""}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* About */}
          {(room.summary || room.description) && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">About this place</h3>
              <p className="room-detail__description">{room.summary || room.description}</p>
            </div>
          )}

          {/* Neighborhood */}
          {room.neighborhood_overview && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">The neighborhood</h3>
              <p className="room-detail__description">{room.neighborhood_overview}</p>
            </div>
          )}

          {/* Getting around */}
          {(room.transit || room.access) && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">Getting around</h3>
              {room.transit && (
                <div className="room-detail__info-row">
                  <i className="bi bi-bus-front" />
                  <p className="room-detail__description">{room.transit}</p>
                </div>
              )}
              {room.access && room.access !== room.transit && (
                <div className="room-detail__info-row">
                  <i className="bi bi-door-open" />
                  <p className="room-detail__description">{room.access}</p>
                </div>
              )}
            </div>
          )}

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">What this place offers</h3>
              <AmenitiesExpand amenities={amenities} />
            </div>
          )}

          {/* House rules */}
          {room.house_rules && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">House rules</h3>
              <p className="room-detail__description">{room.house_rules}</p>
            </div>
          )}

          {/* Stay details */}
          {(room.minimum_nights || room.cancellation_policy || cleaningFee || securityDeposit) && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">Stay details</h3>
              <div className="room-detail__stay-grid">
                {room.minimum_nights && (
                  <div className="room-detail__stay-item">
                    <i className="bi bi-calendar-check" />
                    <div>
                      <span className="room-detail__stay-label">Min stay</span>
                      <span className="room-detail__stay-value">
                        {room.minimum_nights} night{room.minimum_nights !== "1" ? "s" : ""}
                      </span>
                    </div>
                  </div>
                )}
                {room.maximum_nights && (
                  <div className="room-detail__stay-item">
                    <i className="bi bi-calendar-range" />
                    <div>
                      <span className="room-detail__stay-label">Max stay</span>
                      <span className="room-detail__stay-value">{room.maximum_nights} nights</span>
                    </div>
                  </div>
                )}
                {room.cancellation_policy && (
                  <div className="room-detail__stay-item">
                    <i className="bi bi-shield-check" />
                    <div>
                      <span className="room-detail__stay-label">Cancellation</span>
                      <span className="room-detail__stay-value">
                        {room.cancellation_policy.replace(/_/g, " ")}
                      </span>
                    </div>
                  </div>
                )}
                {cleaningFee && (
                  <div className="room-detail__stay-item">
                    <i className="bi bi-stars" />
                    <div>
                      <span className="room-detail__stay-label">Cleaning fee</span>
                      <span className="room-detail__stay-value">${cleaningFee}</span>
                    </div>
                  </div>
                )}
                {securityDeposit && (
                  <div className="room-detail__stay-item">
                    <i className="bi bi-lock" />
                    <div>
                      <span className="room-detail__stay-label">Security deposit</span>
                      <span className="room-detail__stay-value">${securityDeposit}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Review scores */}
          {room.review_scores && reviewCount > 0 && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">
                <i className="bi bi-star-fill" style={{ color: "#ff385c", marginRight: 8 }} />
                {rating} &middot; {reviewCount} review{reviewCount !== 1 ? "s" : ""}
              </h3>
              <div className="room-detail__scores">
                {SCORE_LABELS
                  .filter(([, key]) => room.review_scores![key] != null)
                  .map(([label, key]) => {
                    const val = room.review_scores![key]!;
                    return (
                      <div key={label} className="room-detail__score-row">
                        <span className="room-detail__score-label">{label}</span>
                        <div className="room-detail__score-bar">
                          <div className="room-detail__score-fill" style={{ width: `${(val / 10) * 100}%` }} />
                        </div>
                        <span className="room-detail__score-val">{(val / 2).toFixed(1)}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Guest reviews */}
          {reviews.length > 0 && (
            <div className="room-detail__section">
              <h3 className="room-detail__section-title">Guest reviews</h3>
              <ReviewsExpand reviews={reviews} />
            </div>
          )}

        </div>

        {/* ── Booking widget ── */}
        <div className="room-detail__booking-col">
          <BookingWidget
            roomId={room._id}
            roomName={room.name}
            pricePerNight={price}
            rating={rating}
            reviewCount={reviewCount}
            maxGuests={room.accommodates}
          />
        </div>
      </div>
    </div>
  );
}
