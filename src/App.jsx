import { useState, useEffect, useRef } from "react";

const PHONE = "+91-7842027994";
const WA_LINK = `https://wa.me/917842027994`;
const INSTA_LINK = `https://www.instagram.com/shukla.mehendi`;

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "", from = "bottom" }) => {
  const [ref, inView] = useInView();
  const transforms = { bottom: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)", scale: "scale(0.94)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : (transforms[from] || transforms.bottom),
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`
    }}>
      {children}
    </div>
  );
};

// Liquid glass card — the centrepiece of the Aero aesthetic
const GlassCard = ({ children, style = {}, className = "", onClick }) => (
  <div className={`glass-card ${className}`} style={style} onClick={onClick}>
    {children}
  </div>
);

const sections = ["Home", "About", "Course", "Gallery", "Contact"];

export default function App() {
  const [active, setActive] = useState("Home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.section); });
    }, { threshold: 0.3 });
    document.querySelectorAll("[data-section]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#0d1117", color: "#f0ede8", overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#d4a843, #f5c842); border-radius: 3px; }

        /* ===== KEYFRAMES ===== */
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(3deg)} }
        @keyframes orbDrift { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.08)} 66%{transform:translate(-20px,15px) scale(0.95)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes ringExpand { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
        @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(10px)} }
        @keyframes glassSheen { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes borderShimmer { 0%,100%{border-color:rgba(212,168,67,0.3)} 50%{border-color:rgba(245,200,66,0.7)} }
        @keyframes bubblePulse { 0%,100%{transform:scale(1) translateY(0)} 50%{transform:scale(1.04) translateY(-4px)} }
        @keyframes hueShift { 0%{filter:hue-rotate(0deg)} 100%{filter:hue-rotate(20deg)} }

        /* ===== GLASS CARD ===== */
        .glass-card {
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.14) 0%,
            rgba(255,255,255,0.07) 40%,
            rgba(255,255,255,0.04) 100%
          );
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: 1px solid rgba(255,255,255,0.18);
          border-top: 1px solid rgba(255,255,255,0.35);
          border-left: 1px solid rgba(255,255,255,0.25);
          border-radius: 24px;
          box-shadow:
            0 4px 32px rgba(0,0,0,0.5),
            0 1px 0 rgba(255,255,255,0.25) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset;
          position: relative;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: -100%; height: 55%;
          background: linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          border-radius: 24px 24px 60% 60% / 24px 24px 40px 40px;
          pointer-events: none;
          z-index: 1;
        }
        .glass-card > * { position: relative; z-index: 2; }
        .glass-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow:
            0 16px 60px rgba(0,0,0,0.6),
            0 0 40px rgba(212,168,67,0.15),
            0 1px 0 rgba(255,255,255,0.35) inset,
            0 -1px 0 rgba(0,0,0,0.3) inset;
        }

        /* ===== GOLD TEXT ===== */
        .gold {
          background: linear-gradient(135deg, #b8860b 0%, #d4a843 20%, #f5c842 45%, #fad56a 55%, #f5c842 70%, #d4a843 85%, #b8860b 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 5s ease infinite;
        }
        .gold-static {
          background: linear-gradient(135deg, #d4a843 0%, #f5c842 50%, #d4a843 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ===== NAV ===== */
        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Cinzel', serif; font-size: 11.5px; letter-spacing: 0.16em;
          color: rgba(240,237,232,0.55); transition: all 0.3s;
          text-transform: uppercase; padding: 4px 0;
        }
        .nav-btn.active { color: #f5c842; text-shadow: 0 0 16px rgba(245,200,66,0.6); }
        .nav-btn:hover { color: #f5d870; }

        /* ===== BUTTONS ===== */
        .btn-primary {
          display: inline-block; padding: 16px 42px;
          background: linear-gradient(135deg, #9a7010 0%, #c9961a 30%, #f5c842 55%, #d4a843 80%, #9a7010 100%);
          background-size: 200% 200%;
          color: #1a0d00; font-family: 'Cinzel', serif; font-size: 13px;
          letter-spacing: 0.18em; text-decoration: none; border: none; cursor: pointer;
          border-radius: 50px; font-weight: 700;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          box-shadow:
            0 4px 24px rgba(212,168,67,0.5),
            0 0 0 1px rgba(245,200,66,0.4),
            0 1px 0 rgba(255,255,255,0.4) inset;
          animation: shimmer 5s ease infinite;
          text-shadow: 0 1px 2px rgba(255,255,255,0.3);
          position: relative; overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute; top: 0; left: -100%; right: -100%; height: 50%;
          background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%);
          border-radius: 50px 50px 60% 60%;
          pointer-events: none;
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow:
            0 12px 44px rgba(212,168,67,0.65),
            0 0 60px rgba(245,200,66,0.25),
            0 1px 0 rgba(255,255,255,0.5) inset;
        }
        .btn-outline {
          display: inline-block; padding: 15px 40px;
          background: rgba(255,255,255,0.07);
          backdrop-filter: blur(12px);
          color: #f5c842; font-family: 'Cinzel', serif; font-size: 13px;
          letter-spacing: 0.18em; text-decoration: none;
          border: 1.5px solid rgba(212,168,67,0.5); cursor: pointer; border-radius: 50px;
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1); font-weight: 600;
          box-shadow: 0 1px 0 rgba(255,255,255,0.1) inset, 0 4px 20px rgba(0,0,0,0.3);
        }
        .btn-outline:hover {
          background: linear-gradient(135deg, #c9961a, #f5c842);
          color: #1a0d00; border-color: transparent;
          box-shadow: 0 8px 36px rgba(212,168,67,0.55);
          transform: translateY(-2px);
        }

        /* ===== BADGE ===== */
        .badge {
          display: inline-block; padding: 8px 22px;
          background: rgba(212,168,67,0.12);
          backdrop-filter: blur(8px);
          color: #f5c842; font-family: 'Cinzel', serif; font-size: 10.5px;
          letter-spacing: 0.26em; border-radius: 30px;
          border: 1px solid rgba(212,168,67,0.35);
          text-transform: uppercase; font-weight: 600;
          box-shadow: 0 0 20px rgba(212,168,67,0.08) inset, 0 1px 0 rgba(255,255,255,0.1) inset;
        }

        /* ===== DIVIDER ===== */
        .divider {
          width: 70px; height: 3px; margin: 20px auto;
          background: linear-gradient(90deg, transparent, #d4a843, #f5c842, #d4a843, transparent);
          border-radius: 2px;
          box-shadow: 0 0 12px rgba(212,168,67,0.5);
        }

        /* ===== SECTION TITLE ===== */
        .section-title {
          font-family: 'Cinzel Decorative', serif;
          font-weight: 700; letter-spacing: 0.04em; line-height: 1.15;
        }

        /* ===== SOCIAL LINK ===== */
        .social-link {
          display: flex; align-items: center; gap: 18px; padding: 20px 28px;
          text-decoration: none; color: #f0ede8;
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .social-link:hover { transform: translateX(8px); }

        /* ===== FEATURE ITEM ===== */
        .feature-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .feature-item:last-child { border-bottom: none; }

        /* ===== ORBS ===== */
        .orb {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: orbDrift 12s ease-in-out infinite;
        }

        /* ===== RING PULSE ===== */
        .ring {
          position: absolute; border-radius: 50%;
          border: 1.5px solid rgba(212,168,67,0.45);
          animation: ringExpand 3s ease-out infinite;
        }

        /* ===== RESPONSIVE ===== */
        @media(min-width:768px){ .bottom-nav{display:none!important;} .top-nav{display:flex!important;} }
        @media(max-width:767px){
          .top-nav{display:none!important;} .bottom-nav{display:flex!important;}
          .hero-h1{font-size:46px!important;}
          .section-title{font-size:26px!important;}
          .grid-3{grid-template-columns:1fr!important;}
          .price-card{padding:36px 28px!important;}
        }
      `}</style>

      {/* ─── BACKGROUND SCENE ─── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        {/* Deep gradient base */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 20% 20%, #1a1030 0%, #0d1117 40%, #090c14 100%)"
        }} />
        {/* Large ambient orbs */}
        <div className="orb" style={{ top: "-10%", right: "-5%", width: 700, height: 700, background: "radial-gradient(circle, rgba(180,130,30,0.18) 0%, transparent 65%)", animationDuration: "18s" }} />
        <div className="orb" style={{ bottom: "10%", left: "-8%", width: 550, height: 550, background: "radial-gradient(circle, rgba(100,60,180,0.14) 0%, transparent 65%)", animationDuration: "22s", animationDelay: "-8s" }} />
        <div className="orb" style={{ top: "40%", left: "35%", width: 400, height: 400, background: "radial-gradient(circle, rgba(60,120,200,0.1) 0%, transparent 65%)", animationDuration: "15s", animationDelay: "-4s" }} />
        <div className="orb" style={{ top: "70%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(200,80,120,0.08) 0%, transparent 65%)", animationDuration: "20s", animationDelay: "-12s" }} />
        {/* Fine star dust */}
        {[...Array(40)].map((_,i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 73 + 17) % 100}%`,
            top: `${(i * 47 + 11) % 100}%`,
            width: i % 4 === 0 ? 2 : 1,
            height: i % 4 === 0 ? 2 : 1,
            borderRadius: "50%",
            background: `rgba(255,255,255,${0.1 + (i % 5) * 0.06})`,
            animation: `float ${4 + (i % 6)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 6}s`
          }} />
        ))}
      </div>

      {/* ─── TOP NAV ─── */}
      <nav className="top-nav" style={{
        display: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60
          ? "rgba(10,8,18,0.75)"
          : "transparent",
        backdropFilter: scrollY > 60 ? "blur(28px) saturate(1.8)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.1)" : "none",
        boxShadow: scrollY > 60 ? "0 4px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset" : "none",
        padding: "18px 52px", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)"
      }}>
        <div className="gold-static" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 14, letterSpacing: "0.06em" }}>
          ✦ Shukla Mehendi Arts
        </div>
        <div style={{ display: "flex", gap: 40 }}>
          {sections.map(sec => (
            <button key={sec} className={`nav-btn ${active === sec ? "active" : ""}`} onClick={() => scrollTo(sec)}>{sec}</button>
          ))}
        </div>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "10px 28px", fontSize: 11 }}>Enroll Now</a>
      </nav>

      {/* ─── HERO ─── */}
      <section id="Home" data-section="Home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", zIndex: 1, overflow: "hidden",
        padding: "120px 24px 100px"
      }}>
        {/* Decorative circles — Aero bubble motif */}
        {[
          { s: 440, top: "8%", right: "-5%", opacity: 0.12, dur: "20s" },
          { s: 260, top: "60%", left: "-4%", opacity: 0.09, dur: "16s", delay: "-5s" },
          { s: 180, bottom: "20%", right: "12%", opacity: 0.07, dur: "14s", delay: "-9s" },
        ].map(({ s, opacity, dur, delay, ...pos }, i) => (
          <div key={i} className="orb" style={{
            ...pos, width: s, height: s,
            border: "1px solid rgba(212,168,67,0.3)",
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            opacity, animationDuration: dur, animationDelay: delay || "0s",
            boxShadow: "0 0 60px rgba(212,168,67,0.06) inset"
          }} />
        ))}

        <div style={{ textAlign: "center", maxWidth: 780, position: "relative", zIndex: 2 }}>
          <Reveal>
            <div className="badge" style={{ marginBottom: 32, animation: "bubblePulse 4s ease-in-out infinite" }}>
              ✦ Traditional Touch · Master Artistry ✦
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="hero-h1" style={{
              fontFamily: "'Cinzel Decorative', serif", fontSize: 76, fontWeight: 700,
              lineHeight: 1.05, marginBottom: 6, letterSpacing: "0.03em", color: "#f0ede8",
              textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 0 80px rgba(212,168,67,0.15)"
            }}>
              Shukla
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="hero-h1 gold" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 76, fontWeight: 700, lineHeight: 1.05, marginBottom: 16, letterSpacing: "0.03em" }}>
              Mehendi Arts
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11.5, letterSpacing: "0.38em",
              color: "rgba(245,200,66,0.5)", textTransform: "uppercase", marginBottom: 32
            }}>
              The Art of Henna
            </div>
          </Reveal>

          <div className="divider" />

          <Reveal delay={0.2}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
              fontSize: 22, color: "rgba(240,237,232,0.75)", lineHeight: 1.8,
              fontWeight: 400, maxWidth: 580, margin: "28px auto 48px",
              textShadow: "0 1px 8px rgba(0,0,0,0.5)"
            }}>
              Learn the ancient art of henna from master artists. One transformational month — live online via Google Meet.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div style={{ display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
              <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">Enroll — ₹5,999</a>
              <button className="btn-outline" onClick={() => scrollTo("Course")}>View Curriculum</button>
            </div>
          </Reveal>

          {/* Stats row inside glass pill */}
          <Reveal delay={0.28}>
            <GlassCard style={{ display: "inline-flex", gap: 0, borderRadius: 60, padding: "22px 8px" }}>
              {[["20+", "Design Styles"], ["100%", "Online"], ["1 Month", "Intensive"], ["Free", "Kit Included"]].map(([num, label], i) => (
                <div key={label} style={{ textAlign: "center", padding: "0 32px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <div className="gold" style={{ fontFamily: "'Cinzel', serif", fontSize: 22, fontWeight: 700 }}>{num}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(240,237,232,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </GlassCard>
          </Reveal>
        </div>

        <div style={{ position: "absolute", bottom: 36, left: "50%", animation: "scrollBounce 2.2s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(240,237,232,0.35)" }}>Scroll</div>
          <div style={{ width: 1, height: 48, background: "linear-gradient(rgba(212,168,67,0.6), transparent)" }} />
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="About" data-section="About" style={{ padding: "120px 24px", maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="badge">About Us</div>
            <div className="divider" />
            <h2 className="section-title gold-static" style={{ fontSize: 38, marginBottom: 18 }}>The Art of Henna</h2>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 21,
              color: "rgba(240,237,232,0.7)", fontStyle: "italic",
              maxWidth: 580, margin: "0 auto", lineHeight: 1.85,
              textShadow: "0 1px 6px rgba(0,0,0,0.4)"
            }}>
              We carry forward centuries of tradition with a modern, accessible approach to teaching henna artistry.
            </p>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 22 }}>
          {[
            { icon: "🌿", title: "Pure Henna", desc: "Learn authentic mixology using natural, skin-safe henna ingredients for rich, lasting colour." },
            { icon: "🎨", title: "All Styles", desc: "From Arabic florals to intricate Indian bridal designs — master every tradition." },
            { icon: "🏆", title: "Expert Guidance", desc: "Step-by-step live instruction from professional mehendi artists with years of experience." },
            { icon: "📦", title: "Kit Delivered", desc: "A complete professional mehendi kit with cones, tools and practice sheets — delivered free." },
          ].map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <GlassCard style={{ padding: "38px 30px", height: "100%" }}>
                {/* Bubble highlight inside card */}
                <div style={{
                  position: "absolute", top: -30, right: -20, width: 120, height: 120,
                  borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 40%, rgba(212,168,67,0.12) 0%, transparent 70%)",
                  pointerEvents: "none"
                }} />
                <div style={{ fontSize: 42, marginBottom: 20, filter: "drop-shadow(0 4px 10px rgba(212,168,67,0.4))" }}>{icon}</div>
                <h3 className="gold-static" style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 600, marginBottom: 14, letterSpacing: "0.06em" }}>{title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(240,237,232,0.72)", lineHeight: 1.75, fontWeight: 400 }}>{desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section style={{ padding: "0 24px 120px", maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="badge">Meet the Founder</div>
            <div className="divider" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <GlassCard style={{ padding: "60px 50px" }}>
            {/* Large bubble decoration */}
            <div style={{
              position: "absolute", top: -60, right: -40, width: 280, height: 280, borderRadius: "50%",
              border: "1px solid rgba(212,168,67,0.15)",
              background: "radial-gradient(circle at 35% 35%, rgba(255,255,255,0.06) 0%, transparent 65%)",
              pointerEvents: "none"
            }} />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 24 }}>
              {/* Avatar with ring pulses */}
              <div style={{ position: "relative", width: 120, height: 120 }}>
                <div className="ring" style={{ width: 120, height: 120, top: 0, left: 0 }} />
                <div className="ring" style={{ width: 120, height: 120, top: 0, left: 0, animationDelay: "1.5s" }} />
                <div style={{
                  width: 120, height: 120, borderRadius: "50%",
                  background: "linear-gradient(135deg, #9a7010, #c9961a, #f5c842, #e8b830)",
                  backgroundSize: "200% 200%", animation: "shimmer 5s ease infinite",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50,
                  boxShadow: "0 0 40px rgba(212,168,67,0.4), 0 1px 0 rgba(255,255,255,0.3) inset"
                }}>🌿</div>
              </div>
              <div>
                <h3 className="section-title" style={{ fontSize: 32, color: "#f0ede8", marginBottom: 8, textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}>M. Sumalatha</h3>
                <div className="gold-static" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18 }}>
                  Founder & Master Henna Artist
                </div>
              </div>
              <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #d4a843, #f5c842, #d4a843, transparent)", borderRadius: 2, boxShadow: "0 0 12px rgba(212,168,67,0.5)" }} />
              <p style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: 21,
                color: "rgba(240,237,232,0.75)", lineHeight: 1.85, fontStyle: "italic", maxWidth: 580,
                textShadow: "0 1px 6px rgba(0,0,0,0.4)"
              }}>
                With a lifelong passion for the ancient art of henna, M. Sumalatha founded Shukla Mehendi Arts to make traditional mehendi education accessible to every aspiring artist. Her expertise spans Arabic, Indian, and bridal styles — passing down cultural heritage with care, precision, and heart.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {["✦ Master Artist", "✦ Online Educator", "✦ Traditional Heritage"].map(tag => (
                  <span key={tag} className="badge" style={{ fontSize: 10 }}>{tag}</span>
                ))}
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* ─── COURSE ─── */}
      <section id="Course" data-section="Course" style={{ position: "relative", zIndex: 1, padding: "120px 24px", overflow: "hidden" }}>
        {/* Extra ambient orb for course section */}
        <div className="orb" style={{ top: "5%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(180,130,30,0.1) 0%, transparent 65%)" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="badge">Curriculum</div>
              <div className="divider" />
              <h2 className="section-title gold-static" style={{ fontSize: 38, marginBottom: 16 }}>Basic to Bridal</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "rgba(240,237,232,0.65)", fontStyle: "italic" }}>
                One comprehensive month · everything you need to start your mehendi journey
              </p>
            </div>
          </Reveal>

          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22, marginBottom: 50 }}>
            {[
              { title: "Foundation Skills", num: "01", col: "rgba(60,160,120,0.15)", items: ["Basic Elements & Borders", "Types of Flowers & Leaves", "Henna Mixology", "Arabic Design Making", "Checks & Grid Patterns"] },
              { title: "Intermediate Designs", num: "02", col: "rgba(212,168,67,0.12)", items: ["Cut Work Designs", "Finger Design Making", "Indian Design Making", "Startup Cutwork Designs", "Peacock & Elephant Motifs"] },
              { title: "Advanced Bridal", num: "03", col: "rgba(180,60,100,0.12)", items: ["Basic Bridal Elements", "Kalasham · Wedding Knot · Dol", "Swan & Parrot Motifs", "Bridal Design Making", "Bride & Groom Face"] },
            ].map(({ title, num, col, items }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <GlassCard style={{ padding: "34px 30px", height: "100%" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: col, pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
                    <div className="gold" style={{ fontFamily: "'Cinzel', serif", fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{num}</div>
                    <div className="gold-static" style={{ fontFamily: "'Cinzel', serif", fontSize: 13.5, fontWeight: 600, letterSpacing: "0.06em" }}>{title}</div>
                  </div>
                  {items.map(item => (
                    <div key={item} className="feature-item">
                      <div style={{ width: 7, height: 7, background: "linear-gradient(135deg, #d4a843, #f5c842)", borderRadius: "50%", marginTop: 8, flexShrink: 0, boxShadow: "0 0 8px rgba(212,168,67,0.6)" }} />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(240,237,232,0.85)", lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </GlassCard>
              </Reveal>
            ))}
          </div>

          {/* Kit card */}
          <Reveal>
            <GlassCard style={{ padding: "44px 40px", textAlign: "center", marginBottom: 36 }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "rgba(212,168,67,0.06)", pointerEvents: "none" }} />
              <div className="gold" style={{ fontFamily: "'Cinzel', serif", fontSize: 16, marginBottom: 16, letterSpacing: "0.14em", fontWeight: 600 }}>✦ Mehendi Kit Included ✦</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(240,237,232,0.72)", lineHeight: 2.3 }}>
                Record Book · Cone Boxes ×2 (24 pcs) · Henna Powder · Oil · Piping Bags · Practice Sheets · Pins · Dispenser with Tape · Pen · Pencil · Scale · Eraser · A4 Sheets ×15
              </p>
              <div className="gold-static" style={{ marginTop: 20, fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Free Delivery Across India
              </div>
            </GlassCard>
          </Reveal>

          {/* Pricing */}
          <Reveal delay={0.1}>
            <div style={{ textAlign: "center" }}>
              <GlassCard className="price-card" style={{ display: "inline-block", padding: "56px 80px", textAlign: "center" }}>
                <div style={{ position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle at 40% 40%, rgba(212,168,67,0.16) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(240,237,232,0.5)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>One Month Course</div>
                <div className="gold" style={{ fontFamily: "'Cinzel', serif", fontSize: 64, fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>₹5,999</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(240,237,232,0.55)", marginBottom: 32 }}>Non-refundable · Kit included</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#ff8a80", marginBottom: 32,
                  padding: "12px 22px", background: "rgba(255,60,60,0.1)", borderRadius: 12,
                  border: "1px solid rgba(255,100,100,0.25)", fontWeight: 600
                }}>
                  ⚠ Limited Seats Only
                </div>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">Reserve Your Seat →</a>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="Gallery" data-section="Gallery" style={{ padding: "120px 24px", maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div className="badge">Gallery</div>
            <div className="divider" />
            <h2 className="section-title gold-static" style={{ fontSize: 38 }}>The Art Speaks</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { bg: "linear-gradient(135deg, #7b5210 0%, #c9961a 50%, #f5c842 100%)", label: "Arabic Florals", span: "span 2", height: 220 },
            { bg: "linear-gradient(135deg, #4a2c0a 0%, #8b5e1a 60%, #c9961a 100%)", label: "Bridal Full Hand", span: "span 1", height: 220 },
            { bg: "linear-gradient(135deg, #6b4510 0%, #b8820a 50%, #d4a843 100%)", label: "Finger Designs", span: "span 1", height: 200 },
            { bg: "linear-gradient(135deg, #c9961a 0%, #f5c842 40%, #d4a843 70%, #7b5210 100%)", label: "Indian Traditional", span: "span 2", height: 200 },
          ].map(({ bg, label, span, height }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="glass-card" style={{
                gridColumn: span, height, background: bg, borderRadius: 20, overflow: "hidden",
                display: "flex", alignItems: "flex-end", padding: 20,
                boxShadow: "0 8px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.2) inset"
              }}>
                {/* Sheen overlay */}
                <div style={{
                  position: "absolute", top: 0, left: "-60%", right: "-60%", height: "50%",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
                  borderRadius: "20px 20px 80% 80%", pointerEvents: "none"
                }} />
                {/* Henna SVG pattern overlay */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                  <circle cx="20" cy="20" r="14" fill="none" stroke="#fff" strokeWidth="0.6"/>
                  <circle cx="80" cy="80" r="14" fill="none" stroke="#fff" strokeWidth="0.6"/>
                  <path d="M50 5 Q72 26 50 50 Q28 74 50 95" fill="none" stroke="#fff" strokeWidth="0.5"/>
                  <path d="M5 50 Q26 28 50 50 Q74 72 95 50" fill="none" stroke="#fff" strokeWidth="0.5"/>
                </svg>
                <div style={{
                  position: "relative", zIndex: 3,
                  background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.2)", borderRadius: 30,
                  padding: "8px 20px", fontFamily: "'Cinzel', serif", fontSize: 12,
                  color: "rgba(255,255,255,0.95)", letterSpacing: "0.16em",
                  fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.5)"
                }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 19, color: "rgba(240,237,232,0.6)", marginTop: 40, lineHeight: 1.7 }}>
            Follow us on Instagram to see more of our students' stunning work
          </p>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <a href={INSTA_LINK} target="_blank" rel="noreferrer" className="btn-outline">@shukla.mehendi →</a>
          </div>
        </Reveal>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <div style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div className="orb" style={{ top: 0, left: "20%", width: 500, height: 500, background: "radial-gradient(circle, rgba(100,60,180,0.1) 0%, transparent 65%)" }} />
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="badge">Student Love</div>
              <div className="divider" />
              <h2 className="section-title gold-static" style={{ fontSize: 30 }}>What Our Students Say</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 22 }}>
            {[
              { name: "Priya S.", text: "The course transformed me from a complete beginner to creating full bridal designs. The kit was a lovely bonus!", stars: 5 },
              { name: "Meena R.", text: "Learned more in one month than years of self-teaching. The live sessions are incredibly detailed and warm.", stars: 5 },
              { name: "Anjali K.", text: "The evening batch timing was perfect for me. Excellent guidance on mixology and practice techniques!", stars: 5 },
            ].map(({ name, text, stars }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <GlassCard style={{ padding: 34 }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ marginBottom: 16, display: "flex", gap: 4 }}>
                    {Array.from({ length: stars }).map((_, si) => (
                      <span key={si} className="gold-static" style={{ fontSize: 18 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 19, color: "rgba(240,237,232,0.82)", lineHeight: 1.8, marginBottom: 20 }}>"{text}"</p>
                  <div className="gold-static" style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.08em" }}>— {name}</div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CONTACT ─── */}
      <section id="Contact" data-section="Contact" style={{ padding: "120px 24px", maxWidth: 740, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge">Get In Touch</div>
            <div className="divider" />
            <h2 className="section-title gold-static" style={{ fontSize: 38, marginBottom: 16 }}>Contact Us</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: "rgba(240,237,232,0.65)", lineHeight: 1.75 }}>
              Reach us on any platform — we'd love to hear from you
            </p>
          </div>
        </Reveal>

        <GlassCard style={{ overflow: "visible" }}>
          {[
            { href: `tel:${PHONE}`, label: "Call Us", detail: PHONE, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 15a16 16 0 006.09 6.09l1.35-1.35a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#f5c842" strokeWidth="1.5"/></svg> },
            { href: WA_LINK, label: "WhatsApp", detail: "Chat with us instantly", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#f5c842" strokeWidth="1.5"/></svg> },
            { href: INSTA_LINK, label: "Instagram", detail: "@shukla.mehendi", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#f5c842" strokeWidth="1.5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="#f5c842" strokeWidth="1.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#f5c842" strokeWidth="2" strokeLinecap="round"/></svg> },
          ].map(({ href, label, detail, icon }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <a href={href} target="_blank" rel="noreferrer" className="social-link" style={{
                borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none"
              }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 20px rgba(212,168,67,0.1) inset" }}>
                  {icon}
                </div>
                <div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, letterSpacing: "0.07em", color: "#f0ede8", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(240,237,232,0.55)" }}>{detail}</div>
                </div>
                <div className="gold-static" style={{ marginLeft: "auto", fontSize: 22, opacity: 0.6 }}>→</div>
              </a>
            </Reveal>
          ))}
        </GlassCard>

        <Reveal delay={0.3}>
          <GlassCard style={{ padding: "50px 44px", textAlign: "center", marginTop: 28 }}>
            <div style={{ position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 24, color: "#f0ede8", marginBottom: 12, fontWeight: 600, textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}>Ready to Begin?</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 19, color: "rgba(240,237,232,0.65)", marginBottom: 34 }}>Limited seats available — secure yours before they fill up</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-primary">Enroll on WhatsApp →</a>
          </GlassCard>
        </Reveal>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ position: "relative", zIndex: 1, padding: "60px 24px 120px", textAlign: "center" }}>
        <div style={{ width: "100%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(212,168,67,0.35), transparent)", marginBottom: 48 }} />
        <div className="gold" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 22, marginBottom: 10, fontWeight: 700 }}>Shukla Mehendi Arts</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(240,237,232,0.3)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 24 }}>Traditional Touch</div>
        <div style={{ width: 50, height: 2, background: "linear-gradient(90deg, transparent, #d4a843, #f5c842, #d4a843, transparent)", margin: "0 auto 24px", boxShadow: "0 0 12px rgba(212,168,67,0.5)" }} />
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(240,237,232,0.22)" }}>© 2025 Shukla Mehendi Arts · All rights reserved</div>
      </footer>

      {/* ─── BOTTOM NAV (mobile) ─── */}
      <nav className="bottom-nav" style={{
        display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,8,18,0.85)", backdropFilter: "blur(28px) saturate(2)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 -4px 40px rgba(0,0,0,0.6), 0 -1px 0 rgba(255,255,255,0.06) inset",
        padding: "8px 0 env(safe-area-inset-bottom, 8px)",
        justifyContent: "space-around", alignItems: "center"
      }}>
        {[
          { id: "Home", icon: "⌂", label: "Home" },
          { id: "About", icon: "✦", label: "About" },
          { id: "Course", icon: "📖", label: "Course" },
          { id: "Gallery", icon: "🖼", label: "Gallery" },
          { id: "Contact", icon: "☎", label: "Contact" },
        ].map(({ id, icon, label }) => (
          <button key={id} className={`nav-btn ${active === id ? "active" : ""}`} onClick={() => scrollTo(id)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 9, padding: "6px 10px" }}>
            <span style={{ fontSize: 22, filter: active === id ? "drop-shadow(0 0 8px rgba(245,200,66,0.7))" : "none" }}>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
