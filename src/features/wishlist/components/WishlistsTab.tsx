"use client";
import React, { useEffect, useState } from "react";
import { IWishlistListMeta } from "@/features/wishlist/types/wishlist";
import WishlistCollectionCard from "./WishlistCollectionCard";
import WishlistCollectionView from "./WishlistCollectionView";

export default function WishlistsTab() {
  const [lists, setLists] = useState<IWishlistListMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeList, setActiveList] = useState<IWishlistListMeta | null>(null);

  useEffect(() => {
    fetch("/api/wishlist/lists")
      .then((r) => r.json())
      .then((d) => {
        setLists(d.data ?? []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="wl-tab__loading">Loading…</p>;

  if (activeList) {
    return (
      <WishlistCollectionView list={activeList} onBack={() => setActiveList(null)} />
    );
  }

  if (lists.length === 0) {
    return (
      <div className="wl-tab__empty">
        <i className="bi bi-heart" />
        <p>No wishlists yet</p>
        <span>Heart a home to save it to a wishlist.</span>
      </div>
    );
  }

  return (
    <div className="wl-tab__grid">
      {lists.map((list) => (
        <WishlistCollectionCard
          key={list._id}
          list={list}
          onClick={() => setActiveList(list)}
        />
      ))}
    </div>
  );
}
