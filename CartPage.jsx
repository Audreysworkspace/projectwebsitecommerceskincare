import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, p) => {
    const num = parseInt(p.price.replace(/\D/g, ""));
    return sum + num;
  }, 0);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f9b8cb",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontFamily: "'Poppins', sans-serif",
    }}>

      {/* ── NAV ── */}
      <nav style={{ width:"100%", display:"flex", justifyContent:"center", gap:"8px", padding:"18px 24px" }}>
        {["Contacts", "My Wishlist", "Transaction", "My Cart"].map((item) => (
          <Link
            key={item}
            to={item === "My Wishlist" ? "/my-wishlist" : item === "My Cart" ? "/my-cart" : `/${item.toLowerCase().replace(" ", "-")}`}
            style={{
              textDecoration: "none",
              color: item === "My Cart" ? "#e07a8a" : "#555",
              fontWeight: item === "My Cart" ? "600" : "400",
              fontSize: "14px",
              fontFamily: "'Poppins', sans-serif",
              background: item === "My Cart" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
              backdropFilter: "blur(6px)",
              padding: "8px 20px",
              borderRadius: "20px",
              border: item === "My Cart" ? "1.5px solid #e07a8a" : "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            {item}
          </Link>
        ))}
      </nav>

      {/* ── BRAND HEADER ── */}
      <div style={{
        width: "calc(100% - 48px)",
        maxWidth: "480px",
        background: "linear-gradient(135deg, #b8dff5 0%, #ceeaf7 100%)",
        borderRadius: "20px",
        padding: "14px 24px 16px",
        textAlign: "center",
        marginBottom: "14px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position:"absolute", inset:"5px", border:"1.5px dashed rgba(255,255,255,0.65)", borderRadius:"15px", pointerEvents:"none" }} />
        <p style={{ margin:"0 0 2px 0", fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:"500", color:"#666", letterSpacing:"3px", textTransform:"uppercase" }}>
          Skin To Skin
        </p>
        <p style={{ margin:0, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(38px, 9vw, 58px)", fontWeight:"300", color:"#c06080", lineHeight:1 }}>
          Skinneeds
        </p>
      </div>

      {/* ── MY CART TITLE ── */}
      <div style={{
        width: "calc(100% - 48px)",
        maxWidth: "480px",
        background: "rgba(255,255,255,0.55)",
        borderRadius: "14px",
        padding: "11px 16px",
        textAlign: "center",
        marginBottom: "18px",
        border: "1px solid rgba(255,255,255,0.8)",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(20px, 4vw, 26px)",
          fontWeight: "700",
          color: "#d4a843",
          letterSpacing: "8px",
          textTransform: "uppercase",
        }}>
          MY CART
        </span>
      </div>

      {/* ── CART ITEMS ── */}
      <div style={{ width:"calc(100% - 48px)", maxWidth:"480px", display:"flex", flexDirection:"column", gap:"14px" }}>
        {cart.length === 0 ? (
          <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:"16px", padding:"48px 24px", textAlign:"center" }}>
            <p style={{ color:"#e07a8a", fontSize:"15px", margin:"0 0 10px 0" }}>Keranjang-mu masih kosong 🛒</p>
            <Link to="/" style={{ color:"#aaa", fontSize:"13px", textDecoration:"none" }}>
              ← Kembali ke Home untuk belanja
            </Link>
          </div>
        ) : (
          <>
            {cart.map((product) => (
              <CartCard
                key={product.id}
                product={product}
                onRemove={() => removeFromCart(product.id)}
              />
            ))}

            {/* Total */}
            <div style={{
              background: "rgba(255,255,255,0.75)",
              borderRadius: "16px",
              border: "1.5px solid rgba(255,255,255,0.9)",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "4px",
            }}>
              <div>
                <p style={{ margin:0, fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#aaa" }}>Total Belanja</p>
                <p style={{ margin:0, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"22px", fontWeight:"700", color:"#e07a8a" }}>
                  Rp {total.toLocaleString("id-ID")}
                </p>
              </div>
              <button
                onClick={() => navigate("/transaction")}
                style={{
                  padding: "10px 24px",
                  borderRadius: "20px",
                  border: "none",
                  background: "#e07a8a",
                  color: "#fff",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(224,122,138,0.4)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#d06070")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#e07a8a")}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        width: "calc(100% - 48px)",
        maxWidth: "480px",
        background: "#f5e6a3",
        borderRadius: "16px",
        padding: "18px 22px 16px",
        marginTop: "28px",
        marginBottom: "10px",
      }}>
        <p style={{ fontFamily:"'Poppins', sans-serif", fontWeight:"700", fontSize:"14px", color:"#333", margin:"0 0 12px 0" }}>
          Skineeds Coorperation.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px 16px" }}>
          {[
            { icon:"☎", text:"+62954329864" },
            { icon:"◎", text:"@skineeds.co" },
            { icon:"✉", text:"skineedscare@gmail.com" },
            { icon:"✦", text:"@skineeds.co" },
            { icon:"⊕", text:"Jl. AH Nasution No 578, Medan Johor, Medan, Sumatera Utara" },
            { icon:"◈", text:"@skineeds.co" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:"7px" }}>
              <span style={{ fontSize:"12px", color:"#888", marginTop:"1px", flexShrink:0 }}>{item.icon}</span>
              <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"10.5px", color:"#555", lineHeight:1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"10px", color:"#c0a0a8", marginBottom:"20px", marginTop:"6px" }}>
        All Right Reserved by Audrey CA
      </p>
    </div>
  );
}

// ── Cart Card ────────────────────────────────────────────────────────────────
function CartCard({ product, onRemove }) {
  return (
    <div style={{
      background: "rgba(200,230,248,0.45)",
      borderRadius: "16px",
      border: "1.5px solid rgba(255,255,255,0.75)",
      padding: "14px",
      display: "flex",
      alignItems: "center",
      gap: "14px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    }}>
      {/* Image box */}
      <div style={{
        background: "#fff",
        border: "2px solid #f0df90",
        borderRadius: "12px",
        width: "105px",
        height: "95px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>
        <img src={product.image} alt={product.name} style={{ maxWidth:"88%", maxHeight:"82px", objectFit:"contain" }} />
      </div>

      {/* Info */}
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ margin:"0 0 2px 0", fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"17px", fontWeight:"600", color:"#e07a8a", lineHeight:1.3 }}>
          {product.name}
        </p>
        <p style={{ margin:"0 0 10px 0", fontFamily:"'Poppins', sans-serif", fontSize:"13px", fontWeight:"600", color:"#e07a8a" }}>
          {product.price}
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <button
            onClick={() => alert("Fitur checkout segera hadir! 🎉")}
            style={{
              padding: "7px 18px",
              borderRadius: "16px",
              border: "none",
              background: "rgba(255,255,255,0.85)",
              color: "#6688bb",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11.5px",
              fontWeight: "500",
              cursor: "pointer",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d8eaf8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.85)")}
          >
            checkout
          </button>
          <button
            onClick={onRemove}
            title="Hapus dari keranjang"
            style={{
              padding: "7px 12px",
              borderRadius: "16px",
              border: "1.5px solid rgba(224,122,138,0.4)",
              background: "transparent",
              color: "#e07a8a",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "11px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(224,122,138,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            ✕ hapus
          </button>
        </div>
      </div>
    </div>
  );
}