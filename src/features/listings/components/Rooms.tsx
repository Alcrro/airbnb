import { getRooms } from "@/features/listings/lib/getRooms";
import React from "react";
import "./rooms.scss";
import Link from "next/link";
import ImagesRoom from "./imagesRoom/ImagesRoom";
import HeartButton from "@/features/wishlist/components/HeartButton";
import { Room, RoomImages } from "@/features/listings/types/room";
import EmptyState from "./EmptyState";

interface Props {
  searchParams?: { location?: string; checkIn?: string; checkOut?: string; guests?: string; type?: string };
}

function formatPrice(price: Room["price"]): string {
  if (price == null) return "—";
  if (typeof price === "number") return Math.round(price).toString();
  if ("$numberDecimal" in price) return Math.round(parseFloat(price.$numberDecimal)).toString();
  return "—";
}

function getImageUrl(images: Room["images"]): string {
  if (!images) return "";
  if (typeof images === "string") return images || "";
  const img = images as RoomImages;
  return img.xl_picture_url || img.picture_url || img.medium_url || img.thumbnail_url || "";
}

function formatRating(score: number | undefined): string | null {
  if (!score) return null;
  const val = score > 5 ? score / 20 : score;
  return val.toFixed(2);
}

export default async function Rooms({ searchParams }: Props) {
  const data = await getRooms(searchParams?.location, searchParams?.type);
  const rooms: Room[] = data?.rooms ?? [];

  return (
    <div className="rooms">
      {rooms.length === 0 && (
        <EmptyState location={searchParams?.location} type={searchParams?.type} />
      )}
      <ul className="rooms__grid">
        {rooms.map((item: Room, key: number) => {
          const rawScore = item.review_scores?.review_scores_rating ?? (item as any).review_scores_rating;
          const rating = formatRating(rawScore);
          const reviewCount = item.number_of_reviews;
          const country = item.address?.country ?? item.country;
          const market = item.address?.market;
          const location = [market, country].filter(Boolean).join(", ");
          const hostName = item.host?.host_name ?? item.host_name;
          const isSuperhost = item.host?.host_is_superhost;

          // "Entire home · 2 beds" or "Private room · 1 bed"
          const roomMeta = [
            item.room_type,
            item.beds != null ? `${item.beds} bed${item.beds !== 1 ? "s" : ""}` : null,
          ].filter(Boolean).join(" · ");

          return (
            <li key={key} className="room-card">
              <Link href={`/room/${item._id}`} className="room-card__link">
                <div className="room-card__image-wrap">
                  <ImagesRoom item={item} />
                  <HeartButton roomId={item._id} imageUrl={getImageUrl(item.images)} />
                  {isSuperhost && (
                    <span className="room-card__superhost">
                      <i className="bi bi-patch-check-fill" /> Superhost
                    </span>
                  )}
                </div>
                <div className="room-card__body">
                  <div className="room-card__meta">
                    <span className="room-card__location">
                      <i className="bi bi-geo-alt" />
                      {location || country}
                    </span>
                    {rating && (
                      <span className="room-card__rating">
                        <i className="bi bi-star-fill" />
                        {rating}
                        {reviewCount ? <span className="room-card__reviews"> ({reviewCount})</span> : null}
                      </span>
                    )}
                  </div>
                  <p className="room-card__name">{item.name}</p>
                  {roomMeta && <p className="room-card__room-meta">{roomMeta}</p>}
                  <p className="room-card__host">Hosted by {hostName}</p>
                  <p className="room-card__price">
                    <strong>${formatPrice(item.price)}</strong>
                    <span> / night</span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
