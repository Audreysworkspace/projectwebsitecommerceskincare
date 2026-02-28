import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";

const paymentMethods = [
  { id:"bank_bca",    type:"bank",    label:"BCA",         detail:"Bank Central Asia", icon:"🏦", color:"#0060ae" },
  { id:"bank_mandiri",type:"bank",    label:"Mandiri",     detail:"Bank Mandiri",      icon:"🏦", color:"#003d79" },
  { id:"credit_card", type:"credit",  label:"Credit Card", detail:"Visa / Mastercard", icon:"💳", color:"#6c5ce7" },
  { id:"gopay",       type:"ewallet", label:"GoPay",       detail:"E-Wallet",          icon:"📱", color:"#00aed6" },
  { id:"ovo",         type:"ewallet", label:"OVO",         detail:"E-Wallet",          icon:"📱", color:"#4c3494" },
  { id:"dana",        type:"ewallet", label:"DANA",        detail:"E-Wallet",          icon:"📱", color:"#118eea" },
];

function Navbar() {
  return (
    <nav style={{ width:"100%", display:"flex", justifyContent:"center", gap:"8px", padding:"18px 24px" }}>
      {["Contacts","My Wishlist","Transaction","My Cart"].map((item) => (
        <Link
          key={item}
          to={item==="My Wishlist"?"/my-wishlist":item==="My Cart"?"/my-cart":item==="Transaction"?"/transaction":`/${item.toLowerCase()}`}
          style={{
            textDecoration:"none",
            color: item==="Transaction" ? "#e07a8a" : "#555",
            fontWeight: item==="Transaction" ? "600" : "400",
            fontSize:"14px", fontFamily:"'Poppins', sans-serif",
            background: item==="Transaction" ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
            backdropFilter:"blur(6px)", padding:"8px 20px", borderRadius:"20px",
            border: item==="Transaction" ? "1.5px solid #e07a8a" : "1px solid rgba(255,255,255,0.9)",
            boxShadow:"0 2px 8px rgba(0,0,0,0.06)",
          }}
        >{item}</Link>
      ))}
    </nav>
  );
}

export default function TransactionPage() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState("form");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [form, setForm] = useState({ name:"", address:"", phone:"" });
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [orderId] = useState("SKN-" + Math.random().toString(36).substr(2,8).toUpperCase());

  const total = cart.reduce((sum, p) => sum + parseInt(p.price.replace(/\D/g,"")), 0);
  const successTotal = purchasedItems.reduce((sum, p) => sum + parseInt(p.price.replace(/\D/g,"")), 0);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (!form.phone.trim()) e.phone = "Nomor HP wajib diisi";
    if (!selectedPayment) e.payment = "Pilih metode pembayaran";
    return e;
  };

  const handleCheckout = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setPurchasedItems([...cart]);
    cart.forEach((p) => removeFromCart(p.id));
    setStep("success");
  };

  const paymentLabel = paymentMethods.find((p) => p.id === selectedPayment)?.label || "";

  // ── SUCCESS SCREEN ────────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div style={{ minHeight:"100vh", backgroundColor:"#f9b8cb", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Poppins', sans-serif" }}>
        <Navbar />
        <div style={{ width:"calc(100% - 48px)", maxWidth:"480px", paddingBottom:"40px" }}>
          <div style={{
            background:"rgba(255,255,255,0.78)",
            borderRadius:"24px", border:"1.5px solid rgba(255,255,255,0.9)",
            padding:"32px 24px", textAlign:"center",
            boxShadow:"0 8px 32px rgba(224,122,138,0.15)",
          }}>
            {/* Big check */}
            <div style={{
              width:"80px", height:"80px", borderRadius:"50%",
              background:"linear-gradient(135deg, #f9b8cb, #ffd6e8)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 18px", fontSize:"38px",
              boxShadow:"0 4px 16px rgba(224,122,138,0.3)",
            }}>✓</div>

            <p style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"30px", fontWeight:"300", color:"#e07a8a", margin:"0 0 4px" }}>
              Pembayaran Berhasil!
            </p>
            <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", color:"#bbb", margin:"0 0 20px" }}>
              Terima kasih sudah berbelanja di Skineeds 🌸
            </p>

            {/* Status badge */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"linear-gradient(135deg,#d4edda,#c8f0d4)", borderRadius:"20px", padding:"8px 20px", marginBottom:"20px" }}>
              <span>✅</span>
              <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:"600", color:"#2d7a3a" }}>LUNAS · Pesanan Diproses</span>
            </div>

            {/* Order details */}
            <div style={{ background:"rgba(249,184,203,0.12)", borderRadius:"14px", padding:"16px", marginBottom:"16px", textAlign:"left" }}>
              <Row label="Order ID"      value={orderId} />
              <Row label="Nama"          value={form.name} />
              <Row label="Alamat"        value={form.address} />
              <Row label="No. HP"        value={form.phone} />
              <Row label="Pembayaran"    value={paymentLabel} />
              <div style={{ borderTop:"1px dashed rgba(224,122,138,0.3)", margin:"10px 0" }} />
              <Row label="Total Dibayar" value={`Rp ${successTotal.toLocaleString("id-ID")}`} bold />
            </div>

            {/* Purchased items */}
            <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#bbb", margin:"0 0 8px", textAlign:"left" }}>Produk yang dibeli:</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"24px" }}>
              {purchasedItems.map((item, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", background:"rgba(255,255,255,0.7)", borderRadius:"10px", padding:"8px 12px" }}>
                  <img src={item.image} alt={item.name} style={{ width:"36px", height:"36px", objectFit:"contain" }} />
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", color:"#666", flex:1, textAlign:"left" }}>{item.name}</span>
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:"600", color:"#e07a8a" }}>{item.price}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/")}
              style={{ width:"100%", padding:"12px", borderRadius:"20px", border:"none", background:"#e07a8a", color:"#fff", fontFamily:"'Poppins', sans-serif", fontSize:"14px", fontWeight:"600", cursor:"pointer", boxShadow:"0 4px 12px rgba(224,122,138,0.4)", transition:"background 0.2s" }}
              onMouseEnter={(e)=>(e.currentTarget.style.background="#d06070")}
              onMouseLeave={(e)=>(e.currentTarget.style.background="#e07a8a")}
            >
              Kembali Belanja 🛍️
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── FORM SCREEN ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight:"100vh", backgroundColor:"#f9b8cb", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"'Poppins', sans-serif" }}>
      <Navbar />

      <div style={{ width:"calc(100% - 48px)", maxWidth:"480px", display:"flex", flexDirection:"column", gap:"14px", paddingBottom:"40px" }}>

        {/* Brand header */}
        <div style={{ background:"linear-gradient(135deg,#b8dff5,#ceeaf7)", borderRadius:"20px", padding:"14px 24px 16px", textAlign:"center", position:"relative", overflow:"hidden", boxShadow:"0 4px 16px rgba(0,0,0,0.08)" }}>
          <div style={{ position:"absolute", inset:"5px", border:"1.5px dashed rgba(255,255,255,0.65)", borderRadius:"15px", pointerEvents:"none" }} />
          <p style={{ margin:"0 0 2px", fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:"500", color:"#666", letterSpacing:"3px", textTransform:"uppercase" }}>Skin To Skin</p>
          <p style={{ margin:0, fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"clamp(38px,9vw,58px)", fontWeight:"300", color:"#c06080", lineHeight:1 }}>Skinneeds</p>
        </div>

        {/* Title */}
        <div style={{ background:"rgba(255,255,255,0.55)", borderRadius:"14px", padding:"11px 16px", textAlign:"center", border:"1px solid rgba(255,255,255,0.8)" }}>
          <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:"clamp(20px,4vw,26px)", fontWeight:"700", color:"#d4a843", letterSpacing:"8px", textTransform:"uppercase" }}>CHECKOUT</span>
        </div>

        {cart.length === 0 ? (
          <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:"16px", padding:"40px", textAlign:"center" }}>
            <p style={{ color:"#e07a8a", margin:"0 0 10px" }}>Keranjang kosong 🛒</p>
            <Link to="/" style={{ color:"#aaa", fontSize:"13px", textDecoration:"none" }}>← Belanja dulu yuk</Link>
          </div>
        ) : (
          <>
            {/* Order summary */}
            <Section title="🛍️ Ringkasan Pesanan">
              {cart.map((p) => (
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"8px" }}>
                  <img src={p.image} alt={p.name} style={{ width:"40px", height:"40px", objectFit:"contain", borderRadius:"8px", border:"1px solid #f5e6a3", background:"#fff", padding:"2px" }} />
                  <span style={{ flex:1, fontFamily:"'Poppins', sans-serif", fontSize:"12px", color:"#666" }}>{p.name}</span>
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:"600", color:"#e07a8a" }}>{p.price}</span>
                </div>
              ))}
              <div style={{ borderTop:"1px dashed rgba(224,122,138,0.3)", paddingTop:"10px", marginTop:"4px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"13px", fontWeight:"600", color:"#888" }}>Total</span>
                <span style={{ fontFamily:"'Cormorant Garamond', serif", fontStyle:"italic", fontSize:"20px", fontWeight:"700", color:"#e07a8a" }}>Rp {total.toLocaleString("id-ID")}</span>
              </div>
            </Section>

            {/* Buyer form */}
            <Section title="👤 Data Pembeli">
              <Field label="Nama Lengkap" value={form.name} error={errors.name} placeholder="contoh: Audrey CA" onChange={(v)=>setForm({...form,name:v})} />
              <Field label="Alamat Pengiriman" value={form.address} error={errors.address} placeholder="Jl. AH Nasution No 578, Medan..." multiline onChange={(v)=>setForm({...form,address:v})} />
              <Field label="Nomor HP" value={form.phone} error={errors.phone} placeholder="+62 812 xxxx xxxx" onChange={(v)=>setForm({...form,phone:v})} />
            </Section>

            {/* Payment */}
            <Section title="💳 Metode Pembayaran">
              {errors.payment && <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#e07a8a", margin:"0 0 8px" }}>⚠ {errors.payment}</p>}

              <p style={labelStyle}>Transfer Bank</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"14px" }}>
                {paymentMethods.filter(p=>p.type==="bank").map(pm=>(
                  <PaymentOption key={pm.id} pm={pm} selected={selectedPayment} onSelect={setSelectedPayment} />
                ))}
              </div>

              <p style={labelStyle}>Kartu Kredit</p>
              <div style={{ marginBottom:"14px" }}>
                {paymentMethods.filter(p=>p.type==="credit").map(pm=>(
                  <PaymentOption key={pm.id} pm={pm} selected={selectedPayment} onSelect={setSelectedPayment} />
                ))}
              </div>

              <p style={labelStyle}>E-Wallet</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"8px" }}>
                {paymentMethods.filter(p=>p.type==="ewallet").map(pm=>(
                  <PaymentOption key={pm.id} pm={pm} selected={selectedPayment} onSelect={setSelectedPayment} />
                ))}
              </div>
            </Section>

            {/* Status tracker */}
            <Section title="📦 Status Pesanan">
              {[
                { icon:"🟡", label:"Menunggu Pembayaran", active:true },
                { icon:"⚪", label:"Pesanan Diproses",    active:false },
                { icon:"⚪", label:"Dalam Pengiriman",    active:false },
                { icon:"⚪", label:"Selesai",             active:false },
              ].map((s,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
                  <span style={{ fontSize:"14px" }}>{s.icon}</span>
                  <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"12px", color:s.active?"#e07a8a":"#ccc", fontWeight:s.active?"600":"400" }}>{s.label}</span>
                </div>
              ))}
            </Section>

            {/* Pay button */}
            <button
              onClick={handleCheckout}
              style={{ width:"100%", padding:"14px", borderRadius:"20px", border:"none", background:"linear-gradient(135deg,#e07a8a,#d06070)", color:"#fff", fontFamily:"'Poppins', sans-serif", fontSize:"15px", fontWeight:"600", cursor:"pointer", boxShadow:"0 6px 20px rgba(224,122,138,0.45)", transition:"transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(224,122,138,0.55)"; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(224,122,138,0.45)"; }}
            >
              Bayar Sekarang 💳
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const labelStyle = { fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#aaa", margin:"0 0 6px", letterSpacing:"1px", textTransform:"uppercase" };

function Section({ title, children }) {
  return (
    <div style={{ background:"rgba(255,255,255,0.6)", borderRadius:"16px", border:"1.5px solid rgba(255,255,255,0.85)", padding:"16px 18px" }}>
      <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"13px", fontWeight:"600", color:"#888", margin:"0 0 12px" }}>{title}</p>
      {children}
    </div>
  );
}

function Field({ label, value, error, placeholder, onChange, multiline }) {
  const s = { width:"100%", padding:"10px 14px", borderRadius:"12px", border:error?"1.5px solid #e07a8a":"1.5px solid rgba(224,122,138,0.25)", outline:"none", fontFamily:"'Poppins', sans-serif", fontSize:"13px", color:"#555", background:"rgba(255,255,255,0.8)", boxSizing:"border-box", resize:"none", fontFamily:"'Poppins', sans-serif" };
  return (
    <div style={{ marginBottom:"10px" }}>
      <label style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#aaa", display:"block", marginBottom:"4px" }}>{label}</label>
      {multiline ? <textarea rows={3} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={s} /> : <input type="text" placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} style={s} />}
      {error && <p style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#e07a8a", margin:"3px 0 0" }}>⚠ {error}</p>}
    </div>
  );
}

function PaymentOption({ pm, selected, onSelect }) {
  const isSelected = selected === pm.id;
  return (
    <div
      onClick={()=>onSelect(pm.id)}
      style={{ padding:"10px 12px", borderRadius:"12px", border:isSelected?`2px solid ${pm.color}`:"1.5px solid rgba(200,200,200,0.4)", background:isSelected?`${pm.color}18`:"rgba(255,255,255,0.7)", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", transition:"all 0.2s", boxShadow:isSelected?`0 2px 8px ${pm.color}30`:"none" }}
    >
      <span style={{ fontSize:"16px" }}>{pm.icon}</span>
      <div style={{ flex:1 }}>
        <p style={{ margin:0, fontFamily:"'Poppins', sans-serif", fontSize:"12px", fontWeight:"600", color:isSelected?pm.color:"#666" }}>{pm.label}</p>
        <p style={{ margin:0, fontFamily:"'Poppins', sans-serif", fontSize:"10px", color:"#aaa" }}>{pm.detail}</p>
      </div>
      {isSelected && <span style={{ fontSize:"12px", color:pm.color }}>✓</span>}
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
      <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", color:"#aaa" }}>{label}</span>
      <span style={{ fontFamily:"'Poppins', sans-serif", fontSize:"11px", fontWeight:bold?"700":"500", color:bold?"#e07a8a":"#666", maxWidth:"60%", textAlign:"right" }}>{value}</span>
    </div>
  );
}