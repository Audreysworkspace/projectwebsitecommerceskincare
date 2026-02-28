import { useState, useEffect } from "react";

export function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("skineeds_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("skineeds_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const already = prev.find((p) => p.id === product.id);
      if (already) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInCart = (productId) => cart.some((p) => p.id === productId);

  return { cart, addToCart, removeFromCart, isInCart };
}