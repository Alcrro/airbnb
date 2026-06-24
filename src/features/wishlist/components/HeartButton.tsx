"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import WishlistModal from "./WishlistModal";
import "./wishlist.scss";
import { useWishlist } from "@/features/wishlist/context/WishlistContext";

interface Props {
  roomId: string;
  imageUrl?: string;
}

export default function HeartButton({ roomId, imageUrl }: Props) {
  const { data: session } = useSession();
  const { savedIds, setSavedIds } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);

  const isSaved = savedIds.has(roomId);

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (!session?.user) {
      setLoginPrompt(true);
      return;
    }
    setModalOpen(true);
  }

  function handleSaved(saved: boolean) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (saved) next.add(roomId);
      else next.delete(roomId);
      return next;
    });
  }

  return (
    <>
      <button
        className={`room-card__heart${isSaved ? " room-card__heart--saved" : ""}`}
        onClick={handleClick}
        aria-label="Save to wishlist"
      >
        <i className={`bi ${isSaved ? "bi-heart-fill" : "bi-heart"}`} />
      </button>

      {loginPrompt && (
        <div className="wl-login-prompt" onClick={() => setLoginPrompt(false)}>
          <div className="wl-login-prompt__card" onClick={(e) => e.stopPropagation()}>
            <button
              className="wl-login-prompt__close"
              onClick={() => setLoginPrompt(false)}
              aria-label="Close"
            >
              <i className="bi bi-x-lg" />
            </button>
            <i className="bi bi-heart wl-login-prompt__icon" />
            <p>Log in to save your favourite homes</p>
            <Link href="/login" className="wl-login-prompt__btn">
              Log in
            </Link>
          </div>
        </div>
      )}

      {modalOpen && (
        <WishlistModal
          roomId={roomId}
          imageUrl={imageUrl}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </>
  );
}
