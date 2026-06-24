"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IWishlistListMeta, ICollectionRoom } from "@/features/wishlist/types/wishlist";

interface Props {
  list: IWishlistListMeta;
  onBack: () => void;
}

function getImageUrl(images: ICollectionRoom["images"]): string | null {
  if (!images) return null;
  if (typeof images === "string") return images;
  return null;
}

function formatPrice(price: ICollectionRoom["price"]): string {
  if (price == null) return "—";
  if (typeof price === "number") return Math.round(price).toString();
  if (typeof price === "object" && "$numberDecimal" in price)
    return Math.round(parseFloat(price.$numberDecimal)).toString();
  return "—";
}

export default function WishlistCollectionView({ list, onBack }: Props) {
  const [rooms, setRooms] = useState<ICollectionRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/wishlist/lists/${list._id}`)
      .then((r) => r.json())
      .then((d) => {
        setRooms(d.data?.rooms ?? []);
        setLoading(false);
      });
  }, [list._id]);

  async function removeRoom(roomId: string) {
    setRooms((prev) => prev.filter((r) => r._id !== roomId));
    await fetch(`/api/wishlist/lists/${list._id}/items/${roomId}`, { method: "DELETE" });
  }

  return (
    <div className="wl-collection-view">
      <button className="wl-collection-view__back" onClick={onBack}>
        <i className="bi bi-arrow-left" /> All wishlists
      </button>
      <h2 className="wl-collection-view__title">{list.name}</h2>

      {loading ? (
        <p className="wl-collection-view__loading">Loading…</p>
      ) : rooms.length === 0 ? (
        <div className="wl-collection-view__empty">
          <i className="bi bi-heart" />
          <p>This wishlist is empty</p>
        </div>
      ) : (
        <div className="wl-collection-view__grid">
          {rooms.map((room) => {
            const imageUrl = getImageUrl(room.images);
            return (
              <div key={room._id} className="wl-room-card">
                <Link href={`/room/${room._id}`} className="wl-room-card__link">
                  <div className="wl-room-card__image-wrap">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl} alt={room.name} />
                    ) : (
                      <div className="wl-room-card__no-image">
                        <i className="bi bi-image" />
                      </div>
                    )}
                  </div>
                  <div className="wl-room-card__body">
                    <p className="wl-room-card__name">
                      {room.name}, {room.country}
                    </p>
                    <p className="wl-room-card__price">
                      <strong>${formatPrice(room.price)}</strong>
                      <span> / night</span>
                    </p>
                  </div>
                </Link>
                <button
                  className="wl-room-card__remove"
                  onClick={() => removeRoom(room._id)}
                  aria-label="Remove from wishlist"
                >
                  <i className="bi bi-heart-fill" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
