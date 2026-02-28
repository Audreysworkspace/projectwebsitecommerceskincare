import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import TransactionPage from "./pages/TransactionPage";

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