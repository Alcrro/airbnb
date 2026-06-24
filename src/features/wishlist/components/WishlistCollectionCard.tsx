import React from "react";
import { IWishlistListMeta } from "@/features/wishlist/types/wishlist";

interface Props {
  list: IWishlistListMeta;
  onClick: () => void;
}

export default function WishlistCollectionCard({ list, onClick }: Props) {
  return (
    <button className="wl-collection-card" onClick={onClick}>
      <div className="wl-collection-card__cover">
        {list.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={list.coverImage} alt={list.name} />
        ) : (
          <i className="bi bi-heart" />
        )}
      </div>
      <p className="wl-collection-card__name">{list.name}</p>
      <p className="wl-collection-card__count">
        {list.count} {list.count === 1 ? "home" : "homes"}
      </p>
    </button>
  );
}
