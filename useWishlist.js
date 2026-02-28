import { useState, useEffect } from "react";

export function useWishlist() {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("skineeds_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("skineeds_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const already = prev.find((p) => p.id === product.id);
      if (already) return prev; // tidak duplikat
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId) => wishlist.some((p) => p.id === productId);

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
}