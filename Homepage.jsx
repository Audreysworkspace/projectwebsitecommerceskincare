import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";

// ─── icons ───────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
  </svg>
);
const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);
const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

// ─── gingham pattern ─────────────────────────────────────────────────────────
const ginghamBg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23c8dff5'/%3E%3Crect width='20' height='20' fill='%23aecfec' opacity='0.5'/%3E%3Crect x='20' y='20' width='20' height='20' fill='%23aecfec' opacity='0.5'/%3E%3C/svg%3E")`;

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeDidYouKnow, setActiveDidYouKnow] = useState(products[0]);
  const navigate = useNavigate();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9b8cb", fontFamily: "'Georgia', serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0" }}>

      {/* ── NAV ── */}
      <nav style={{ width: "100%", display: "flex", justifyContent: "center", gap: "8px", padding: "18px 24px" }}>
        {["Contacts", "My Wishlist", "Transaction", "My Cart"].map((item) => (
          <Link
            key={item}
            to={item === "My Wishlist" ? "/my-wishlist" : item === "My Cart" ? "/my-cart" : `/${item.toLowerCase().replace(" ", "-")}`}
            style={{
              textDecoration: "none", color: "#555", fontSize: "14px",
              fontFamily: "'Helvetica Neue', sans-serif",
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(6px)",
              padding: "8px 20px", borderRadius: "20px",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.95)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.75)")}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* ── HERO BANNER ── */}
      <div style={{ position:"relative", width:"calc(100% - 60px)", maxWidth:"1000px", borderRadius:"24px", overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.12)", aspectRatio:"16/7", background: ginghamBg }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:ginghamBg, backgroundSize:"40px 40px" }} />

        {/* Skineeds */}
        <div style={{ position:"absolute", bottom:"46%", left:"5%", right:"30%", zIndex:10, lineHeight:1 }}>
          <span style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(52px, 8vw, 96px)", fontWeight:"300", background:"linear-gradient(135deg, #f7c5d5 0%, #fff 50%, #f7c5d5 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", filter:"drop-shadow(2px 2px 0px rgba(220,140,170,0.6))", display:"block", letterSpacing:"-1px" }}>
            Skineeds
          </span>
        </div>

        {/* value */}
        <div style={{ position:"absolute", bottom:"22%", left:"5%", zIndex:10 }}>
          <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(28px, 4vw, 52px)", fontWeight:"700", color:"#d4a843", letterSpacing:"3px" }}>
            value
          </span>
        </div>

        {/* your soul */}
        <div style={{ position:"absolute", bottom:"8%", left:"20%", zIndex:10 }}>
          <span style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(28px, 4.5vw, 56px)", fontWeight:"300", color:"#c9a030", letterSpacing:"1px" }}>
            your soul
          </span>
        </div>

        {/* Product images */}
        <img src="/assets/sunscreen.png"    alt="Sunscreen"  style={{ position:"absolute", top:"5%",    left:"2%",   width:"13%", zIndex:8, transform:"rotate(-20deg)", filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/ampoulepad.png"   alt="Ampoule"    style={{ position:"absolute", top:"10%",   left:"17%",  width:"15%", zIndex:8, transform:"rotate(5deg)",   filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/cleansingoil.png" alt="Cleansing"  style={{ position:"absolute", bottom:"5%", left:"3%",   width:"12%", zIndex:8, transform:"rotate(10deg)",  filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/fwpink.png"       alt="FW Pink"    style={{ position:"absolute", bottom:"4%", left:"17%",  width:"11%", zIndex:8, transform:"rotate(-8deg)",  filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/serum.png"        alt="Serum"      style={{ position:"absolute", top:"5%",    right:"22%", width:"11%", zIndex:8, transform:"rotate(8deg)",   filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/matcha.png"       alt="Matcha"     style={{ position:"absolute", top:"4%",    right:"3%",  width:"14%", zIndex:8, transform:"rotate(-5deg)",  filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/gadiskuning.png"  alt="Gadis"      style={{ position:"absolute", bottom:"4%", right:"3%",  width:"13%", zIndex:8, transform:"rotate(12deg)",  filter:"drop-shadow(2px 4px 6px rgba(0,0,0,0.18))" }} />
        <img src="/assets/model.png"        alt="Model"      style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", height:"100%", width:"auto", maxWidth:"40%", objectFit:"contain", objectPosition:"bottom", zIndex:6 }} />

        <button style={arrowStyle("left")}  aria-label="Previous"><ChevronLeft /></button>
        <button style={arrowStyle("right")} aria-label="Next"><ChevronRight /></button>
      </div>

      {/* ── SEARCH BAR ── */}
      <div style={{ marginTop:"20px", width:"calc(100% - 60px)", maxWidth:"1000px", position:"relative" }}>
        <input
          type="text"
          placeholder="type your needs here...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width:"100%", padding:"16px 60px 16px 30px", borderRadius:"40px", border:"none", outline:"none", fontSize:"15px", color:"#999", fontFamily:"'Georgia', serif", fontStyle:"italic", background:"rgba(255,255,255,0.82)", boxShadow:"0 4px 16px rgba(0,0,0,0.08)", boxSizing:"border-box" }}
        />
        <button style={{ position:"absolute", right:"6px", top:"50%", transform:"translateY(-50%)", background:"rgba(255,255,255,0.9)", border:"none", borderRadius:"50%", width:"44px", height:"44px", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#888", boxShadow:"0 2px 8px rgba(0,0,0,0.1)" }}>
          <SearchIcon />
        </button>
      </div>

      {/* ── LEVEL UP SECTION ── */}
      <div style={{ width:"calc(100% - 60px)", maxWidth:"1000px", marginTop:"28px" }}>

        {/* Header Level Up YOUR Skin */}
        <div style={{ background:"#fff", borderRadius:"16px", border:"2px solid #f5e6a3", padding:"16px 24px", display:"flex", alignItems:"center", marginBottom:"20px", overflow:"hidden", position:"relative", minHeight:"90px" }}>
          <div style={{ display:"flex", alignItems:"baseline", gap:"10px", flexWrap:"wrap" }}>
            <span style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(32px, 5vw, 52px)", fontWeight:"300", color:"#e07a8a", lineHeight:1 }}>Level Up</span>
            <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"clamp(12px, 2vw, 18px)", fontWeight:"600", color:"#555", letterSpacing:"3px", textTransform:"uppercase" }}>YOUR</span>
            <span style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(32px, 5vw, 52px)", fontWeight:"300", color:"#e07a8a", lineHeight:1 }}>Skin</span>
          </div>
          <img src="/assets/gadiskuning.png" alt="Model" style={{ height:"110px", objectFit:"contain", position:"absolute", right:"16px", bottom:0 }} />
        </div>

        {/* Product Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"16px" }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDidYouKnow={setActiveDidYouKnow}
              onCardClick={() => navigate(`/product/${product.id}`)}
              onWishlist={() => { addToWishlist(product); navigate("/my-wishlist"); }}
              inWishlist={isInWishlist(product.id)}
              onCart={() => { addToCart(product); navigate("/my-cart"); }}
              inCart={isInCart(product.id)}
            />
          ))}
          <DidYouKnowCard product={activeDidYouKnow} />
        </div>

        <p style={{ textAlign:"center", fontFamily:"'Poppins', sans-serif", fontSize:"12px", color:"#aaa", marginTop:"28px", marginBottom:"32px" }}>
          All Right Reserved by Audrey CA
        </p>
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ product, onDidYouKnow, onCardClick, onWishlist, inWishlist, onCart, inCart }) {
  return (
    <div
      onClick={onCardClick}
      style={{ background:"#fff", borderRadius:"16px", border:"2px solid #f5e6a3", padding:"16px", display:"flex", flexDirection:"column", gap:"8px", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", transition:"transform 0.2s, box-shadow 0.2s", cursor:"pointer" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
        if (onDidYouKnow) onDidYouKnow(product);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      <div style={{ width:"100%", aspectRatio:"1/1", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        <img src={product.image} alt={product.name} style={{ width:"100%", height:"100%", objectFit:"contain" }} />
      </div>
      <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:"600", fontSize:"14px", color:"#e07a8a", margin:0 }}>{product.name}</p>
      <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:"600", fontSize:"14px", color:"#e07a8a", margin:0 }}>{product.price}</p>
      <div style={{ display:"flex", justifyContent:"flex-end", gap:"12px", marginTop:"4px" }}>
        <button
          title={inWishlist ? "Sudah di wishlist" : "Add to Wishlist"}
          style={{ background:"none", border:"none", fontSize:"20px", cursor: inWishlist ? "default" : "pointer", padding:"2px", lineHeight:1, opacity: inWishlist ? 0.4 : 1 }}
          onClick={(e) => { e.stopPropagation(); if (!inWishlist) onWishlist(); }}
        >
          🎁
        </button>
        <button
          title={inCart ? "Sudah di keranjang" : "Add to Cart"}
          style={{ background:"none", border:"none", fontSize:"20px", cursor: inCart ? "default" : "pointer", padding:"2px", lineHeight:1, opacity: inCart ? 0.4 : 1 }}
          onClick={(e) => { e.stopPropagation(); if (!inCart) onCart(); }}
        >
          🛒
        </button>
      </div>
    </div>
  );
}

// ── Did You Know Card ─────────────────────────────────────────────────────────
function DidYouKnowCard({ product }) {
  if (!product) return null;
  return (
    <div style={{ background:"#fff", borderRadius:"16px", border:"2px solid #f5e6a3", padding:"20px", display:"flex", alignItems:"center", gap:"16px", gridColumn:"span 2", boxShadow:"0 2px 8px rgba(0,0,0,0.05)", minHeight:"160px" }}>
      <div style={{ flex:1 }}>
        <span style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(28px, 4vw, 42px)", fontWeight:"300", color:"#e07a8a", lineHeight:1.1, display:"block", marginBottom:"10px" }}>
          Did You<br />Know?
        </span>
        <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"13px", color:"#555", margin:0, lineHeight:1.5 }}>
          {product.didYouKnow}
        </p>
      </div>
      <img src={product.image} alt={product.name} style={{ height:"130px", objectFit:"contain", flexShrink:0 }} />
    </div>
  );
}

// ── Arrow button style ────────────────────────────────────────────────────────
function arrowStyle(side) {
  return {
    position:"absolute", top:"50%", [side]:"12px", transform:"translateY(-50%)",
    zIndex:20, background:"rgba(255,255,255,0.75)", border:"none", borderRadius:"50%",
    width:"36px", height:"36px", display:"flex", alignItems:"center", justifyContent:"center",
    cursor:"pointer", color:"#777", boxShadow:"0 2px 8px rgba(0,0,0,0.12)", backdropFilter:"blur(4px)",
  };
}