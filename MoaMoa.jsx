import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, User, Star, ChevronRight, Heart,
  Leaf, ArrowRight, Check,
  Instagram, Facebook, Youtube, Mail, Phone, MapPin,
  Baby, Sparkles, FlaskConical, ChevronDown, Menu, X, Plus
} from "lucide-react";

/* ─── DESIGN TOKENS (EARTH TONES) ───────────────── */
const C = {
  cream: "#F9F6F0",
  creamDark: "#F0EAE1",
  brown: "#7A4326",
  brownMid: "#9E5B36",
  brownPale: "#F3EBE6",
  olive: "#5D7530",
  oliveMid: "#708C3A",
  olivePale: "#EBF0E0",
  terra: "#C04A3B",
  terraPale: "#FAEAE8",
  charcoal: "#2D2D2D",
  muted: "#555555",
  mutedLight: "#888888",
  white: "#FFFFFF",
  border: "#E5DDD3",
};

/* ─── HOOK: INTERSECTION OBSERVER ───────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── UI COMPONENTS ─────────────────────────────── */
const HoverButton = ({ children, primary = false, small = false, terra = false, onClick }) => {
  const [hov, setHov] = useState(false);
  const bg = terra ? C.terra : primary ? C.brown : "transparent";
  const bgH = terra ? "#A03B2E" : primary ? C.brownMid : C.brownPale;
  const border = terra ? C.terra : primary ? C.brown : C.brown;

  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: small ? "9px 20px" : "13px 28px",
        borderRadius: 40, border: `1.5px solid ${border}`,
        background: hov ? bgH : bg,
        color: (primary || terra) ? "white" : hov ? C.brown : C.brown,
        fontFamily: "'Montserrat', sans-serif",
        fontSize: small ? "0.72rem" : "0.82rem",
        fontWeight: 600, letterSpacing: "0.05em", cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? (primary ? "0 8px 24px rgba(122,67,38,0.25)" : "0 4px 12px rgba(122,67,38,0.1)") : "none",
        whiteSpace: "nowrap",
      }}>
      {children}
    </button>
  );
};

const SectionTitle = ({ eyebrow, title, subtitle, center = false }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{
      textAlign: center ? "center" : "left", maxWidth: center ? 620 : "100%",
      margin: center ? "0 auto 3.5rem" : "0 0 3rem",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s ease"
    }}>
      {eyebrow && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 1.5, background: C.brown }} />
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
            color: C.brown, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase"
          }}>
            {eyebrow}
          </span>
          <div style={{ width: 24, height: 1.5, background: C.brown }} />
        </div>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 700,
        color: C.charcoal, lineHeight: 1.25, marginBottom: "0.75rem"
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
          color: C.muted, lineHeight: 1.75
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* ─── NAVBAR ─────────────────────────────────────── */
const Navbar = ({ cartCount = 2 }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = [
    { label: "Câu chuyện", sub: "Story" },
    { label: "Sản phẩm", sub: "Shop" },
    { label: "Cẩm nang", sub: "Blog" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
      background: scrolled ? "rgba(249,246,240,0.92)" : "rgba(249,246,240,0.4)",
      backdropFilter: "blur(20px) saturate(180%)",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      boxShadow: scrolled ? "0 4px 30px rgba(122,67,38,0.06)" : "none",
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 80
      }}>

        {/* Logo & Text */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/logo.png" alt="MoaMoa" style={{ position: "absolute", width: "250%", height: "250%", objectFit: "contain" }} />
          </div>
          <div className="desktop-only">
            <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 800,
              background: `linear-gradient(135deg, ${C.brown} 0%, ${C.olive} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              letterSpacing: "0.03em", lineHeight: 1
            }}>
              MoaMoa
            </div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.52rem",
              color: C.brownMid, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2
            }}>
              Pure • Natural • Vietnamese
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="desktop-flex" style={{ gap: "2.5rem", alignItems: "center" }}>
          {navLinks.map(({ label, sub }) => (
            <a key={label} href="#" className="nav-item" style={{ textDecoration: "none", textAlign: "center", cursor: "pointer" }}>
              <div className="nav-label" style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem",
                fontWeight: 600, color: C.charcoal, letterSpacing: "0.03em",
                transition: "color 0.2s"
              }}>
                {label}
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem",
                color: C.mutedLight, letterSpacing: "0.08em"
              }}>
                {sub}
              </div>
            </a>
          ))}
        </div>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {[Search, User].map((Icon, i) => (
            <button key={i} className="icon-btn" style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 8, borderRadius: 8, color: C.charcoal,
              transition: "background 0.2s, color 0.2s"
            }}>
              <Icon size={18} strokeWidth={1.5} />
            </button>
          ))}
          <button className="icon-btn" style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, borderRadius: 8, color: C.charcoal, position: "relative",
            transition: "background 0.2s, color 0.2s"
          }}>
            <ShoppingCart size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: 4, right: 4, width: 16, height: 16,
                borderRadius: "50%", background: C.terra, color: "white",
                fontSize: "0.58rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {cartCount}
              </span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, color: C.charcoal }}
            className="mobile-flex">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: "hidden", maxHeight: mobileOpen ? 320 : 0,
        transition: "max-height 0.4s ease", background: "rgba(249,246,240,0.98)",
        borderTop: mobileOpen ? `1px solid ${C.border}` : "none",
      }}>
        {navLinks.map(({ label, sub }) => (
          <a key={label} href="#" style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "14px 24px", textDecoration: "none",
            borderBottom: `1px solid ${C.border}`
          }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
              fontWeight: 600, color: C.charcoal
            }}>{label}</span>
            <span style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
              color: C.mutedLight
            }}>{sub}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

/* ─── CẬP NHẬT HERO COMPONENT ────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const products = [
    { id: "sp_gac", label: "Gấc", image: "/daugac.png", emoji: "🍊", color: "#E05A3D", price: 189000 },
    { id: "sp_olive", label: "Olive", image: "/dauolive.png", emoji: "🫒", color: "#708C3A", price: 245000 },
    { id: "sp_gao", label: "Gạo", image: "/daugao.png", emoji: "🌾", color: "#D4A373", price: 175000 },
    { id: "sp_bo", label: "Bơ", image: "/daubo.png", emoji: "🥑", color: "#4A7C2F", price: 210000 },
    { id: "sp_me", label: "Mè", image: "/daume.png", emoji: "🌱", color: "#2D2D2D", price: 165000 },
  ];

  // HÀM XỬ LÝ CHUẨN BỊ CHO BACKEND
  const handleAddToCart = () => {
    const selectedProduct = products[activeIndex];
    console.log("Payload gửi lên Backend:", selectedProduct);
    // TODO: Dispatch action Redux hoặc gọi API thêm vào giỏ hàng tại đây
    // alert(`Đã thêm Dầu ${selectedProduct.label} vào giỏ!`); 
  };

  const BrandName = () => (
    <span style={{
      background: "linear-gradient(135deg, #A03B2E 0%, #d48351 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      display: "inline-block",
      fontWeight: "inherit"
    }}>
      MoaMoa
    </span>
  );

  return (
    <section className="hero-section" style={{
      backgroundColor: "#F9F6F0", position: "relative",
      display: "flex", alignItems: "center", overflow: "hidden"
    }}>
      <style>{`
        @keyframes blob-float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes blob-float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 60px) scale(1.15); }
          66% { transform: translate(30px, -30px) scale(0.85); }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .glass-badge {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(122, 67, 38, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-badge:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 12px 40px rgba(122, 67, 38, 0.15);
        }
        .primary-btn {
          transition: all 0.3s ease;
        }
        .primary-btn:hover {
          transform: translateY(-3px);
          background: #9E5B36 !important;
          box-shadow: 0 12px 28px rgba(122, 67, 38, 0.35) !important;
        }
        .secondary-btn {
          transition: all 0.3s ease;
        }
        .secondary-btn:hover {
          transform: translateY(-3px);
          background: rgba(122, 67, 38, 0.06) !important; /* Xám nhạt, viền giữ nguyên */
          border-color: #5D331D !important;
          color: #5D331D !important;
        }
        .micro-tag {
          transition: all 0.3s ease;
        }
        .micro-tag:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.9) !important;
          box-shadow: 0 6px 16px rgba(122, 67, 38, 0.08);
        }

        /* RESPONSIVE HÌNH ẢNH & TEXT CHAI DẦU */
        .product-img {
          height: 80%;
          object-fit: contain;
          transform: scale(1.1) translateY(10px); /* Mobile size */
          transform-origin: bottom center;
          filter: drop-shadow(0 20px 25px rgba(122,67,38,0.2));
        }
        .product-name-label {
          margin-top: 1.5rem;
          transform: translateY(0) translateX(0);
        }
        @media (min-width: 769px) {
          .product-img {
            height: 85%;
            transform: scale(1.5) translateY(40px); /* Desktop size */
            filter: drop-shadow(0 35px 45px rgba(122,67,38,0.25));
          }
          .product-name-label {
            margin-top: 2.5rem;
            transform: translateY(40px) translateX(-20px);
            position: relative;
            z-index: 10;
          }
        }
      `}</style>

      {/* Blobs */}
      <div style={{ position: "absolute", top: "-15%", right: "-5%", width: "45vw", height: "45vw", background: "rgba(112, 140, 58, 0.15)", filter: "blur(100px)", borderRadius: "50%", animation: "blob-float-1 18s infinite ease-in-out", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "50vw", height: "50vw", background: "rgba(192, 74, 59, 0.12)", filter: "blur(120px)", borderRadius: "50%", animation: "blob-float-2 22s infinite ease-in-out reverse", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "30%", left: "30%", width: "35vw", height: "35vw", background: "rgba(212, 163, 115, 0.15)", filter: "blur(90px)", borderRadius: "50%", animation: "blob-float-1 25s infinite ease-in-out 2s", pointerEvents: "none", zIndex: 0 }} />

      {/* Trust Badges */}
      <div className="glass-badge desktop-only" style={{ position: "absolute", top: "25%", right: "12%", zIndex: 10, borderRadius: "20px", padding: "12px 18px", display: "flex", alignItems: "center", gap: "10px", animation: "badge-float 5s infinite ease-in-out", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 0.8s" }}>
        <span style={{ fontSize: "1.4rem", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>⭐</span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem", fontWeight: 700, color: "#2D2D2D" }}>4.9/5 Đánh giá</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", color: "#888" }}>Trên 2,000+ lượt</span>
        </div>
      </div>

      <div className="glass-badge desktop-only" style={{ position: "absolute", bottom: "35%", right: "38%", zIndex: 10, borderRadius: "20px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", animation: "badge-float 6s infinite ease-in-out 1.5s", opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.2s" }}>
        <span style={{ fontSize: "1.2rem" }}>👨‍👩‍👧‍👦</span>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#2D2D2D" }}>10.000+ Mẹ tin dùng</span>
      </div>

      <div className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem", alignItems: "center", width: "100%", position: "relative", zIndex: 2 }}>

        {/* CỘT TRÁI: TEXT */}
        <div>
          <div className="micro-tag" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", borderRadius: 30, background: "rgba(255, 255, 255, 0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255, 255, 255, 0.6)", marginBottom: "1.5rem", cursor: "default", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 0.7s ease 0.1s" }}>
            <Leaf size={14} color="#708C3A" strokeWidth={2.5} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "#708C3A", letterSpacing: "0.1em", textTransform: "uppercase" }}>100% Tự nhiên · VietGAP</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 700, color: "#2D2D2D", lineHeight: 1.2, marginBottom: "1.25rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.2s" }}>
            <BrandName /> <br />Giọt dầu cho <em style={{ color: "#7A4326", fontStyle: "italic" }}>bấc lửa</em><br />yêu thương
          </h1>

          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem", color: "#555", lineHeight: 1.8, maxWidth: 460, marginBottom: "2rem", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s ease 0.35s" }}>
            Dầu ăn dặm cao cấp 100% tự nhiên từ nguồn nông sản Việt. <span style={{ color: "#9E5B36", fontWeight: 600 }}>The Chef's kiss</span> cho hành trình lớn khôn của con cùng <BrandName />.
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)", transition: "all 0.8s ease 0.5s" }}>
            {/* Nút Primary gọi hàm Backend */}
            <button onClick={handleAddToCart} className="primary-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 40, border: "none", background: "#7A4326", color: "white", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", fontWeight: 600, boxShadow: "0 8px 24px rgba(122,67,38,0.25)" }}>
              <Sparkles size={15} strokeWidth={2} />
              Mua ngay - Dầu {products[activeIndex].label}
            </button>
            {/* Nút Secondary fix màu */}
            <button className="secondary-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 28px", borderRadius: 40, border: "1.5px solid #7A4326", background: "transparent", color: "#7A4326", cursor: "pointer", fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem", fontWeight: 600 }}>
              Câu chuyện <BrandName />
              <ChevronRight size={15} strokeWidth={2} />
            </button>
          </div>

          <div style={{ display: "flex", gap: "1.2rem", marginTop: "2.5rem", flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)", transition: "all 0.8s ease 0.65s" }}>
            {[{ icon: Baby, text: "Từ 6 tháng tuổi" }, { icon: Check, text: "Non-GMO" }].map(({ icon: Icon, text }) => (
              <div key={text} className="micro-tag" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "default", background: "rgba(255, 255, 255, 0.45)", padding: "6px 14px 6px 6px", borderRadius: 30, border: "1px solid rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(122,67,38,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={14} color="#7A4326" strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "#555", fontWeight: 600 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI: SẢN PHẨM */}
        <div style={{ position: "relative", height: 500, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: "all 1s ease 0.4s" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(122,67,38,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

          <div style={{ position: "relative", width: "100%", height: "100%", zIndex: 1 }}>
            {products.map((p, i) => (
              <div key={p.label} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", opacity: activeIndex === i ? 1 : 0, transform: activeIndex === i ? "translateX(0) scale(1)" : (i > activeIndex ? "translateX(40px) scale(0.95)" : "translateX(-40px) scale(0.95)"), transition: "all 0.6s cubic-bezier(0.25, 1, 0.5, 1)", pointerEvents: activeIndex === i ? "auto" : "none" }}>

                <img className="product-img" src={p.image} alt={p.label} />

                <div className="product-name-label" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "#2D2D2D" }}>
                  {p.emoji} Dầu {p.label}
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "1rem", zIndex: 10 }}>
            {products.map((p, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} style={{ width: activeIndex === i ? 22 : 12, height: activeIndex === i ? 22 : 12, borderRadius: "50%", background: p.color, border: activeIndex === i ? `3px solid white` : "2px solid transparent", boxShadow: activeIndex === i ? `0 0 0 2px ${p.color}, 0 6px 12px rgba(0,0,0,0.15)` : "0 4px 8px rgba(0,0,0,0.1)", cursor: "pointer", transition: "all 0.3s cubic-bezier(0.25, 1, 0.5, 1)" }} title={p.label} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "bounce 2s ease-in-out infinite", opacity: 0.6, cursor: "pointer" }}>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", color: "#555", letterSpacing: "0.15em", textTransform: "uppercase" }}>Khám phá</span>
        <ChevronDown size={16} color="#7A4326" />
      </div>
    </section>
  );
};

/* ─── TRUST STRIP (CHỨNG NHẬN & CAM KẾT) ───────────────── */
const TrustStrip = () => {
  const trusts = [
    { title: "KHÔNG CHẤT BẢO QUẢN", desc: "100% tinh chất ép lạnh mộc mạc", icon: "🌱" },
    { title: "ĐẠT CHUẨN VIETGAP", desc: "Vùng nguyên liệu kiểm soát nghiêm ngặt", icon: "🛡️" },
    { title: "KHÔNG BIẾN ĐỔI GEN (NON-GMO)", desc: "An toàn tuyệt đối cho hệ tiêu hóa của bé", icon: "🔬" },
    { title: "BÁC SĨ KHUYÊN DÙNG", desc: "Công thức tối ưu cho bé từ 6 tháng tuổi", icon: "🩺" },
  ];

  return (
    <div style={{ background: C.olivePale, borderBottom: `1px solid ${C.border}`, padding: "2rem 1.5rem" }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem"
      }}>
        {trusts.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontSize: "2rem", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))" }}>
              {item.icon}
            </div>
            <div>
              <h4 style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
                fontWeight: 700, color: C.olive, letterSpacing: "0.05em", marginBottom: 2
              }}>
                {item.title}
              </h4>
              <p style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
                color: C.charcoal, opacity: 0.8, lineHeight: 1.4
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ─── BRAND STORY ────────────────────────────────── */
const BrandStory = () => {
  return (
    <section style={{ background: C.cream, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="standard-grid" style={{ alignItems: "center" }}>
          <div>
            <SectionTitle
              eyebrow="Từ Mộc Hoa đến MoaMoa"
              title={<>Tên thương hiệu mang<br /><em style={{ color: C.brown }}>tiếng hôn của mẹ</em></>}
            />

            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
              color: C.muted, lineHeight: 1.85, marginBottom: "1.25rem"
            }}>
              <strong style={{ color: C.charcoal }}>"MoaMoa"</strong> — âm thanh của nụ hôn mẹ trao con mỗi sáng, cũng là tiếng cười của bé khi thưởng thức bữa ăn dặm đầu tiên. Mỗi giọt dầu không chỉ mang trọn dưỡng chất tự nhiên, mà còn là chất xúc tác thắp sáng <strong style={{ color: C.brown }}>bấc lửa yêu thương</strong> trong từng bữa ăn gia đình.
            </p>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
              color: C.muted, lineHeight: 1.85, marginBottom: "2rem"
            }}>
              Sự giao thoa giữa tiêu chuẩn khắt khe "The Chef's kiss" và nét mộc mạc của nông sản Việt. Chúng tôi cam kết hiện đại hóa nền nông nghiệp truyền thống — kết nối trực tiếp từ vùng nguyên liệu đạt chuẩn đến bàn ăn của bé.
            </p>

            {[
              { icon: Leaf, title: "Canh tác tự nhiên", desc: "Không thuốc trừ sâu, không chất bảo quản" },
              { icon: FlaskConical, title: "Công nghệ ép lạnh", desc: "Giữ trọn dưỡng chất thiết yếu" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                display: "flex", gap: 14, marginBottom: "1.1rem",
                padding: "14px 18px", borderRadius: 12,
                background: "rgba(122,67,38,0.04)", border: `1px solid rgba(122,67,38,0.08)`,
                transition: "background 0.2s"
              }}>
                <div style={{
                  width: 38, height: 38, flexShrink: 0, borderRadius: 10,
                  background: C.brownPale, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Icon size={16} color={C.brown} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem",
                    fontWeight: 700, color: C.charcoal, marginBottom: 2
                  }}>{title}</div>
                  <div style={{
                    fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
                    color: C.muted
                  }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "relative", width: "100%" }}>
            <div style={{
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 30px 80px rgba(122,67,38,0.15)",
              border: `3px solid rgba(122,67,38,0.08)`,
              background: "#F0EAE1",
              display: "flex"
            }}>
              <img
                src="/nongsanviet.png"
                alt="Nông sản Việt Nam"
                style={{
                  width: "100%",
                  height: "auto", /* Thả tự do chiều cao để không bị cắt chữ trong ảnh */
                  objectFit: "contain",
                  imageRendering: "-webkit-optimize-contrast", /* Ép trình duyệt render sắc nét khi thu nhỏ */
                  transform: "translateZ(0)" /* Bật tăng tốc phần cứng GPU để chống mờ ảnh */
                }}
              />
            </div>

            <div style={{
              position: "absolute", top: -20, right: -20, padding: "14px 20px",
              borderRadius: 16, background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(16px)", boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
              border: `1px solid ${C.border}`
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
                fontWeight: 700, color: C.olive, lineHeight: 1
              }}>12+</div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
                color: C.muted, marginTop: 2
              }}>Vùng nông sản<br />đối tác</div>
            </div>
            <div style={{
              position: "absolute", bottom: -16, left: -16, padding: "14px 20px",
              borderRadius: 16, background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(16px)", boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
              border: `1px solid ${C.border}`
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
                fontWeight: 700, color: C.terra, lineHeight: 1
              }}>50K+</div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
                color: C.muted, marginTop: 2
              }}>Gia đình tin<br />yêu MoaMoa</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── PRODUCT CARD ───────────────────────────────── */
const ProductCard = ({ product, index, featured = false }) => {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);
  const [ref, vis] = useReveal(0.1);

  useEffect(() => {
    let timer;
    if (added) {
      timer = setTimeout(() => setAdded(false), 1800);
    }
    return () => clearTimeout(timer);
  }, [added]);

  const glowColors = {
    "#FEF0EB": "radial-gradient(circle, rgba(244,115,82,0.2) 0%, transparent 70%)",
    "#EFF6E8": "radial-gradient(circle, rgba(112,140,58,0.2) 0%, transparent 70%)",
    "#FDF8E8": "radial-gradient(circle, rgba(212,163,115,0.25) 0%, transparent 70%)",
    "#EBF2E4": "radial-gradient(circle, rgba(74,124,47,0.2) 0%, transparent 70%)",
    "#F2F0EB": "radial-gradient(circle, rgba(45,45,45,0.12) 0%, transparent 70%)",
  };

  return (
    <div ref={ref} style={{
      background: C.white, borderRadius: 24,
      border: featured ? `2px solid ${C.brown}` : `1.5px solid ${C.border}`,
      overflow: "hidden", position: "relative",
      transform: hov ? "translateY(-10px)" : vis ? "translateY(0)" : "translateY(24px)",
      opacity: vis ? 1 : 0,
      transition: `all 0.45s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.05}s`,
      boxShadow: hov ? "0 30px 60px rgba(122,67,38,0.15)" : "0 8px 24px rgba(122,67,38,0.03)",
      cursor: "pointer",
    }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}>

      {featured && (
        <div style={{
          position: "absolute", top: 16, left: 16, zIndex: 5,
          background: `linear-gradient(135deg, ${C.brown} 0%, ${C.brownMid} 100%)`,
          color: "white", borderRadius: 30, padding: "5px 14px",
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em"
        }}>
          ⭐ CÔNG THỨC VÀNG
        </div>
      )}

      {product.discount && (
        <div style={{
          position: "absolute", top: 16, right: 16, zIndex: 5,
          background: C.terra, color: "white", borderRadius: 30,
          padding: "5px 12px", fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem", fontWeight: 700
        }}>
          -{product.discount}%
        </div>
      )}

      <div style={{
        height: 250, background: product.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden"
      }}>

        <div style={{
          position: "absolute", inset: 0,
          background: glowColors[product.bg] || "none",
          transform: hov ? "scale(1.3)" : "scale(1)",
          transition: "transform 0.6s ease"
        }} />

        <div style={{
          width: "100%", display: "flex", justifyContent: "center", zIndex: 2,
          transform: hov ? "scale(1.1) translateY(-6px)" : "scale(1)",
          filter: hov ? "drop-shadow(0 25px 30px rgba(122,67,38,0.25))" : "drop-shadow(0 10px 15px rgba(122,67,38,0.1))",
          transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)"
        }}>
          <img src={product.image} alt={product.name} style={{ width: "auto", height: "195px", objectFit: "contain" }} />
        </div>

        <div style={{
          position: "absolute", bottom: 14, left: 16,
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)",
          borderRadius: 30, padding: "4px 14px", border: "1px solid rgba(255,255,255,0.6)",
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 600, color: C.charcoal
        }}>
          {product.volume}
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem",
            color: C.olive, background: C.olivePale, padding: "2px 8px", borderRadius: 4, fontWeight: 700, letterSpacing: "0.05em"
          }}>
            {product.coreBenefit || "Dinh dưỡng cao cấp"}
          </span>
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "1.3rem",
          fontWeight: 700, color: C.charcoal, margin: "0 0 6px", lineHeight: 1.3
        }}>
          {product.name}
        </h3>

        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
          color: C.muted, marginBottom: "1rem", lineHeight: 1.5, minHeight: 36
        }}>
          {product.tagline}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1.25rem" }}>
          {product.benefits.map(b => (
            <span key={b} style={{
              padding: "4px 10px", borderRadius: 6,
              background: C.cream, border: `1px solid ${C.border}`,
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem",
              color: C.brown, fontWeight: 600
            }}>
              ✓ {b}
            </span>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
          borderTop: `1px solid ${C.border}`, paddingTop: "1rem"
        }}>
          <div>
            <div style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "1.35rem",
              fontWeight: 700, color: C.terra, lineHeight: 1, letterSpacing: "-0.02em"
            }}>
              {product.price}
            </div>
            {product.originalPrice && (
              <div style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
                color: C.mutedLight, textDecoration: "line-through", marginTop: 4
              }}>
                {product.originalPrice}
              </div>
            )}
          </div>

          <button onClick={(e) => { e.stopPropagation(); setAdded(true); }}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "12px 20px", borderRadius: 40, border: "none", cursor: "pointer",
              background: added ? C.olive : `linear-gradient(135deg, ${C.terra} 0%, #A03B2E 100%)`,
              color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem", fontWeight: 700,
              transition: "all 0.3s ease",
              boxShadow: added ? "0 8px 20px rgba(93,117,48,0.3)" : "0 8px 20px rgba(192,74,59,0.25)",
              transform: hov ? "scale(1.03)" : "scale(1)"
            }}>
            {added ? <><Check size={14} strokeWidth={2.5} />Đã thêm</> : <><Plus size={14} strokeWidth={2.5} />Mua ngay</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── PRODUCTS SECTION ───────────────────────────── */
const ProductsSection = () => {
  const products = [
    { name: "Dầu Gấc MoaMoa", category: "Dầu ăn dặm", image: "/daugac.png", tagline: "Nguồn Beta-carotene tự nhiên vượt trội, hỗ trợ thị lực", bg: "#FEF0EB", benefits: ["Beta-carotene", "Vitamin A", "Lycopene"], price: "189.000₫", stars: 5, reviews: 284, volume: "100ml", discount: null },
    { name: "Dầu Olive Extra Virgin", category: "Dầu ăn dặm", image: "/dauolive.png", tagline: "Nhập khẩu Địa Trung Hải, giàu Omega-9 cho não bộ", bg: "#EFF6E8", benefits: ["Omega-9", "Polyphenols", "Vit E"], price: "245.000₫", stars: 5, reviews: 196, volume: "100ml", discount: 15, originalPrice: "288.000₫" },
    { name: "Dầu Gạo Rang Xay", category: "Dầu ăn dặm", image: "/daugao.png", tagline: "Từ gạo lứt Việt Nam, giàu Vitamin E và Oryzanol", bg: "#FDF8E8", benefits: ["Vitamin E", "Oryzanol", "Sterols"], price: "175.000₫", stars: 4, reviews: 312, volume: "100ml", discount: null },
    { name: "Dầu Bơ Hữu Cơ", category: "Dầu ăn dặm", image: "/daubo.png", tagline: "Ép lạnh từ bơ sáp Tây Nguyên, giàu chất béo tốt", bg: "#EBF2E4", benefits: ["Healthy Fats", "Vitamin K", "Folate"], price: "210.000₫", stars: 5, reviews: 156, volume: "100ml", discount: null },
    { name: "Dầu Mè Đen Ép Lạnh", category: "Dầu ăn dặm", image: "/daume.png", tagline: "Hương vị thơm ngon, kích thích bé ăn ngon miệng", bg: "#F2F0EB", benefits: ["Canxi", "Kẽm", "Omega-6"], price: "165.000₫", stars: 4, reviews: 210, volume: "100ml", discount: 10, originalPrice: "185.000₫" },
    { name: "Combo Phát triển Trí não", category: "Combo khuyên dùng", image: "/daubo.png", tagline: "Dầu Bơ + Dầu Gạo — bộ đôi vàng cho phát triển não bộ", bg: "#EBF2E4", benefits: ["DHA hỗ trợ", "Healthy Fats", "Tổng hợp"], price: "320.000₫", originalPrice: "390.000₫", stars: 5, reviews: 427, volume: "2×100ml", discount: 18, featured: true },
  ];

  return (
    <section style={{ background: C.creamDark, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionTitle center
          eyebrow="The Collection"
          title="Bộ sưu tập Dầu Ăn Dặm"
          subtitle="Mỗi sản phẩm là một cam kết — từ vùng nguyên liệu đạt chuẩn đến dưỡng chất tốt nhất cho bấc lửa gia đình bạn."
        />
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} featured={p.featured} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <HoverButton>
            Xem toàn bộ sản phẩm <ArrowRight size={15} strokeWidth={2} />
          </HoverButton>
        </div>
      </div>
    </section>
  );
};

/* ─── NEWSLETTER STRIP ───────────────────────────── */
const NewsletterStrip = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [ref, vis] = useReveal();

  return (
    <section style={{ background: C.brown, padding: "5rem 1.5rem" }}>
      <div ref={ref} style={{
        maxWidth: 680, margin: "0 auto", textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease"
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📩</div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "1.9rem",
          fontWeight: 700, color: C.white, marginBottom: "0.75rem"
        }}>
          Nhận cẩm nang ăn dặm từ chuyên gia
        </h3>
        <p style={{
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem",
          color: "rgba(255,255,255,0.75)", marginBottom: "2rem", lineHeight: 1.7
        }}>
          Hướng dẫn ăn dặm theo từng giai đoạn, công thức nấu ăn cho bé, và ưu đãi độc quyền dành riêng cho thành viên.
        </p>
        {!sent ? (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true); }} style={{ display: "flex", gap: "0.75rem", maxWidth: 440, margin: "0 auto", flexWrap: "wrap" }}>
            <input
              type="email" placeholder="Email của bạn..."
              value={email} onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, minWidth: 200, padding: "13px 20px", borderRadius: 40,
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)", color: "white",
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem",
                outline: "none", backdropFilter: "blur(4px)"
              }} />
            <button type="submit"
              style={{
                padding: "13px 24px", borderRadius: 40, border: "none", cursor: "pointer",
                background: C.white, color: C.brown, fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.82rem", fontWeight: 700, transition: "all 0.2s",
                whiteSpace: "nowrap"
              }}>
              Đăng ký ngay
            </button>
          </form>
        ) : (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 24px", borderRadius: 40, background: "rgba(255,255,255,0.15)",
            color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem"
          }}>
            <Check size={16} /> Cảm ơn bạn! Kiểm tra hộp thư nhé 🎉
          </div>
        )}
      </div>
    </section>
  );
};

/* ─── FOOTER ─────────────────────────────────────── */
const Footer = () => {
  const cols = [
    { title: "Sản phẩm", links: ["Dầu Gấc nguyên chất", "Dầu Olive cho bé", "Dầu Gạo ăn dặm", "Dầu Bơ hữu cơ", "Dầu Mè đen ép lạnh", "Combo tiết kiệm"] },
    { title: "Thông tin", links: ["Câu chuyện MoaMoa", "Chuyên gia dinh dưỡng", "Cẩm nang ăn dặm", "Vùng nguyên liệu", "Chứng nhận chất lượng"] },
    { title: "Hỗ trợ", links: ["Chính sách đổi trả", "Chương trình Affiliate", "Điều khoản sử dụng", "Chính sách bảo mật", "Liên hệ hợp tác"] },
  ];
  const seoKeywords = ["Dầu ăn dặm cho bé 6 tháng", "Dầu gấc nguyên chất", "Dầu olive cho trẻ sơ sinh", "Dầu gạo ăn dặm", "Dầu ăn cho bé tập ăn", "Dầu bơ hữu cơ cho bé"];

  return (
    <footer style={{ background: "#2A1B12", padding: "5rem 1.5rem 2rem", color: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="footer-grid" style={{ marginBottom: "4rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/logo.png" alt="MoaMoa" style={{ position: "absolute", width: "250%", height: "250%", objectFit: "contain" }} />
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 4vw, 2rem)",
                fontWeight: 700, color: "white"
              }}>MoaMoa</span>
            </div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
              color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 280
            }}>
              Dầu ăn dặm cao cấp 100% tự nhiên từ nguồn nông sản Việt đạt chuẩn. Vì mỗi bữa ăn của con là một điều thiêng liêng.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ icon: Phone, text: "1800 6868 (Miễn phí)" }, { icon: Mail, text: "support@moamoa.vn" }, { icon: MapPin, text: "TP. Hồ Chí Minh, Việt Nam" }].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={13} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
                fontWeight: 700, color: "white", letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: "1.25rem"
              }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="footer-link" style={{
                      fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)", textDecoration: "none",
                      transition: "color 0.2s", display: "block"
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem",
            color: "rgba(255,255,255,0.25)", marginBottom: 8, letterSpacing: "0.1em"
          }}>
            TỪ KHÓA PHỔ BIẾN:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {seoKeywords.map(kw => (
              <a key={kw} href="#" className="tag-link" style={{
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
                color: "rgba(255,255,255,0.3)", textDecoration: "none", padding: "3px 10px",
                borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s"
              }}>
                {kw}
              </a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
        }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)" }}>
            © 2024 MoaMoa. Tất cả quyền được bảo lưu.
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ icon: Instagram, label: "Instagram" }, { icon: Facebook, label: "Facebook" }, { icon: Youtube, label: "YouTube" }].map(({ icon: Icon, label }) => (
              <a key={label} href="#" className="social-link"
                style={{
                  width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, transform 0.2s"
                }}>
                <Icon size={14} color="rgba(255,255,255,0.7)" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ─── APP ────────────────────────────────────────── */
export default function MoaMoa() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Montserrat:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #F9F6F0; overflow-x: hidden; }
        ::selection { background: rgba(122,67,38,0.2); color: #2D2D2D; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0EAE1; }
        ::-webkit-scrollbar-thumb { background: #7A4326; border-radius: 3px; }
        input::placeholder { color: rgba(255,255,255,0.55); }
        
        .standard-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.5rem; }
        .footer-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 3rem; }
        
        .hero-section { min-height: auto; padding-top: 120px; padding-bottom: 60px; }
        
        .desktop-flex { display: none !important; }
        .desktop-only { display: none !important; }
        .mobile-flex { display: flex !important; }

        /* Sửa hiệu ứng hover bằng CSS chuẩn thay vì dùng JS chọc vào DOM */
        .nav-item:hover .nav-label { color: #7A4326 !important; }
        .icon-btn:hover { background: #F3EBE6 !important; color: #7A4326 !important; }
        .footer-link:hover { color: #D4A373 !important; }
        .tag-link:hover { color: #D4A373 !important; border-color: rgba(212,163,115,0.3) !important; }
        .social-link:hover { background: #7A4326 !important; transform: translateY(-2px); }

        @media (min-width: 769px) {
          .standard-grid { grid-template-columns: 1fr 1fr; gap: 5rem; }
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
          .hero-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
          
          .hero-section { min-height: 100vh; padding-top: 80px; }
          
          .desktop-flex { display: flex !important; }
          .desktop-only { display: block !important; }
          .mobile-flex { display: none !important; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>

      <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#F9F6F0", minHeight: "100vh" }}>
        <Navbar cartCount={2} />
        <Hero />
        {/* Đã bổ sung Component TrustStrip bị bỏ quên */}
        <TrustStrip />
        <BrandStory />
        <ProductsSection />
        <NewsletterStrip />
        <Footer />
      </div>
    </>
  );
}
