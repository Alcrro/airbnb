"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface IWishlist {
  savedIds: Set<string>;
  setSavedIds: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const WishlistContext = createContext<IWishlist>({
  savedIds: new Set(),
  setSavedIds: () => {},
});

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!session?.user?.email) {
      setSavedIds(new Set());
      return;
    }
    fetch("/api/wishlist/saved-ids")
      .then((r) => r.json())
      .then((d) => setSavedIds(new Set(d.roomIds ?? [])))
      .catch(() => {});
  }, [session]);

  return (
    <WishlistContext.Provider value={{ savedIds, setSavedIds }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
