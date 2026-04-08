import { useState, useEffect, useRef } from "react";

const PHONE = "+91-7842027994";
const WA_LINK = `https://wa.me/917842027994`;
const INSTA_LINK = `https://www.instagram.com/shukla.mehendi`;

const useInView = (threshold = 0.12) => {
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
  const transforms = { bottom: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.92)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : (transforms[from] || transforms.bottom),
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`
    }}>
      {children}
    </div>
  );
};

const GlossyCard = ({ children, style = {}, className = "" }) => (
  <div className={`glossy-card ${className}`} style={{
    background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(255,252,240,0.95) 100%)",
    border: "1px solid rgba(212,168,67,0.35)",
    borderRadius: 20,
    boxShadow: "0 8px 40px rgba(184,134,11,0.12), 0 2px 8px rgba(184,134,11,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
    position: "relative",
    overflow: "hidden",
    ...style
  }}>
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "50%",
      background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)",
      borderRadius: "20px 20px 0 0", pointerEvents: "none", zIndex: 1
    }} />
    <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
  </div>
);

const GlowOrb = ({ top, left, right, bottom, size = 300, color = "rgba(212,168,67,0.18)", delay = 0 }) => (
  <div style={{
    position: "absolute", top, left, right, bottom,
    width: size, height: size, borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    animation: `orbFloat ${4 + delay}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: "none"
  }} />
);

const HennaPattern = ({ opacity = 0.06, color = "#b8860b" }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
    <defs>
      <pattern id="hp" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
        <circle cx="40" cy="40" r="18" fill="none" stroke={color} strokeWidth="0.8"/>
        <circle cx="40" cy="40" r="10" fill="none" stroke={color} strokeWidth="0.5"/>
        <path d="M40 22 Q50 30 48 40 Q46 50 40 55 Q34 50 32 40 Q30 30 40 22Z" fill={color} opacity="0.4"/>
        <path d="M22 40 Q30 30 40 32 Q50 34 55 40 Q50 46 40 48 Q30 50 22 40Z" fill={color} opacity="0.3"/>
        <circle cx="40" cy="40" r="3" fill={color} opacity="0.5"/>
        <path d="M10 10 Q20 15 15 25" fill="none" stroke={color} strokeWidth="0.6"/>
        <path d="M70 10 Q60 15 65 25" fill="none" stroke={color} strokeWidth="0.6"/>
        <path d="M10 70 Q20 65 15 55" fill="none" stroke={color} strokeWidth="0.6"/>
        <path d="M70 70 Q60 65 65 55" fill="none" stroke={color} strokeWidth="0.6"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hp)"/>
  </svg>
);

const sections = ["Home", "About", "Course", "Gallery", "Contact"];

export default function App() {
  const [active, setActive] = useState("Home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.section); });
    }, { threshold: 0.35 });
    document.querySelectorAll("[data-section]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const G = {
    gold: "#c9961a",
    goldBright: "#f0c040",
    goldLight: "#e8b830",
    goldDark: "#9a7010",
    cream: "#fffdf5",
    white: "#ffffff",
    dark: "#1a1200",
    text: "#2a1e04",
    muted: "#6b5220",
    beige: "#fdf5e0",
  };

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: G.cream, color: G.text, overflowX: "hidden", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #fdf5e0; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#c9961a, #f0c040); border-radius: 3px; }

        @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-20px) scale(1.05)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmerText { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(212,168,67,0.4),0 0 60px rgba(212,168,67,0.15)} 50%{box-shadow:0 0 40px rgba(212,168,67,0.7),0 0 100px rgba(212,168,67,0.25)} }
        @keyframes ringPulse { 0%{transform:scale(1);opacity:0.8} 100%{transform:scale(1.8);opacity:0} }
        @keyframes scrollBounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes borderGlow { 0%,100%{border-color:rgba(212,168,67,0.3);box-shadow:0 0 15px rgba(201,150,26,0.1)} 50%{border-color:rgba(240,192,64,0.7);box-shadow:0 0 30px rgba(240,192,64,0.2)} }

        .float { animation: float 5s ease-in-out infinite; }
        .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
        .ring-pulse { position:absolute; border-radius:50%; border:2px solid rgba(212,168,67,0.5); animation:ringPulse 2.5s ease-out infinite; }

        .gold-text {
          background: linear-gradient(135deg, #9a7010 0%, #c9961a 25%, #f0c040 50%, #e8b830 75%, #c9961a 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 4s ease infinite;
        }
        .gold-text-static {
          background: linear-gradient(135deg, #c9961a 0%, #f0c040 50%, #c9961a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.14em;
          color: #6b5220; transition: all 0.3s; padding: 4px 0;
          text-transform: uppercase;
        }
        .nav-btn.active { color: #c9961a; text-shadow: 0 0 12px rgba(201,150,26,0.5); }
        .nav-btn:hover { color: #c9961a; text-shadow: 0 0 12px rgba(201,150,26,0.5); }

        .cta {
          display: inline-block; padding: 14px 36px;
          background: linear-gradient(135deg, #9a7010 0%, #c9961a 30%, #f0c040 60%, #c9961a 100%);
          background-size: 200% 200%;
          color: #fff; font-family: 'Cinzel', serif; font-size: 12px;
          letter-spacing: 0.16em; text-decoration: none; border: none; cursor: pointer;
          border-radius: 50px;
          transition: all 0.3s;
          box-shadow: 0 4px 24px rgba(201,150,26,0.45), 0 0 0 1px rgba(240,192,64,0.3), inset 0 1px 0 rgba(255,255,255,0.25);
          animation: shimmerText 4s ease infinite;
          font-weight: 600;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .cta:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 40px rgba(201,150,26,0.6), 0 0 60px rgba(240,192,64,0.2), inset 0 1px 0 rgba(255,255,255,0.3);
        }
        .cta-outline {
          display: inline-block; padding: 13px 34px;
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          color: #c9961a; font-family: 'Cinzel', serif; font-size: 12px;
          letter-spacing: 0.16em; text-decoration: none;
          border: 1.5px solid rgba(201,150,26,0.5); cursor: pointer; border-radius: 50px;
          transition: all 0.3s;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(201,150,26,0.1);
          font-weight: 600;
        }
        .cta-outline:hover {
          background: linear-gradient(135deg, #c9961a, #f0c040);
          color: #fff; border-color: transparent;
          box-shadow: 0 6px 30px rgba(201,150,26,0.5);
          transform: translateY(-2px);
        }

        .glossy-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease;
        }
        .glossy-card:hover {
          transform: translateY(-8px) scale(1.01);
          box-shadow: 0 24px 70px rgba(184,134,11,0.2), 0 0 40px rgba(240,192,64,0.1), inset 0 1px 0 rgba(255,255,255,0.9) !important;
        }

        .badge {
          display: inline-block; padding: 6px 18px;
          background: linear-gradient(135deg, rgba(201,150,26,0.15), rgba(240,192,64,0.1));
          color: #c9961a; font-family: 'Cinzel', serif; font-size: 10px;
          letter-spacing: 0.22em; border-radius: 30px;
          border: 1px solid rgba(201,150,26,0.3);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 8px rgba(201,150,26,0.08);
          text-transform: uppercase; font-weight: 600;
        }

        .divider {
          width: 70px; height: 3px; margin: 18px auto;
          background: linear-gradient(90deg, transparent, #c9961a, #f0c040, #c9961a, transparent);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(201,150,26,0.4);
        }

        .feature-item { display:flex; align-items:flex-start; gap:12px; padding:13px 0; border-bottom:1px solid rgba(201,150,26,0.1); }
        .feature-item:last-child { border-bottom:none; }
        .dot { width:7px; height:7px; background:linear-gradient(135deg,#c9961a,#f0c040); border-radius:50%; margin-top:6px; flex-shrink:0; box-shadow:0 0 6px rgba(201,150,26,0.5); }

        .social-link {
          display:flex; align-items:center; gap:14px; padding:16px 22px;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,252,240,0.85));
          backdrop-filter: blur(10px);
          border:1.5px solid rgba(201,150,26,0.25); border-radius:16px;
          text-decoration:none; color:#2a1e04;
          transition:all 0.35s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 4px 20px rgba(201,150,26,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .social-link:hover {
          background: linear-gradient(135deg, #c9961a, #f0c040);
          color:#fff; border-color:transparent;
          box-shadow: 0 12px 40px rgba(201,150,26,0.4), 0 0 30px rgba(240,192,64,0.2);
          transform: translateX(6px);
        }

        .section-title {
          font-family: 'Cinzel Decorative', serif;
          font-weight: 700;
          letter-spacing: 0.04em;
          line-height: 1.15;
        }

        .neon-border {
          border: 1.5px solid rgba(201,150,26,0.4) !important;
          animation: borderGlow 3s ease-in-out infinite;
        }

        @media(min-width:768px){ .bottom-nav{display:none!important;} .top-nav{display:flex!important;} }
        @media(max-width:767px){
          .top-nav{display:none!important;} .bottom-nav{display:flex!important;}
          .hero-title-main{font-size:44px!important;}
          .hero-title-sub{font-size:44px!important;}
          .section-title{font-size:24px!important;}
        }
      `}</style>

      {/* TOP NAV */}
      <nav className="top-nav" style={{
        display: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 60 ? "rgba(255,253,245,0.88)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px) saturate(1.8)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(201,150,26,0.2)" : "none",
        boxShadow: scrollY > 60 ? "0 4px 30px rgba(201,150,26,0.1), 0 1px 0 rgba(255,255,255,0.6)" : "none",
        padding: "16px 48px", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)"
      }}>
        <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 14, letterSpacing: "0.06em" }} className="gold-text-static">
          ✦ Shukla Mehendi Arts
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          {sections.map(sec => (
            <button key={sec} className={`nav-btn ${active === sec ? "active" : ""}`} onClick={() => scrollTo(sec)}>{sec}</button>
          ))}
        </div>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta" style={{ padding: "10px 26px", fontSize: 10 }}>Enroll Now</a>
      </nav>

      {/* HERO */}
      <section id="Home" data-section="Home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", padding: "100px 24px 80px",
        background: "linear-gradient(160deg, #fffdf5 0%, #fdf5dc 40%, #fffaf0 70%, #fffdf5 100%)"
      }}>
        <HennaPattern opacity={0.05} />
        <GlowOrb top="5%" right="0%" size={500} color="rgba(240,192,64,0.15)" delay={0} />
        <GlowOrb bottom="10%" left="-5%" size={400} color="rgba(201,150,26,0.12)" delay={2} />
        <GlowOrb top="40%" left="30%" size={300} color="rgba(240,192,64,0.08)" delay={1} />

        <div style={{ position: "absolute", top: "12%", right: "6%", width: 160, height: 160, borderRadius: "50%", border: "1px solid rgba(201,150,26,0.2)", boxShadow: "0 0 30px rgba(201,150,26,0.1)" }} />
        <div style={{ position: "absolute", top: "15%", right: "9%", width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(240,192,64,0.3)", boxShadow: "0 0 20px rgba(240,192,64,0.15)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "4%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(201,150,26,0.15)" }} />

        <div style={{ textAlign: "center", maxWidth: 750, position: "relative", zIndex: 2 }}>
          <div className="badge float" style={{ marginBottom: 28, fontSize: 11 }}>✦ Traditional Touch · Master Artistry ✦</div>

          <h1 className="hero-title-main" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 68, fontWeight: 700, lineHeight: 1.05, marginBottom: 4, letterSpacing: "0.03em", color: G.dark }}>
            Shukla
          </h1>
          <h1 className="hero-title-sub gold-text" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 68, fontWeight: 700, lineHeight: 1.05, marginBottom: 10, letterSpacing: "0.03em" }}>
            Mehendi Arts
          </h1>
          <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: "0.32em", color: "transparent", WebkitTextStroke: "1px rgba(201,150,26,0.55)", textTransform: "uppercase", marginBottom: 28 }}>
            The Art of Henna
          </div>

          <div className="divider" />

          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 21, color: G.muted, lineHeight: 1.75, fontWeight: 400, maxWidth: 580, margin: "24px auto 44px" }}>
            Learn the ancient art of henna from master artists. One transformational month — online via Google Meet.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 52 }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta">Enroll — ₹5,999</a>
            <button className="cta-outline" onClick={() => scrollTo("Course")}>View Curriculum</button>
          </div>

          <div style={{ display: "flex", gap: 0, justifyContent: "center", flexWrap: "wrap" }}>
            {[["20+", "Design Styles"], ["100%", "Online"], ["1 Month", "Intensive"], ["Free", "Kit Included"]].map(([num, label], i) => (
              <div key={label} style={{ textAlign: "center", padding: "0 24px", borderRight: i < 3 ? "1px solid rgba(201,150,26,0.2)" : "none" }}>
                <div className="gold-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 24, fontWeight: 600 }}>{num}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, color: G.muted, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", animation: "scrollBounce 2s ease-in-out infinite", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 9, letterSpacing: "0.25em", textTransform: "uppercase", color: G.muted, opacity: 0.6 }}>Scroll</div>
          <div style={{ width: 1, height: 44, background: `linear-gradient(${G.gold}, transparent)` }} />
        </div>
      </section>

      {/* BATCHES STRIP */}
      <div style={{
        background: "linear-gradient(135deg, #9a7010 0%, #c9961a 35%, #f0c040 65%, #c9961a 100%)",
        backgroundSize: "200% 200%",
        animation: "shimmerText 5s ease infinite",
        padding: "22px 24px",
        boxShadow: "0 4px 30px rgba(201,150,26,0.4), 0 0 60px rgba(240,192,64,0.15)"
      }}>
        <Reveal>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 14 }}>
            {[["📅","8th March — 7th April"],["🕐","Batch 1: 11 AM – 1 PM IST"],["🌙","Batch 2: 8 PM – 10 PM IST"],["💻","Online · Google Meet"]].map(([icon, text]) => (
              <div key={text} style={{ color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 9, textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}>
                <span style={{ fontSize: 18 }}>{icon}</span> {text}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ABOUT */}
      <section id="About" data-section="About" style={{ padding: "110px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge">About Us</div>
            <div className="divider" />
            <h2 className="section-title gold-text-static" style={{ fontSize: 34, marginBottom: 18 }}>The Art of Henna</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: G.muted, fontStyle: "italic", maxWidth: 560, margin: "0 auto", lineHeight: 1.85 }}>
              At Shukla Mehendi Arts, we carry forward centuries of tradition with a modern, accessible approach to teaching henna artistry.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {[
            { icon: "🌿", title: "Pure Henna", desc: "Learn authentic mixology using natural, skin-safe henna ingredients for rich, lasting colour." },
            { icon: "🎨", title: "All Styles", desc: "From Arabic florals to intricate Indian bridal designs — master every tradition." },
            { icon: "🏆", title: "Expert Guidance", desc: "Step-by-step live instruction from professional mehendi artists with years of experience." },
            { icon: "📦", title: "Kit Delivered", desc: "A complete professional mehendi kit with cones, tools and practice sheets — delivered free." },
          ].map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <GlossyCard style={{ padding: "36px 28px" }}>
                <div style={{ fontSize: 38, marginBottom: 18, filter: "drop-shadow(0 4px 8px rgba(201,150,26,0.3))" }}>{icon}</div>
                <h3 className="gold-text-static" style={{ fontFamily: "'Cinzel', serif", fontSize: 15, fontWeight: 600, marginBottom: 12, letterSpacing: "0.06em" }}>{title}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: G.muted, lineHeight: 1.75 }}>{desc}</p>
              </GlossyCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section style={{ padding: "0px 24px 100px", maxWidth: 820, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div className="badge">Meet the Founder</div>
            <div className="divider" />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <GlossyCard style={{ padding: "52px 44px" }} className="neon-border">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 22 }}>
              <div style={{ position: "relative", width: 110, height: 110 }}>
                <div className="ring-pulse" style={{ width: 110, height: 110, top: 0, left: 0 }} />
                <div className="ring-pulse" style={{ width: 110, height: 110, top: 0, left: 0, animationDelay: "1.2s" }} />
                <div style={{
                  width: 110, height: 110, borderRadius: "50%",
                  background: "linear-gradient(135deg, #9a7010, #c9961a, #f0c040, #e8b830)",
                  backgroundSize: "200% 200%",
                  animation: "glowPulse 3s ease-in-out infinite, shimmerText 5s ease infinite",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44
                }}>🌿</div>
              </div>
              <div>
                <h3 className="section-title" style={{ fontSize: 28, color: G.dark, marginBottom: 6 }}>M. Sumalatha</h3>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17 }} className="gold-text-static">
                  Founder & Master Henna Artist
                </div>
              </div>
              <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #c9961a, #f0c040, #c9961a, transparent)", borderRadius: 2, boxShadow: "0 0 10px rgba(201,150,26,0.5)" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 19, color: G.muted, lineHeight: 1.85, fontStyle: "italic", maxWidth: 560 }}>
                With a lifelong passion for the ancient art of henna, M. Sumalatha founded Shukla Mehendi Arts to make traditional mehendi education accessible to every aspiring artist. Her expertise spans Arabic, Indian, and bridal styles — passing down this cultural heritage with care, precision, and heart.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
                {["✦ Master Artist", "✦ Online Educator", "✦ Traditional Heritage"].map(tag => (
                  <span key={tag} className="badge" style={{ fontSize: 10 }}>{tag}</span>
                ))}
              </div>
            </div>
          </GlossyCard>
        </Reveal>
      </section>

      {/* COURSE */}
      <section id="Course" data-section="Course" style={{
        background: "linear-gradient(160deg, #fdf5dc 0%, #fffaf0 50%, #fdf5dc 100%)",
        padding: "110px 24px", position: "relative", overflow: "hidden"
      }}>
        <HennaPattern opacity={0.04} />
        <GlowOrb top="10%" right="5%" size={400} color="rgba(240,192,64,0.12)" />
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="badge">Curriculum</div>
              <div className="divider" />
              <h2 className="section-title gold-text-static" style={{ fontSize: 34, marginBottom: 14 }}>Basic to Bridal</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: G.muted, fontStyle: "italic", marginTop: 8 }}>One comprehensive month · everything you need to start your mehendi journey</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22, marginBottom: 50 }}>
            {[
              { title: "Foundation Skills", num: "01", items: ["Basic Elements & Borders", "Types of Flowers & Leaves", "Henna Mixology", "Arabic Design Making", "Checks & Grid Patterns"] },
              { title: "Intermediate Designs", num: "02", items: ["Cut Work Designs", "Finger Design Making", "Indian Design Making", "Startup Cutwork Designs", "Peacock & Elephant Motifs"] },
              { title: "Advanced Bridal", num: "03", items: ["Basic Bridal Elements", "Kalasham · Wedding Knot · Dol", "Swan & Parrot Motifs", "Bridal Design Making", "Bride & Groom Face"] },
            ].map(({ title, num, items }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <GlossyCard style={{ padding: "32px 28px", height: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, paddingBottom: 16, borderBottom: "1px solid rgba(201,150,26,0.15)" }}>
                    <div className="gold-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{num}</div>
                    <div className="gold-text-static" style={{ fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>{title}</div>
                  </div>
                  {items.map(item => (
                    <div key={item} className="feature-item">
                      <div className="dot" />
                      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: G.text, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </GlossyCard>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <GlossyCard style={{ padding: 36, textAlign: "center", marginBottom: 32 }} className="neon-border">
              <div className="gold-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 15, marginBottom: 14, letterSpacing: "0.12em", fontWeight: 600 }}>✦ Mehendi Kit Included ✦</div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: G.muted, lineHeight: 2.2 }}>
                Record Book · Cone Boxes ×2 (24 pcs) · Henna Powder · Oil · Piping Bags · Practice Sheets · Pins · Dispenser with Tape · Pen · Pencil · Scale · Eraser · A4 Sheets ×15
              </p>
              <div style={{ marginTop: 18, fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }} className="gold-text-static">
                Free Delivery Across India
              </div>
            </GlossyCard>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ textAlign: "center" }}>
              <GlossyCard style={{ display: "inline-block", padding: "50px 70px", textAlign: "center" }} className="neon-border">
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: G.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>One Month Course</div>
                <div className="gold-text" style={{ fontFamily: "'Cinzel', serif", fontSize: 58, fontWeight: 600, lineHeight: 1, marginBottom: 6 }}>₹5,999</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: G.muted, marginBottom: 28 }}>Non-refundable · Kit included</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#c0392b", marginBottom: 28, padding: "10px 18px", background: "rgba(192,57,43,0.08)", borderRadius: 8, border: "1px solid rgba(192,57,43,0.2)", fontWeight: 700 }}>
                  ⚠ Limited Seats Only
                </div>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta">Reserve Your Seat →</a>
              </GlossyCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="Gallery" data-section="Gallery" style={{ padding: "110px 24px", maxWidth: 1060, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div className="badge">Gallery</div>
            <div className="divider" />
            <h2 className="section-title gold-text-static" style={{ fontSize: 34 }}>The Art Speaks</h2>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            { bg: "linear-gradient(135deg, #c9961a 0%, #f0c040 40%, #e8b020 100%)", label: "Arabic Florals", span: "span 2", height: 210 },
            { bg: "linear-gradient(135deg, #9a7010 0%, #c9961a 60%, #f0c040 100%)", label: "Bridal Full Hand", span: "span 1", height: 210 },
            { bg: "linear-gradient(135deg, #b8860b 0%, #d4a843 50%, #c9961a 100%)", label: "Finger Designs", span: "span 1", height: 190 },
            { bg: "linear-gradient(135deg, #e8b830 0%, #c9961a 50%, #9a7010 100%)", label: "Indian Traditional", span: "span 2", height: 190 },
          ].map(({ bg, label, span, height }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="glossy-card" style={{
                gridColumn: span, height, background: bg, borderRadius: 16,
                display: "flex", alignItems: "flex-end", padding: 18,
                position: "relative", overflow: "hidden",
                boxShadow: "0 8px 40px rgba(201,150,26,0.25), inset 0 1px 0 rgba(255,255,255,0.4)"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)", borderRadius: "16px 16px 0 0" }} />
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#fff" strokeWidth="0.7"/>
                  <circle cx="80" cy="80" r="16" fill="none" stroke="#fff" strokeWidth="0.7"/>
                  <path d="M50 8 Q72 28 50 50 Q28 72 50 92" fill="none" stroke="#fff" strokeWidth="0.6"/>
                  <path d="M8 50 Q28 28 50 50 Q72 72 92 50" fill="none" stroke="#fff" strokeWidth="0.6"/>
                  {[25,50,75].map(x => [25,50,75].map(y => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="#fff" opacity="0.35"/>))}
                </svg>
                <div style={{
                  position: "relative", zIndex: 2,
                  background: "rgba(255,255,255,0.22)", backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.4)", borderRadius: 30,
                  padding: "6px 16px", fontFamily: "'Cinzel', serif", fontSize: 11,
                  color: "rgba(255,255,255,0.95)", letterSpacing: "0.14em",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                  fontWeight: 600, textShadow: "0 1px 4px rgba(0,0,0,0.2)"
                }}>{label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: G.muted, marginTop: 36, lineHeight: 1.7 }}>
            Follow us on Instagram to see more of our students' stunning work
          </p>
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <a href={INSTA_LINK} target="_blank" rel="noreferrer" className="cta-outline">@shuklamehendi_arts →</a>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <div style={{ background: "linear-gradient(160deg, #fdf5dc 0%, #fffaf0 60%, #fdf5dc 100%)", padding: "70px 24px", position: "relative", overflow: "hidden" }}>
        <HennaPattern opacity={0.04} />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <div className="badge">Student Love</div>
              <div className="divider" />
              <h2 className="section-title gold-text-static" style={{ fontSize: 28 }}>What Our Students Say</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { name: "Priya S.", text: "The course transformed me from a complete beginner to creating full bridal designs. The kit was a lovely bonus!", stars: 5 },
              { name: "Meena R.", text: "Learned more in one month than I did in years of self-teaching. The live sessions are incredibly detailed.", stars: 5 },
              { name: "Anjali K.", text: "The evening batch timing was perfect for me. Excellent guidance on mixology and practice techniques!", stars: 5 },
            ].map(({ name, text, stars }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <GlossyCard style={{ padding: 30 }}>
                  <div style={{ marginBottom: 14, display: "flex", gap: 3 }}>
                    {Array.from({ length: stars }).map((_, si) => (
                      <span key={si} className="gold-text-static" style={{ fontSize: 17 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: G.text, lineHeight: 1.75, marginBottom: 18 }}>"{text}"</p>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: "0.08em" }} className="gold-text-static">— {name}</div>
                </GlossyCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="Contact" data-section="Contact" style={{ padding: "110px 24px", maxWidth: 720, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div className="badge">Get In Touch</div>
            <div className="divider" />
            <h2 className="section-title gold-text-static" style={{ fontSize: 34, marginBottom: 14 }}>Contact Us</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: G.muted, lineHeight: 1.75 }}>Reach us on any platform — we'd love to hear from you</p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { href: `tel:${PHONE}`, label: "Call Us", detail: PHONE, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 15a16 16 0 006.09 6.09l1.35-1.35a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/></svg> },
            { href: WA_LINK, label: "WhatsApp", detail: "Chat with us instantly", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.5"/></svg> },
            { href: INSTA_LINK, label: "Instagram", detail: "@shuklamehendi_arts", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.5"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg> },
          ].map(({ href, label, detail, icon }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <a href={href} target="_blank" rel="noreferrer" className="social-link">
                <div style={{ color: G.gold, filter: "drop-shadow(0 0 6px rgba(201,150,26,0.4))" }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, fontFamily: "'Cinzel', serif", letterSpacing: "0.07em" }}>{label}</div>
                  <div style={{ fontSize: 13, color: G.muted, marginTop: 2, fontFamily: "'Lato', sans-serif" }}>{detail}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 20, opacity: 0.5 }} className="gold-text-static">→</div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <GlossyCard style={{ padding: "44px 40px", textAlign: "center", marginTop: 60 }} className="neon-border">
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: G.dark, marginBottom: 10, fontWeight: 600 }}>Ready to Begin?</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: G.muted, marginBottom: 28 }}>Limited seats available — secure yours before they fill up</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta">Enroll on WhatsApp →</a>
          </GlossyCard>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: "linear-gradient(160deg, #1a1200 0%, #2a1e04 60%, #1a1200 100%)",
        padding: "50px 24px 110px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <HennaPattern opacity={0.06} color="#c9961a" />
        <GlowOrb top="0%" left="20%" size={300} color="rgba(201,150,26,0.08)" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div className="gold-text" style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 22, marginBottom: 8, fontWeight: 700 }}>Shukla Mehendi Arts</div>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 22 }}>Traditional Touch</div>
          <div style={{ width: 50, height: 2, background: "linear-gradient(90deg, transparent, #c9961a, #f0c040, #c9961a, transparent)", margin: "0 auto 22px", boxShadow: "0 0 10px rgba(201,150,26,0.5)" }} />
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2025 Shukla Mehendi Arts · All rights reserved</div>
        </div>
      </footer>

      {/* BOTTOM NAV (mobile) */}
      <nav className="bottom-nav" style={{
        display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(255,253,245,0.92)", backdropFilter: "blur(20px) saturate(2)",
        borderTop: "1px solid rgba(201,150,26,0.25)",
        boxShadow: "0 -4px 30px rgba(201,150,26,0.12), 0 -1px 0 rgba(255,255,255,0.8)",
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
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 9, padding: "6px 10px" }}>
            <span style={{ fontSize: 20, filter: active === id ? "drop-shadow(0 0 6px rgba(201,150,26,0.6))" : "none" }}>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
