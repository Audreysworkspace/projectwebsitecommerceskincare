import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductDetailPage from "./ProductDetailPage";
import WishlistPage from "./WishlistPage";
import CartPage from "./CartPage";
import TransactionPage from "./TransactionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/my-wishlist" element={<WishlistPage />} />
        <Route path="/my-cart" element={<CartPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
