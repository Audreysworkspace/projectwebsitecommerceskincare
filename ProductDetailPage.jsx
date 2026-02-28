import { Link, useParams, useNavigate } from "react-router-dom";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { products } from "../data/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  const alreadyInWishlist = product ? isInWishlist(product.id) : false;
  const alreadyInCart = product ? isInCart(product.id) : false;

  // Kalau produk tidak ditemukan
  if (!product) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f9b8cb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Poppins', sans-serif" }}>
        <p style={{ color: "#e07a8a", fontSize: "18px" }}>Produk tidak ditemukan.</p>
        <Link to="/" style={{ marginTop: "12px", color: "#e07a8a", textDecoration: "underline" }}>← Kembali ke Home</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9b8cb", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Poppins', sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{ width: "100%", display: "flex", justifyContent: "center", gap: "8px", padding: "18px 24px" }}>
        {["Contacts", "My Wishlist", "Transaction", "My Cart"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase().replace(" ", "-")}`}
            style={{
              textDecoration: "none",
              color: "#555",
              fontSize: "14px",
              fontFamily: "'Poppins', sans-serif",
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(6px)",
              padding: "8px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* ── BRAND HEADER ── */}
      <div style={{
        width: "calc(100% - 60px)",
        maxWidth: "500px",
        background: "linear-gradient(135deg, #b8dff5 0%, #d4ecf7 100%)",
        borderRadius: "20px",
        padding: "16px 24px",
        textAlign: "center",
        marginBottom: "20px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dotted border effect */}
        <div style={{
          position: "absolute", inset: "6px",
          border: "2px dashed rgba(255,255,255,0.6)",
          borderRadius: "14px",
          pointerEvents: "none",
        }} />
        <p style={{
          margin: 0,
          fontFamily: "'Poppins', sans-serif",
          fontSize: "13px",
          fontWeight: "500",
          color: "#555",
          letterSpacing: "2px",
          textTransform: "uppercase",
        }}>Skin To Skin</p>
        <p style={{
          margin: 0,
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: "clamp(36px, 8vw, 56px)",
          fontWeight: "300",
          color: "#c06080",
          lineHeight: 1,
          filter: "drop-shadow(1px 1px 0px rgba(200,100,130,0.3))",
        }}>Skinneeds</p>
      </div>

      {/* ── PRODUCT CARD ── */}
      <div style={{
        width: "calc(100% - 60px)",
        maxWidth: "500px",
        background: "rgba(255,255,255,0.6)",
        borderRadius: "20px",
        border: "2px solid rgba(255,255,255,0.8)",
        backdropFilter: "blur(8px)",
        padding: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        marginBottom: "20px",
      }}>

        {/* Product image box */}
        <div style={{
          background: "#fff",
          border: "2px solid #f5e6a3",
          borderRadius: "14px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          minHeight: "220px",
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ maxHeight: "200px", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        {/* Name + Stock */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
          <h2 style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(20px, 4vw, 28px)",
            fontWeight: "600",
            color: "#e07a8a",
          }}>
            {product.name}
          </h2>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            color: "#888",
            whiteSpace: "nowrap",
            marginLeft: "12px",
            marginTop: "4px",
          }}>
            Stock : {product.stock}
          </span>
        </div>

        {/* Price */}
        <p style={{
          margin: "0 0 16px 0",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "15px",
          fontWeight: "600",
          color: "#e07a8a",
        }}>
          {product.price}
        </p>

        {/* Description */}
        <div style={{ marginBottom: "28px" }}>
          <p style={{
            margin: "0 0 6px 0",
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "16px",
            color: "#888",
          }}>
            Product Description:
          </p>
          <p style={{
            margin: 0,
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            color: "#666",
            lineHeight: 1.7,
          }}>
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <button
            onClick={() => {
              addToWishlist(product);
              navigate("/my-wishlist");
            }}
            style={{
              padding: "10px 28px",
              borderRadius: "20px",
              border: "1.5px solid #e07a8a",
              background: alreadyInWishlist ? "#fce8ed" : "transparent",
              color: "#e07a8a",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#e07a8a"; e.target.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.target.style.background = alreadyInWishlist ? "#fce8ed" : "transparent"; e.target.style.color = "#e07a8a"; }}
          >
            {alreadyInWishlist ? "✓ in wishlist" : "add to wishlist"}
          </button>
          <button
            onClick={() => {
              addToCart(product);
              navigate("/my-cart");
            }}
            style={{
              padding: "10px 36px",
              borderRadius: "20px",
              border: "none",
              background: alreadyInCart ? "#7ab8d4" : "#4a90b8",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(74,144,184,0.4)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#3a7aa0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = alreadyInCart ? "#7ab8d4" : "#4a90b8"; }}
          >
            {alreadyInCart ? "✓ di keranjang" : "Buy"}
          </button>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        width: "calc(100% - 60px)",
        maxWidth: "500px",
        background: "rgba(255,255,255,0.5)",
        borderRadius: "16px",
        padding: "20px 28px",
        marginBottom: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px 20px",
      }}>
        {[
          { icon: "📞", text: "+62954329864" },
          { icon: "📸", text: "@skineeds.co" },
          { icon: "✉️", text: "skineedscare@gmail.com" },
          { icon: "🐦", text: "@skineeds.co" },
          { icon: "📍", text: "Jl. AH Nasution No 578, Medan Sumatera Utara" },
          { icon: "📌", text: "@skineeds.co" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
            <span style={{ fontSize: "13px" }}>{item.icon}</span>
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: "#666", lineHeight: 1.4 }}>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "32px",
          background: "rgba(255,255,255,0.7)",
          border: "none",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          fontSize: "18px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        title="Kembali"
      >
        ↑
      </button>

      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "11px", color: "#bbb", marginBottom: "16px" }}>
        All Right Reserved by Audrey CA
      </p>
    </div>
  );
}