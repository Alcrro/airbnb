"use client";
import React, { useEffect, useRef, useState } from "react";
import { IWishlistListMeta } from "@/features/wishlist/types/wishlist";
import "./wishlist.scss";

interface Props {
  roomId: string;
  imageUrl?: string;
  onClose: () => void;
  onSaved: (saved: boolean) => void;
}

export default function WishlistModal({ roomId, imageUrl, onClose, onSaved }: Props) {
  const [lists, setLists] = useState<IWishlistListMeta[]>([]);
  const [savedListIds, setSavedListIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [creating, setCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/wishlist/lists").then((r) => r.json()),
      fetch(`/api/wishlist/check?roomId=${roomId}`).then((r) => r.json()),
    ]).then(([listsData, checkData]) => {
      setLists(listsData.data ?? []);
      setSavedListIds(checkData.listIds ?? []);
      setLoading(false);
    });
  }, [roomId]);

  useEffect(() => {
    if (showNewList) inputRef.current?.focus();
  }, [showNewList]);

  async function toggleList(listId: string) {
    const isSaved = savedListIds.includes(listId);
    const next = isSaved
      ? savedListIds.filter((id) => id !== listId)
      : [...savedListIds, listId];
    setSavedListIds(next);
    onSaved(next.length > 0);

    if (isSaved) {
      await fetch(`/api/wishlist/lists/${listId}/items/${roomId}`, { method: "DELETE" });
    } else {
      await fetch(`/api/wishlist/lists/${listId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, imageUrl }),
      });
      setLists((prev) =>
        prev.map((l) => (l._id === listId ? { ...l, count: l.count + 1 } : l))
      );
    }
  }

  async function createList() {
    if (!newListName.trim() || creating) return;
    setCreating(true);

    const res = await fetch("/api/wishlist/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newListName.trim() }),
    });
    const data = await res.json();

    if (data.success) {
      const newList: IWishlistListMeta = data.data;
      await fetch(`/api/wishlist/lists/${newList._id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId, imageUrl }),
      });
      newList.count = 1;
      newList.coverImage = imageUrl ?? "";
      setLists((prev) => [newList, ...prev]);
      setSavedListIds((prev) => [...prev, newList._id]);
      onSaved(true);
    }

    setCreating(false);
    setShowNewList(false);
    setNewListName("");
  }

  return (
    <div className="wl-backdrop" onClick={onClose}>
      <div className="wl-modal" onClick={(e) => e.stopPropagation()}>
        <div className="wl-modal__header">
          <h2>Save to wishlist</h2>
          <button className="wl-modal__close" onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {loading ? (
          <p className="wl-modal__loading">Loading…</p>
        ) : (
          <ul className="wl-modal__list">
            {lists.map((list) => {
              const saved = savedListIds.includes(list._id);
              return (
                <li key={list._id}>
                  <button
                    className={`wl-modal__item${saved ? " wl-modal__item--saved" : ""}`}
                    onClick={() => toggleList(list._id)}
                  >
                    <div className="wl-modal__item-cover">
                      {list.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={list.coverImage} alt={list.name} />
                      ) : (
                        <i className="bi bi-image" />
                      )}
                    </div>
                    <div className="wl-modal__item-info">
                      <span className="wl-modal__item-name">{list.name}</span>
                      <span className="wl-modal__item-count">
                        {list.count} {list.count === 1 ? "home" : "homes"}
                      </span>
                    </div>
                    <i
                      className={`bi ${saved ? "bi-heart-fill" : "bi-heart"} wl-modal__item-heart`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {showNewList ? (
          <div className="wl-modal__new-list">
            <input
              ref={inputRef}
              type="text"
              placeholder="List name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createList()}
              maxLength={40}
            />
            <div className="wl-modal__new-list-actions">
              <button
                className="wl-modal__btn wl-modal__btn--ghost"
                onClick={() => {
                  setShowNewList(false);
                  setNewListName("");
                }}
              >
                Cancel
              </button>
              <button
                className="wl-modal__btn wl-modal__btn--primary"
                onClick={createList}
                disabled={!newListName.trim() || creating}
              >
                {creating ? "Creating…" : "Create"}
              </button>
            </div>
          </div>
        ) : (
          <button className="wl-modal__add-new" onClick={() => setShowNewList(true)}>
            <i className="bi bi-plus-lg" /> New list
          </button>
        )}
      </div>
    </div>
  );
}
