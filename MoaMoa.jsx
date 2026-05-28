import { useState, useEffect, useRef, useCallback } from "react";
import {
  ShoppingCart, Search, User, Star, ChevronRight, Heart,
  Leaf, Award, Shield, Droplets, ArrowRight, Check,
  Instagram, Facebook, Youtube, Mail, Phone, MapPin,
  Baby, Sparkles, FlaskConical, ChevronDown, Menu, X, Plus
} from "lucide-react";

/* ─── DESIGN TOKENS (UPDATED TO EARTH TONES) ────── */
const C = {
  cream:      "#F9F6F0",
  creamDark:  "#F0EAE1",
  brown:      "#7A4326", // Primary Main
  brownMid:   "#9E5B36", // Primary Hover
  brownPale:  "#F3EBE6", // Primary Light Background
  olive:      "#5D7530", // Accent
  oliveMid:   "#708C3A",
  olivePale:  "#EBF0E0",
  terra:      "#C04A3B", // Alert / Sales
  terraPale:  "#FAEAE8",
  charcoal:   "#2D2D2D",
  muted:      "#555555",
  mutedLight: "#888888",
  white:      "#FFFFFF",
  border:     "#E5DDD3",
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

/* ─── SVG ILLUSTRATIONS (BACKGROUNDS) ───────────── */
const LeafDecorSVG = ({ opacity = 0.12 }) => (
  <svg viewBox="0 0 200 200" fill="none" style={{ position:"absolute", pointerEvents:"none", opacity }}>
    <path d="M100 180 Q20 120 40 40 Q80 10 140 60 Q180 100 100 180Z" fill={C.brown} />
    <path d="M100 180 Q100 100 100 40" stroke="#F8F5F0" strokeWidth="1.5" opacity="0.6" />
    <path d="M60 80 Q100 100 140 75" stroke="#F8F5F0" strokeWidth="1" opacity="0.5" />
    <path d="M55 110 Q100 125 145 105" stroke="#F8F5F0" strokeWidth="1" opacity="0.5" />
  </svg>
);

const FarmerIllustration = () => (
  <svg viewBox="0 0 400 300" fill="none" className="w-full h-full">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E4D1B9" />
        <stop offset="100%" stopColor="#F9F6F0" />
      </linearGradient>
      <linearGradient id="field" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7A9E4A" />
        <stop offset="100%" stopColor="#4A5D23" />
      </linearGradient>
    </defs>
    <rect width="400" height="300" fill="url(#sky)" rx="16" />
    <ellipse cx="200" cy="320" rx="220" ry="80" fill="url(#field)" />
    {[0,1,2,3].map(i => (
      <ellipse key={i} cx="200" cy={220 + i*22} rx={160 - i*20} ry="8"
        fill="#5D7530" opacity={0.4 - i*0.05} />
    ))}
    <ellipse cx="340" cy="180" rx="90" ry="60" fill="#7A9E4A" opacity="0.5" />
    <ellipse cx="60" cy="190" rx="80" ry="55" fill="#7A9E4A" opacity="0.45" />
    <circle cx="320" cy="55" r="28" fill="#F5D76E" opacity="0.85" />
    {[0,45,90,135,180,225,270,315].map((deg, i) => (
      <line key={i}
        x1={320 + Math.cos(deg*Math.PI/180)*32}
        y1={55 + Math.sin(deg*Math.PI/180)*32}
        x2={320 + Math.cos(deg*Math.PI/180)*42}
        y2={55 + Math.sin(deg*Math.PI/180)*42}
        stroke="#F5D76E" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    ))}
    <circle cx="180" cy="155" r="16" fill="#7A4326" />
    <ellipse cx="180" cy="143" rx="22" ry="6" fill="#4A2613" />
    <path d="M162 143 Q180 130 198 143" fill="#4A2613" />
    <rect x="170" y="171" width="20" height="35" rx="4" fill="#9E5B36" />
    <rect x="156" y="174" width="14" height="28" rx="4" fill="#9E5B36" />
    <rect x="190" y="174" width="14" height="28" rx="4" fill="#9E5B36" />
    <rect x="168" y="204" width="9" height="20" rx="3" fill="#3A1C0D" />
    <rect x="183" y="204" width="9" height="20" rx="3" fill="#3A1C0D" />
    <ellipse cx="210" cy="195" rx="18" ry="12" fill="#5D7530" opacity="0.9" />
    <rect x="194" y="183" width="32" height="12" rx="4" fill="#708C3A" />
    {[130,155,220,245,265].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={210 + (i%2)*8} r="5" fill="#E74C3C" opacity="0.75" />
        <line x1={x} y1={210+(i%2)*8} x2={x} y2={200+(i%2)*8} stroke="#4A5D23" strokeWidth="1.5" />
      </g>
    ))}
    <text x="20" y="285" fontFamily="serif" fontSize="11" fill="#7A4326" opacity="0.5" letterSpacing="2">
      Vùng Nông Sản Việt Nam
    </text>
  </svg>
);

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
    { label: "Chuyên gia", sub: "Experts" },
    { label: "Cẩm nang", sub: "Blog" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled ? "rgba(249,246,240,0.92)" : "rgba(249,246,240,0.4)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(122,67,38,0.06)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img src="/logo.png" alt="MoaMoa" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.45rem",
                fontWeight: 700, color: C.brown, letterSpacing: "0.03em", lineHeight: 1 }}>
                MoaMoa
              </div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.52rem",
                color: C.brownMid, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 1 }}>
                Pure • Natural • Vietnamese
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
            className="hidden md:flex">
            {navLinks.map(({ label, sub }) => (
              <a key={label} href="#" style={{ textDecoration: "none", textAlign: "center", cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector(".nav-label").style.color = C.brown}
                onMouseLeave={e => e.currentTarget.querySelector(".nav-label").style.color = C.charcoal}>
                <div className="nav-label" style={{
                  fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem",
                  fontWeight: 600, color: C.charcoal, letterSpacing: "0.03em",
                  transition: "color 0.2s" }}>
                  {label}
                </div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem",
                  color: C.mutedLight, letterSpacing: "0.08em" }}>
                  {sub}
                </div>
              </a>
            ))}
          </div>

          {/* Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {[Search, User].map((Icon, i) => (
              <button key={i} style={{ background: "none", border: "none", cursor: "pointer",
                padding: 8, borderRadius: 8, color: C.charcoal,
                transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.brownPale; e.currentTarget.style.color = C.brown; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.charcoal; }}>
                <Icon size={18} strokeWidth={1.5} />
              </button>
            ))}
            <button style={{ background: "none", border: "none", cursor: "pointer",
              padding: 8, borderRadius: 8, color: C.charcoal, position: "relative",
              transition: "background 0.2s, color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = C.brownPale; e.currentTarget.style.color = C.brown; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.charcoal; }}>
              <ShoppingCart size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: 4, right: 4, width: 16, height: 16,
                  borderRadius: "50%", background: C.terra, color: "white",
                  fontSize: "0.58rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", cursor: "pointer",
                padding: 8, color: C.charcoal, display: "flex" }}
              className="md:hidden">
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
            <a key={label} href="#" style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "14px 24px", textDecoration: "none",
              borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
                fontWeight: 600, color: C.charcoal }}>{label}</span>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
                color: C.mutedLight }}>{sub}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
};

/* ─── HERO ───────────────────────────────────────── */
const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const products = [
    { label: "Gấc", image: "/daugac.png", emoji: "🍊" },
    { label: "Olive", image: "/dauolive.png", emoji: "🫒" },
    { label: "Gạo", image: "/daugao.png", emoji: "🌾" },
    { label: "Bơ", image: "/daubo.png", emoji: "🥑" },
    { label: "Mè", image: "/daume.png", emoji: "🌱" },
  ];

  return (
    <section style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.cream} 0%, ${C.creamDark} 70%, #EBE5DB 100%)`,
      position: "relative", overflow: "hidden", display: "flex", alignItems: "center",
      paddingTop: 72 }}>

      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "55%", height: "120%",
        background: "radial-gradient(ellipse at center, rgba(122,67,38,0.05) 0%, transparent 70%)",
        pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", left: "5%", width: 300, height: 300,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(192,74,59,0.04) 0%, transparent 70%)",
        pointerEvents: "none" }} />

      <div style={{ position: "absolute", top: "10%", right: "48%", width: 180, height: 180, opacity: 0.06, transform: "rotate(30deg)" }}>
        <LeafDecorSVG opacity={1} />
      </div>
      <div style={{ position: "absolute", bottom: "5%", right: "12%", width: 120, height: 120, opacity: 0.08, transform: "rotate(-20deg)" }}>
        <LeafDecorSVG opacity={1} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 1.5rem",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
        width: "100%", position: "relative" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

        {/* Left: Text */}
        <div style={{ zIndex: 2 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 16px", borderRadius: 24,
            background: "rgba(93,117,48,0.1)", border: `1px solid rgba(93,117,48,0.25)`,
            marginBottom: "1.5rem",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s ease 0.1s",
          }}>
            <Leaf size={12} color={C.olive} strokeWidth={2} />
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.7rem",
              fontWeight: 600, color: C.olive, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              100% Tự nhiên · Đạt chuẩn VietGAP
            </span>
          </div>

          {/* UPDATED COPYWRITING */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.4rem)",
            fontWeight: 700, color: C.charcoal, lineHeight: 1.2, marginBottom: "1.25rem",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            MoaMoa <br />
            Giọt dầu cho <em style={{ color: C.brown, fontStyle: "italic" }}>bấc lửa</em>
            <br />yêu thương
          </h1>

          <p style={{
            fontFamily: "'Montserrat', sans-serif", fontSize: "0.95rem",
            color: C.muted, lineHeight: 1.8, maxWidth: 460, marginBottom: "2rem",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease 0.35s",
          }}>
            Dầu ăn dặm cao cấp 100% tự nhiên từ nguồn nông sản Việt. <span style={{ color: C.brownMid, fontWeight: 600 }}>The Chef's kiss</span> cho hành trình lớn khôn của con.
          </p>

          <div style={{
            display: "flex", gap: "1rem", flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease 0.5s",
          }}>
            <HoverButton primary>
              <Sparkles size={15} strokeWidth={2} />
              Khám phá ngay
            </HoverButton>
            <HoverButton>
              Tìm hiểu câu chuyện
              <ChevronRight size={15} strokeWidth={2} />
            </HoverButton>
          </div>

          <div style={{
            display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.8s ease 0.65s",
          }}>
            {[
              { icon: Shield, text: "Kiểm định VSATTP" },
              { icon: Award, text: "Giải thưởng 2024" },
              { icon: Baby, text: "Từ 6 tháng tuổi" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.brownPale,
                  display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={13} color={C.brown} strokeWidth={2} />
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
                  color: C.muted, fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

{/* Right: Product bottles */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "1.5rem", // Tăng gap lên 1.5rem cho thoáng
          position: "relative", height: 500, // Tăng height container từ 380 -> 500
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)",
          transition: "all 1s ease 0.4s",
        }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%",
            background: "radial-gradient(ellipse at 50% 60%, rgba(122,67,38,0.08) 0%, transparent 70%)",
            pointerEvents: "none" }} />

          {products.map((p, i) => {
            // Tăng scale chiều cao của các chai lên khoảng 1.4x
            const heights = [300, 360, 380, 330, 310]; 
            // Điều chỉnh lại độ lệch (offset) cho cân xứng với size mới
            const offsets = [30, 10, 0, 25, 15]; 
            
            return (
              <div key={p.label}
                style={{
                  width: heights[i] * 0.35, height: heights[i],
                  transform: `translateY(${offsets[i]}px)`,
                  transition: `transform 0.3s ease ${i * 0.05}s, filter 0.3s ease`,
                  cursor: "pointer",
                  animation: `floatBottle 3s ease-in-out ${i * 0.6}s infinite alternate`,
                }}
                onMouseEnter={e => e.currentTarget.style.filter = "drop-shadow(0 20px 30px rgba(122,67,38,0.15))"}
                onMouseLeave={e => e.currentTarget.style.filter = "none"}>
                
                <img 
                  src={p.image} 
                  alt={p.label} 
                  style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.15))" }} 
                />

                <div style={{ textAlign: "center", marginTop: 12,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "0.85rem", fontWeight: 600, color: C.charcoal }}>
                  {p.emoji} {p.label}
                </div>
              </div>
            );
          })}
        </div>

/* ─── BUTTON COMPONENT ───────────────────────────── */
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

/* ─── SECTION TITLE ──────────────────────────────── */
const SectionTitle = ({ eyebrow, title, subtitle, center = false }) => {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ textAlign: center ? "center" : "left", maxWidth: center ? 620 : "100%",
      margin: center ? "0 auto 3.5rem" : "0 0 3rem",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.7s ease" }}>
      {eyebrow && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8,
          marginBottom: "0.75rem" }}>
          <div style={{ width: 24, height: 1.5, background: C.brown }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
            color: C.brown, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          <div style={{ width: 24, height: 1.5, background: C.brown }} />
        </div>
      )}
      <h2 style={{ fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.7rem, 3vw, 2.6rem)", fontWeight: 700,
        color: C.charcoal, lineHeight: 1.25, marginBottom: "0.75rem" }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
          color: C.muted, lineHeight: 1.75 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* ─── BRAND STORY ────────────────────────────────── */
const BrandStory = () => {
  const [ref, vis] = useReveal(0.1);
  return (
    <section style={{ background: C.cream, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem",
          alignItems: "center",
          opacity: vis ? 1 : 0, transition: "all 0.8s ease" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">

          <div>
            <SectionTitle
              eyebrow="Từ Mộc Hoa đến MoaMoa"
              title={<>Tên thương hiệu mang<br /><em style={{ color: C.brown }}>tiếng hôn của mẹ</em></>}
            />
            
            {/* UPDATED STORY */}
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
              color: C.muted, lineHeight: 1.85, marginBottom: "1.25rem" }}>
              <strong style={{ color: C.charcoal }}>"MoaMoa"</strong> — âm thanh của nụ hôn mẹ trao con mỗi sáng, cũng là tiếng cười của bé khi thưởng thức bữa ăn dặm đầu tiên. Mỗi giọt dầu không chỉ mang trọn dưỡng chất tự nhiên, mà còn là chất xúc tác thắp sáng <strong style={{ color: C.brown }}>bấc lửa yêu thương</strong> trong từng bữa ăn gia đình.
            </p>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.9rem",
              color: C.muted, lineHeight: 1.85, marginBottom: "2rem" }}>
              Sự giao thoa giữa tiêu chuẩn khắt khe "The Chef's kiss" và nét mộc mạc của nông sản Việt. Chúng tôi cam kết hiện đại hóa nền nông nghiệp truyền thống — kết nối trực tiếp từ vùng nguyên liệu đạt chuẩn đến bàn ăn của bé.
            </p>

            {[
              { icon: Leaf, title: "Canh tác tự nhiên", desc: "Không thuốc trừ sâu, không chất bảo quản" },
              { icon: FlaskConical, title: "Công nghệ ép lạnh", desc: "Giữ trọn dưỡng chất thiết yếu" },
              { icon: Shield, title: "Kiểm định độc lập", desc: "Đạt tiêu chuẩn FDA & VSATTP" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ display: "flex", gap: 14, marginBottom: "1.1rem",
                padding: "14px 18px", borderRadius: 12,
                background: "rgba(122,67,38,0.04)", border: `1px solid rgba(122,67,38,0.08)`,
                transition: "background 0.2s" }}>
                <div style={{ width: 38, height: 38, flexShrink: 0, borderRadius: 10,
                  background: C.brownPale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} color={C.brown} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.82rem",
                    fontWeight: 700, color: C.charcoal, marginBottom: 2 }}>{title}</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
                    color: C.muted }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 24, overflow: "hidden",
              boxShadow: "0 30px 80px rgba(122,67,38,0.15)",
              border: `3px solid rgba(122,67,38,0.08)`,
              aspectRatio: "4/3", background: C.creamDark }}>
              <FarmerIllustration />
            </div>
            <div style={{ position: "absolute", top: -20, right: -20, padding: "14px 20px",
              borderRadius: 16, background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(16px)", boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
              border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
                fontWeight: 700, color: C.olive, lineHeight: 1 }}>12+</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
                color: C.muted, marginTop: 2 }}>Vùng nông sản<br />đối tác</div>
            </div>
            <div style={{ position: "absolute", bottom: -16, left: -16, padding: "14px 20px",
              borderRadius: 16, background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(16px)", boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
              border: `1px solid ${C.border}` }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
                fontWeight: 700, color: C.terra, lineHeight: 1 }}>50K+</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
                color: C.muted, marginTop: 2 }}>Gia đình tin<br />yêu MoaMoa</div>
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

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div ref={ref} style={{
      background: C.white, borderRadius: 20,
      border: featured ? `2px solid ${C.brown}` : `1px solid ${C.border}`,
      overflow: "hidden", position: "relative",
      transform: hov ? "translateY(-8px)" : vis ? "translateY(0)" : "translateY(24px)",
      opacity: vis ? 1 : 0,
      transition: `all 0.6s ease ${index * 0.1}s`,
      boxShadow: hov ? "0 24px 60px rgba(122,67,38,0.12)" : "0 4px 16px rgba(0,0,0,0.05)",
      cursor: "pointer",
    }}
    onMouseEnter={() => setHov(true)}
    onMouseLeave={() => setHov(false)}>

      {featured && (
        <div style={{ position: "absolute", top: 14, left: 14, zIndex: 5,
          background: C.brown, color: "white", borderRadius: 20,
          padding: "4px 12px", fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em" }}>
          ⭐ KHUYÊN DÙNG
        </div>
      )}

      {product.discount && (
        <div style={{ position: "absolute", top: featured ? 14 : 14, right: 14, zIndex: 5,
          background: C.terra, color: "white", borderRadius: 20,
          padding: "4px 10px", fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.65rem", fontWeight: 700 }}>
          -{product.discount}%
        </div>
      )}

      <button style={{ position: "absolute", top: 14, right: product.discount ? 66 : 14, zIndex: 5,
        background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer",
        width: 32, height: 32, borderRadius: "50%", display: "flex",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
        onClick={e => e.stopPropagation()}>
        <Heart size={14} color={C.terra} strokeWidth={2} />
      </button>

      <div style={{ height: 220, background: product.bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.05 }}>
          <LeafDecorSVG opacity={1} />
        </div>
        <div style={{
          width: "100%", display: "flex", justifyContent: "center",
          transform: hov ? "scale(1.08) translateY(-4px)" : "scale(1)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: "auto", height: "180px", objectFit: "contain" }} 
          />
        </div>
        <div style={{ position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
          background: "rgba(255,255,255,0.85)", borderRadius: 12, padding: "3px 12px",
          fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", color: C.muted }}>
          {product.volume}
        </div>
      </div>

      <div style={{ padding: "1.25rem" }}>
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem",
          color: C.brown, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
          {product.category}
        </span>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem",
          fontWeight: 700, color: C.charcoal, margin: "4px 0 4px" }}>
          {product.name}
        </h3>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
          color: C.muted, marginBottom: "0.85rem", lineHeight: 1.5 }}>
          {product.tagline}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
          {product.benefits.map(b => (
            <span key={b} style={{ padding: "3px 10px", borderRadius: 20,
              background: C.brownPale, border: `1px solid rgba(122,67,38,0.15)`,
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem",
              color: C.brown, fontWeight: 600 }}>
              {b}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: "1rem" }}>
          {[1,2,3,4,5].map(s => (
            <Star key={s} size={11} fill={s <= product.stars ? "#F5CB5C" : "transparent"}
              color={s <= product.stars ? "#F5CB5C" : C.border} strokeWidth={1.5} />
          ))}
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
            color: C.muted, marginLeft: 4 }}>({product.reviews})</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem",
              fontWeight: 700, color: product.discount ? C.terra : C.charcoal, lineHeight: 1 }}>
              {product.price}
            </div>
            {product.originalPrice && (
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
                color: C.mutedLight, textDecoration: "line-through" }}>
                {product.originalPrice}
              </div>
            )}
          </div>
          <button onClick={handleAdd}
            style={{ display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 40, border: "none", cursor: "pointer",
              background: added ? "#708C3A" : C.terra, color: "white",
              fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 700,
              transition: "all 0.25s ease",
              boxShadow: added ? "0 4px 16px rgba(112,140,58,0.35)" : "0 4px 16px rgba(192,74,59,0.3)" }}>
            {added ? <><Check size={12} />Đã thêm</> : <><Plus size={12} />Thêm vào giỏ</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── PRODUCTS SECTION ───────────────────────────── */
const ProductsSection = () => {
  const products = [
    {
      name: "Dầu Gấc MoaMoa", category: "Dầu ăn dặm",
      image: "/daugac.png",
      tagline: "Nguồn Beta-carotene tự nhiên vượt trội, hỗ trợ thị lực",
      bg: "#FEF0EB",
      benefits: ["Beta-carotene", "Vitamin A", "Lycopene"],
      price: "189.000₫", stars: 5, reviews: 284, volume: "100ml", discount: null,
    },
    {
      name: "Dầu Olive Extra Virgin", category: "Dầu ăn dặm",
      image: "/dauolive.png",
      tagline: "Nhập khẩu Địa Trung Hải, giàu Omega-9 cho não bộ",
      bg: "#EFF6E8",
      benefits: ["Omega-9", "Polyphenols", "Vit E"],
      price: "245.000₫", stars: 5, reviews: 196, volume: "100ml", discount: 15, originalPrice: "288.000₫",
    },
    {
      name: "Dầu Gạo Rang Xay", category: "Dầu ăn dặm",
      image: "/daugao.png",
      tagline: "Từ gạo lứt Việt Nam, giàu Vitamin E và Oryzanol",
      bg: "#FDF8E8",
      benefits: ["Vitamin E", "Oryzanol", "Sterols"],
      price: "175.000₫", stars: 4, reviews: 312, volume: "100ml", discount: null,
    },
    {
      name: "Dầu Bơ Hữu Cơ", category: "Dầu ăn dặm",
      image: "/daubo.png",
      tagline: "Ép lạnh từ bơ sáp Tây Nguyên, giàu chất béo tốt",
      bg: "#EBF2E4",
      benefits: ["Healthy Fats", "Vitamin K", "Folate"],
      price: "210.000₫", stars: 5, reviews: 156, volume: "100ml", discount: null,
    },
    {
      name: "Dầu Mè Đen Ép Lạnh", category: "Dầu ăn dặm",
      image: "/daume.png",
      tagline: "Hương vị thơm ngon, kích thích bé ăn ngon miệng",
      bg: "#F2F0EB",
      benefits: ["Canxi", "Kẽm", "Omega-6"],
      price: "165.000₫", stars: 4, reviews: 210, volume: "100ml", discount: 10, originalPrice: "185.000₫",
    },
    {
      name: "Combo Phát triển Trí não", category: "Combo khuyên dùng",
      image: "/daubo.png", 
      tagline: "Dầu Bơ + Dầu Gạo — bộ đôi vàng cho phát triển não bộ",
      bg: "#EBF2E4",
      benefits: ["DHA hỗ trợ", "Healthy Fats", "Tổng hợp"],
      price: "320.000₫", originalPrice: "390.000₫", stars: 5, reviews: 427, volume: "2×100ml",
      discount: 18, featured: true,
    },
  ];

  return (
    <section style={{ background: C.creamDark, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionTitle center
          eyebrow="The Collection"
          title="Bộ sưu tập Dầu Ăn Dặm"
          subtitle="Mỗi sản phẩm là một cam kết — từ vùng nguyên liệu đạt chuẩn đến dưỡng chất tốt nhất cho bấc lửa gia đình bạn."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
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

/* ─── EXPERT & SOCIAL PROOF ──────────────────────── */
const ExpertSection = () => {
  const reviews = [
    { name: "Mẹ Hà Linh", handle: "@halinhmom2024", rating: 5, text: "Con mình 8 tháng dùng dầu Gấc MoaMoa, da dẻ hồng hào hẳn! Mẹ nào chưa thử thì nên mua ngay á 🥰", avatar: "🧡", tag: "Dầu Gấc" },
    { name: "Mẹ Thu Hương", handle: "@thuhuong_baby", rating: 5, text: "Mình là dietitian, sau khi xem thành phần mới tin dùng. Thật sự ấn tượng với chất lượng và nguồn gốc rõ ràng.", avatar: "💚", tag: "Dầu Olive" },
    { name: "Mẹ Ngọc Anh", handle: "@ngocanhkitchen", rating: 5, text: "Combo não bộ thay đổi hoàn toàn cách nấu dặm của mình! Bé nhà ăn ngon hơn hẳn, không còn lười ăn nữa 😭❤️", avatar: "💛", tag: "Combo Trí não" },
    { name: "Mẹ Phương Thảo", handle: "@phuongthao_mom", rating: 5, text: "Voucher hết rồi mà vẫn mua vì không thể đổi sản phẩm khác được. Chất lượng xứng đáng với giá tiền!", avatar: "💜", tag: "Dầu Gạo" },
    { name: "Mẹ Khánh Vân", handle: "@khanvan_family", rating: 5, text: "Ship nhanh, đóng gói đẹp như quà tặng. Bác sĩ dinh dưỡng cũng gợi ý dùng MoaMoa luôn. 10 điểm!", avatar: "🧡", tag: "Dầu Bơ" },
    { name: "Mẹ Minh Tâm", handle: "@minhtam2baby", rating: 4, text: "Đã dùng 3 tháng, thấy con phát triển tốt. Sản phẩm sạch, yên tâm cho bé 6 tháng trở lên. Recommend!", avatar: "💚", tag: "Dầu Gấc" },
  ];

  const [ref, vis] = useReveal(0.1);

  return (
    <section style={{ background: C.brownPale, padding: "7rem 1.5rem" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionTitle center
          eyebrow="Được chuyên gia xác nhận"
          title={<>Tin tưởng bởi các<br /><em style={{ color: C.brown }}>chuyên gia dinh dưỡng</em></>}
          subtitle="Được nghiên cứu, phân tích và khuyến nghị bởi bác sĩ nhi khoa và chuyên gia dinh dưỡng hàng đầu Việt Nam."
        />

        <div ref={ref} style={{
          maxWidth: 780, margin: "0 auto 5rem",
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(20px)",
          borderRadius: 24, padding: "2.5rem 3rem",
          border: `1px solid rgba(122,67,38,0.15)`,
          boxShadow: "0 24px 80px rgba(122,67,38,0.1)",
          position: "relative", overflow: "hidden",
          opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.8s ease",
        }}>
          <div style={{ position: "absolute", top: -10, left: 24, fontFamily: "serif",
            fontSize: "8rem", color: C.brown, opacity: 0.08, lineHeight: 1, userSelect: "none" }}>
            "
          </div>

          <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
            <div style={{ flexShrink: 0, width: 70, height: 70, borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.brown}, ${C.brownMid})`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem",
              boxShadow: `0 8px 24px rgba(122,67,38,0.25)` }}>
              👩‍⚕️
            </div>
            <div style={{ flex: 1 }}>
              <blockquote style={{ fontFamily: "'Playfair Display', serif",
                fontSize: "1.05rem", fontStyle: "italic", color: C.charcoal,
                lineHeight: 1.8, marginBottom: "1.25rem", margin: "0 0 1.25rem" }}>
                "Dầu ăn dặm đóng vai trò then chốt trong 1000 ngày đầu đời. Tôi đặc biệt đánh giá cao MoaMoa ở khả năng bảo toàn axit béo thiết yếu qua công nghệ ép lạnh — điều hiếm thấy ở thị trường Việt Nam."
              </blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700,
                    fontSize: "0.85rem", color: C.charcoal }}>TS. BS. Nguyễn Thị Minh Ngọc</div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
                    color: C.brown }}>Chuyên gia Dinh dưỡng Nhi khoa · BV Nhi Trung ương</div>
                </div>
                <div style={{ marginLeft: "auto", display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill="#F5CB5C" color="#F5CB5C" strokeWidth={0} />)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionTitle center
          eyebrow="Mẹ thông thái tin dùng"
          title="Hơn 50,000 mẹ đã chọn MoaMoa"
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {reviews.map((r, i) => {
            const [rref, rvis] = useReveal(0.05);
            return (
              <div key={r.name} ref={rref} style={{
                background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
                borderRadius: 16, padding: "1.25rem",
                border: `1px solid rgba(255,255,255,0.9)`,
                boxShadow: "0 4px 20px rgba(122,67,38,0.06)",
                opacity: rvis ? 1 : 0, transform: rvis ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.6s ease ${i * 0.07}s`,
              }}>
                <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 20,
                  background: C.terraPale, border: `1px solid rgba(192,74,59,0.2)`,
                  fontFamily: "'Montserrat', sans-serif", fontSize: "0.6rem",
                  color: C.terra, fontWeight: 700, marginBottom: 10 }}>
                  {r.tag}
                </span>
                <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={11} fill={s <= r.rating ? "#F5CB5C" : "transparent"}
                    color={s <= r.rating ? "#F5CB5C" : C.border} strokeWidth={1.5} />)}
                </div>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
                  color: C.muted, lineHeight: 1.65, marginBottom: "1rem" }}>
                  {r.text}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%",
                    background: C.brownPale, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "1rem" }}>
                    {r.avatar}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
                      fontWeight: 700, color: C.charcoal }}>{r.name}</div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.65rem",
                      color: C.brown }}>{r.handle}</div>
                  </div>
                  <div style={{ marginLeft: "auto", padding: "2px 8px", borderRadius: 8,
                    background: "rgba(122,67,38,0.08)",
                    fontFamily: "'Montserrat', sans-serif", fontSize: "0.58rem",
                    color: C.brown, fontWeight: 600 }}>✓ Đã mua</div>
                </div>
              </div>
            );
          })}
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
      <div ref={ref} style={{ maxWidth: 680, margin: "0 auto", textAlign: "center",
        opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.8s ease" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>📩</div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.9rem",
          fontWeight: 700, color: C.white, marginBottom: "0.75rem" }}>
          Nhận cẩm nang ăn dặm từ chuyên gia
        </h3>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.88rem",
          color: "rgba(255,255,255,0.75)", marginBottom: "2rem", lineHeight: 1.7 }}>
          Hướng dẫn ăn dặm theo từng giai đoạn, công thức nấu ăn cho bé, và ưu đãi độc quyền dành riêng cho thành viên.
        </p>
        {!sent ? (
          <div style={{ display: "flex", gap: "0.75rem", maxWidth: 440, margin: "0 auto", flexWrap: "wrap" }}>
            <input
              type="email" placeholder="Email của bạn..."
              value={email} onChange={e => setEmail(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: "13px 20px", borderRadius: 40,
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)", color: "white",
                fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem",
                outline: "none", backdropFilter: "blur(4px)" }} />
            <button onClick={() => { if (email) setSent(true); }}
              style={{ padding: "13px 24px", borderRadius: 40, border: "none", cursor: "pointer",
                background: C.white, color: C.brown, fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.82rem", fontWeight: 700, transition: "all 0.2s",
                whiteSpace: "nowrap" }}>
              Đăng ký ngay
            </button>
          </div>
        ) : (
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10,
            padding: "12px 24px", borderRadius: 40, background: "rgba(255,255,255,0.15)",
            color: "white", fontFamily: "'Montserrat', sans-serif", fontSize: "0.85rem" }}>
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
    {
      title: "Sản phẩm",
      links: ["Dầu Gấc nguyên chất", "Dầu Olive cho bé", "Dầu Gạo ăn dặm", "Dầu Bơ hữu cơ", "Dầu Mè đen ép lạnh", "Combo tiết kiệm"],
    },
    {
      title: "Thông tin",
      links: ["Câu chuyện MoaMoa", "Chuyên gia dinh dưỡng", "Cẩm nang ăn dặm", "Vùng nguyên liệu", "Chứng nhận chất lượng"],
    },
    {
      title: "Hỗ trợ",
      links: ["Chính sách đổi trả", "Chương trình Affiliate", "Điều khoản sử dụng", "Chính sách bảo mật", "Liên hệ hợp tác"],
    },
  ];

  const seoKeywords = [
    "Dầu ăn dặm cho bé 6 tháng", "Dầu gấc nguyên chất", "Dầu olive cho trẻ sơ sinh",
    "Dầu gạo ăn dặm", "Dầu ăn cho bé tập ăn", "Dầu bơ hữu cơ cho bé",
  ];

  return (
    <footer style={{ background: "#2A1B12", padding: "5rem 1.5rem 2rem", color: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "white" }}>
                <img src="/logo.png" alt="MoaMoa" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem",
                fontWeight: 700, color: "white" }}>MoaMoa</span>
            </div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.8rem",
              color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.5rem", maxWidth: 280 }}>
              Dầu ăn dặm cao cấp 100% tự nhiên từ nguồn nông sản Việt đạt chuẩn. Vì mỗi bữa ăn của con là một điều thiêng liêng.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: Phone, text: "1800 6868 (Miễn phí)" },
                { icon: Mail, text: "support@moamoa.vn" },
                { icon: MapPin, text: "TP. Hồ Chí Minh, Việt Nam" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={13} color="rgba(255,255,255,0.5)" strokeWidth={1.5} />
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.55)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.75rem",
                fontWeight: 700, color: "white", letterSpacing: "0.15em", textTransform: "uppercase",
                marginBottom: "1.25rem" }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)", textDecoration: "none",
                      transition: "color 0.2s", display: "block" }}
                      onMouseEnter={e => e.target.style.color = "#D4A373"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem",
            color: "rgba(255,255,255,0.25)", marginBottom: 8, letterSpacing: "0.1em" }}>
            TỪ KHÓA PHỔ BIẾN:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {seoKeywords.map(kw => (
              <a key={kw} href="#" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem",
                color: "rgba(255,255,255,0.3)", textDecoration: "none", padding: "3px 10px",
                borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.color = "#D4A373"; e.target.style.borderColor = "rgba(212,163,115,0.3)"; }}
                onMouseLeave={e => { e.target.style.color = "rgba(255,255,255,0.3)"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                {kw}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem",
            color: "rgba(255,255,255,0.35)" }}>
            © 2024 MoaMoa. Tất cả quyền được bảo lưu. | ĐKKD: 0123456789
          </span>

          <div style={{ display: "flex", gap: 10 }}>
            {[
              { icon: Instagram, label: "Instagram" },
              { icon: Facebook, label: "Facebook" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#"
                style={{ width: 34, height: 34, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "background 0.2s, transform 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = C.brown; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "none"; }}>
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
        body { background: #F9F6F0; }
        ::selection { background: rgba(122,67,38,0.2); color: #2D2D2D; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0EAE1; }
        ::-webkit-scrollbar-thumb { background: #7A4326; border-radius: 3px; }
        input::placeholder { color: rgba(255,255,255,0.55); }
        @media (max-width: 768px) {
          .md\\:hidden { display: none !important; }
          .md\\:flex { display: none !important; }
          .grid-cols-1 { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .hidden { display: flex !important; }
          .md\\:flex { display: flex !important; }
          .md\\:hidden { display: none !important; }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr) !important; }
          .md\\:grid-cols-4 { grid-template-columns: 2fr 1fr 1fr 1fr !important; }
          .md\\:gap-16 { gap: 4rem !important; }
          .md\\:gap-20 { gap: 5rem !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'Montserrat', sans-serif", background: "#F9F6F0", minHeight: "100vh" }}>
        <Navbar cartCount={2} />
        <Hero />
        <BrandStory />
        <ProductsSection />
        <ExpertSection />
        <NewsletterStrip />
        <Footer />
      </div>
    </>
  );
}
