import { useState, useEffect, useRef } from "react";

const PHONE = "+91-7842027994";
const WA_LINK = `https://wa.me/917842027994`;
const INSTA_LINK = `https://www.instagram.com/shukla.mehendi`;

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};

const HennaIcon = ({ size = 24, color = "#b8860b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8 2 5 5 5 9c0 3 1.5 5.5 4 7l-1 4h8l-1-4c2.5-1.5 4-4 4-7 0-4-3-7-7-7z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 9c1-2 4-2 5 0" stroke={color} strokeWidth="1.2"/>
    <circle cx="12" cy="11" r="1.5" fill={color} opacity="0.5"/>
  </svg>
);

const PaisleyBg = () => (
  <svg style={{ position: "absolute", right: -20, top: -20, opacity: 0.07, pointerEvents: "none" }} width="200" height="200" viewBox="0 0 100 100">
    <path d="M50 10 C70 10 85 25 80 45 C75 65 55 75 45 90 C35 75 15 65 10 45 C5 25 20 10 40 10 C43 10 47 10 50 10Z" fill="#b8860b"/>
    <circle cx="50" cy="50" r="8" fill="none" stroke="#b8860b" strokeWidth="2"/>
    <path d="M50 30 Q60 40 55 50 Q50 60 45 50 Q40 40 50 30Z" fill="#b8860b" opacity="0.5"/>
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
    }, { threshold: 0.4 });
    document.querySelectorAll("[data-section]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const s = {
    page: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: "#faf8f3",
      color: "#2c1f0e",
      overflowX: "hidden",
      minHeight: "100vh",
    },
    gold: "#b8860b",
    goldLight: "#d4a843",
    cream: "#faf8f3",
    beige: "#f0e8d5",
    dark: "#2c1f0e",
    muted: "#7a6040",
  };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500&family=Lato:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f0e8d5; }
        ::-webkit-scrollbar-thumb { background: #b8860b; border-radius: 2px; }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: 'Cinzel', serif; font-size: 11px; letter-spacing: 0.12em; color: #7a6040; transition: color 0.3s; padding: 4px 0; }
        .nav-btn.active { color: #b8860b; }
        .nav-btn:hover { color: #b8860b; }
        .cta { display: inline-block; padding: 13px 32px; background: linear-gradient(135deg, #b8860b, #d4a843); color: #fff; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.15em; text-decoration: none; border: none; cursor: pointer; border-radius: 2px; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 4px 20px rgba(184,134,11,0.3); }
        .cta:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(184,134,11,0.4); }
        .cta-outline { display: inline-block; padding: 12px 30px; background: transparent; color: #b8860b; font-family: 'Cinzel', serif; font-size: 12px; letter-spacing: 0.15em; text-decoration: none; border: 1px solid #b8860b; cursor: pointer; border-radius: 2px; transition: all 0.3s; }
        .cta-outline:hover { background: #b8860b; color: #fff; }
        .card-hover { transition: transform 0.3s, box-shadow 0.3s; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(184,134,11,0.15) !important; }
        .feature-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid rgba(184,134,11,0.12); }
        .feature-item:last-child { border-bottom: none; }
        .dot { width: 6px; height: 6px; background: #b8860b; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
        .social-link { display: flex; align-items: center; gap: 10px; padding: 14px 20px; background: rgba(184,134,11,0.06); border: 1px solid rgba(184,134,11,0.2); border-radius: 4px; text-decoration: none; color: #2c1f0e; font-family: 'Lato', sans-serif; font-size: 14px; transition: all 0.3s; }
        .social-link:hover { background: #b8860b; color: #fff; border-color: #b8860b; }
        .social-link:hover svg path, .social-link:hover svg rect, .social-link:hover svg circle { stroke: #fff; }
        .badge { display: inline-block; padding: 4px 12px; background: rgba(184,134,11,0.12); color: #b8860b; font-family: 'Cinzel', serif; font-size: 10px; letter-spacing: 0.2em; border-radius: 20px; }
        .divider { width: 60px; height: 2px; background: linear-gradient(90deg, #b8860b, #d4a843); margin: 16px auto; }
        .shimmer { background: linear-gradient(90deg, #f0e8d5 25%, #faf5e8 50%, #f0e8d5 75%); background-size: 200% 100%; animation: shimmer 2s infinite; }
        @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin-slow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        .float { animation: float 4s ease-in-out infinite; }
        .pulse-ring { position: absolute; border-radius: 50%; border: 2px solid rgba(184,134,11,0.3); animation: pulse-out 2s ease-out infinite; }
        @keyframes pulse-out { 0%{transform:scale(1);opacity:1} 100%{transform:scale(1.6);opacity:0} }
        @media(min-width:768px){ .bottom-nav { display: none !important; } .top-nav { display: flex !important; } }
        @media(max-width:767px){ .top-nav { display: none !important; } .bottom-nav { display: flex !important; } .hero-title { font-size: 52px !important; } }
      `}</style>

      {/* TOP NAV (desktop) */}
      <nav className="top-nav" style={{ display: "none", position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrollY > 60 ? "rgba(250,248,243,0.96)" : "transparent", backdropFilter: scrollY > 60 ? "blur(10px)" : "none", borderBottom: scrollY > 60 ? "1px solid rgba(184,134,11,0.15)" : "none", padding: "18px 40px", alignItems: "center", justifyContent: "space-between", transition: "all 0.4s" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: s.gold, letterSpacing: "0.1em" }}>✦ Shukla Mehendi Arts</div>
        <div style={{ display: "flex", gap: 32 }}>
          {sections.map(sec => (
            <button key={sec} className={`nav-btn ${active === sec ? "active" : ""}`} onClick={() => scrollTo(sec)}>{sec}</button>
          ))}
        </div>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta" style={{ padding: "10px 24px", fontSize: 11 }}>Enroll Now</a>
      </nav>

      {/* HERO */}
      <section id="Home" data-section="Home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px 24px 60px" }}>
        {/* Animated background circles */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,11,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "0%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.06) 0%, transparent 70%)" }} />
        {/* Decorative ring */}
        <div style={{ position: "absolute", top: "8%", right: "8%", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(184,134,11,0.2)" }} />
        <div style={{ position: "absolute", top: "10%", right: "10%", width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(184,134,11,0.3)" }} />

        <div style={{ textAlign: "center", maxWidth: 700, position: "relative", zIndex: 2 }}>
          <div className="badge float" style={{ marginBottom: 24 }}>✦ Traditional Touch ✦</div>
          <h1 className="hero-title" style={{ fontFamily: "'Cinzel', serif", fontSize: 72, fontWeight: 400, lineHeight: 1.1, color: s.dark, marginBottom: 8, letterSpacing: "0.02em" }}>
            Shukla
          </h1>
          <h1 className="hero-title" style={{ fontFamily: "'Cinzel', serif", fontSize: 72, fontWeight: 400, lineHeight: 1.1, background: `linear-gradient(135deg, ${s.gold}, ${s.goldLight}, ${s.gold})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 24, letterSpacing: "0.02em" }}>
            Mehendi Arts
          </h1>
          <div className="divider" style={{ margin: "0 auto 28px" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 20, color: s.muted, lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
            Learn the ancient art of henna from master artists. One month, transformational skills. Online via Google Meet.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta">Enroll — ₹5,999</a>
            <button className="cta-outline" onClick={() => scrollTo("Course")}>View Curriculum</button>
          </div>
          <div style={{ marginTop: 48, display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap" }}>
            {[["20+", "Design Styles"], ["100%", "Online"], ["1 Month", "Intensive"], ["Kit", "Included"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: s.gold, fontWeight: 500 }}>{num}</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 11, color: s.muted, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: s.muted }}>Scroll</div>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${s.gold}, transparent)` }} />
        </div>
      </section>

      {/* BATCHES STRIP */}
      <div style={{ background: `linear-gradient(135deg, ${s.gold}, #c9962a)`, padding: "20px 24px" }}>
        <Reveal>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16, textAlign: "center" }}>
            {[
              ["📅", "8th March — 7th April"],
              ["🕐", "Batch 1: 11 AM – 1 PM (IST)"],
              ["🌙", "Batch 2: 8 PM – 10 PM (IST)"],
              ["💻", "Online · Google Meet"],
            ].map(([icon, text]) => (
              <div key={text} style={{ color: "#fff", fontFamily: "'Lato', sans-serif", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{icon}</span> {text}
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ABOUT */}
      <section id="About" data-section="About" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge">About Us</div>
            <div className="divider" />
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 38, fontWeight: 400, color: s.dark, marginBottom: 16 }}>The Art of Henna</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: s.muted, fontStyle: "italic", maxWidth: 550, margin: "0 auto", lineHeight: 1.8 }}>
              At Shukla Mehendi Arts, we carry forward centuries of tradition with a modern, accessible approach to teaching henna artistry.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
          {[
            { icon: "🌿", title: "Pure Henna", desc: "Learn authentic mixology using natural, skin-safe henna ingredients for rich, lasting color." },
            { icon: "🎨", title: "All Styles", desc: "From Arabic florals to intricate Indian bridal designs — master every tradition." },
            { icon: "🏆", title: "Expert Guidance", desc: "Step-by-step live instruction from professional mehendi artists with years of experience." },
            { icon: "📦", title: "Kit Delivered", desc: "A complete professional mehendi kit with cones, tools and practice sheets — delivered free." },
          ].map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="card-hover" style={{ background: "#fff", border: "1px solid rgba(184,134,11,0.15)", borderRadius: 8, padding: 32, position: "relative", overflow: "hidden", boxShadow: "0 4px 20px rgba(184,134,11,0.06)" }}>
                <PaisleyBg />
                <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 16, fontWeight: 500, color: s.gold, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: s.muted, lineHeight: 1.7 }}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COURSE */}
      <section id="Course" data-section="Course" style={{ background: "#f5ede0", padding: "100px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <div className="badge">Curriculum</div>
              <div className="divider" />
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 38, fontWeight: 400, color: s.dark }}>Basic to Bridal</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: s.muted, fontStyle: "italic", marginTop: 12 }}>One comprehensive month · everything you need to start your mehendi journey</p>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 48 }}>
            {[
              {
                title: "Foundation Skills", color: "#fff8ee", items: ["Basic Elements & Borders", "Types of Flowers & Leaves", "Henna Mixology", "Arabic Design Making", "Checks & Grid Patterns"]
              },
              {
                title: "Intermediate Designs", color: "#fffbf5", items: ["Cut Work Designs", "Finger Design Making", "Indian Design Making", "Startup Cutwork Designs", "Peacock & Elephant Motifs"]
              },
              {
                title: "Advanced Bridal", color: "#fff9f0", items: ["Basic Bridal Elements", "Kalasham · Wedding Knot · Dol", "Swan & Parrot Motifs", "Bridal Design Making", "Bride & Groom Portraits"]
              },
            ].map(({ title, color, items }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <div className="card-hover" style={{ background: color, border: "1px solid rgba(184,134,11,0.2)", borderRadius: 8, padding: 32, boxShadow: "0 4px 20px rgba(184,134,11,0.06)", height: "100%" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: s.gold, letterSpacing: "0.1em", marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid rgba(184,134,11,0.2)` }}>✦ {title}</div>
                  {items.map(item => (
                    <div key={item} className="feature-item">
                      <div className="dot" />
                      <span style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: s.dark, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Kit details */}
          <Reveal>
            <div style={{ background: `linear-gradient(135deg, rgba(184,134,11,0.08), rgba(212,168,67,0.05))`, border: "1px solid rgba(184,134,11,0.25)", borderRadius: 8, padding: 32, textAlign: "center" }}>
              <div style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: s.gold, marginBottom: 12, letterSpacing: "0.1em" }}>✦ Mehendi Kit Included ✦</div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: 14, color: s.muted, lineHeight: 2 }}>
                Record Book · Cone Boxes ×2 (24 pcs) · Henna Powder · Oil · Piping Bags · Practice Sheets · Pins · Dispenser with Tape · Pen · Pencil · Scale · Eraser · A4 Sheets ×15
              </p>
              <div style={{ marginTop: 20, fontFamily: "'Cinzel', serif", fontSize: 11, color: s.muted, letterSpacing: "0.12em" }}>FREE DELIVERY ACROSS INDIA</div>
            </div>
          </Reveal>

          {/* Pricing */}
          <Reveal delay={0.1}>
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <div style={{ display: "inline-block", background: "#fff", border: "2px solid rgba(184,134,11,0.3)", borderRadius: 12, padding: "40px 60px", boxShadow: "0 8px 40px rgba(184,134,11,0.12)" }}>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: s.muted, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>One Month Course</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: 52, fontWeight: 500, background: `linear-gradient(135deg, ${s.gold}, ${s.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>₹5,999</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 13, color: s.muted, marginBottom: 24 }}>Non-refundable · Kit included</div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "#c0392b", marginBottom: 24, padding: "8px 16px", background: "#fdf2f2", borderRadius: 4 }}>⚠ Limited Seats Only</div>
                <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta">Reserve Your Seat →</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GALLERY */}
      <section id="Gallery" data-section="Gallery" style={{ padding: "100px 24px", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge">Gallery</div>
            <div className="divider" />
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 38, fontWeight: 400, color: s.dark }}>The Art Speaks</h2>
          </div>
        </Reveal>

        {/* Mosaic-style gallery using patterns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { bg: "linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #6B3410 100%)", label: "Arabic Florals", span: "span 2", height: 200 },
            { bg: "linear-gradient(135deg, #5C3317 0%, #8B4513 100%)", label: "Bridal Full Hand", span: "span 1", height: 200 },
            { bg: "linear-gradient(135deg, #704214 0%, #9B5523 100%)", label: "Finger Designs", span: "span 1", height: 180 },
            { bg: "linear-gradient(135deg, #6B3A2A 0%, #8B4513 50%, #5C2E1A 100%)", label: "Indian Traditional", span: "span 2", height: 180 },
          ].map(({ bg, label, span, height }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div style={{ gridColumn: span, height, background: bg, borderRadius: 8, display: "flex", alignItems: "flex-end", padding: 16, position: "relative", overflow: "hidden" }}>
                {/* Pattern overlay */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                  <circle cx="20" cy="20" r="15" fill="none" stroke="#fff" strokeWidth="0.5"/>
                  <circle cx="80" cy="80" r="15" fill="none" stroke="#fff" strokeWidth="0.5"/>
                  <path d="M50 10 Q70 30 50 50 Q30 70 50 90" fill="none" stroke="#fff" strokeWidth="0.5"/>
                  <path d="M10 50 Q30 30 50 50 Q70 70 90 50" fill="none" stroke="#fff" strokeWidth="0.5"/>
                  {[30,50,70].map(x => [30,50,70].map(y => <circle key={`${x}${y}`} cx={x} cy={y} r="1.5" fill="#fff" opacity="0.4"/>))}
                </svg>
                <span style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: "rgba(255,255,255,0.9)", letterSpacing: "0.12em", position: "relative", zIndex: 1 }}>{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p style={{ textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 17, color: s.muted, marginTop: 32 }}>
            Follow us on Instagram to see more of our students' stunning work
          </p>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href={INSTA_LINK} target="_blank" rel="noreferrer" className="cta-outline">@shuklamehendi_arts →</a>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <div style={{ background: `linear-gradient(180deg, #f5ede0 0%, #faf8f3 100%)`, padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div className="badge">Student Love</div>
              <div className="divider" />
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 30, fontWeight: 400, color: s.dark }}>What Our Students Say</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {[
              { name: "Priya S.", text: "The course transformed me from a complete beginner to creating full bridal designs. The kit was a lovely bonus!", stars: 5 },
              { name: "Meena R.", text: "Learned more in one month than I did in years of self-teaching. The live sessions are incredibly detailed.", stars: 5 },
              { name: "Anjali K.", text: "The evening batch timing was perfect for me. Excellent guidance on mixology and practice techniques!", stars: 5 },
            ].map(({ name, text, stars }, i) => (
              <Reveal key={name} delay={i * 0.1}>
                <div className="card-hover" style={{ background: "#fff", border: "1px solid rgba(184,134,11,0.15)", borderRadius: 8, padding: 28, boxShadow: "0 4px 16px rgba(184,134,11,0.06)" }}>
                  <div style={{ color: s.gold, fontSize: 16, marginBottom: 12 }}>{"★".repeat(stars)}</div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: s.dark, lineHeight: 1.7, marginBottom: 16 }}>"{text}"</p>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: 12, color: s.muted }}>— {name}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="Contact" data-section="Contact" style={{ padding: "100px 24px", maxWidth: 700, margin: "0 auto" }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="badge">Get In Touch</div>
            <div className="divider" />
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 38, fontWeight: 400, color: s.dark }}>Contact Us</h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 18, color: s.muted, marginTop: 12 }}>Reach us on any platform — we'd love to hear from you</p>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            {
              href: `tel:${PHONE}`,
              label: "Call Us",
              detail: PHONE,
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 15a16 16 0 006.09 6.09l1.35-1.35a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              )
            },
            {
              href: WA_LINK,
              label: "WhatsApp",
              detail: "Chat with us instantly",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              )
            },
            {
              href: INSTA_LINK,
              label: "Instagram",
              detail: "@shuklamehendi_arts",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )
            },
          ].map(({ href, label, detail, icon }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <a href={href} target="_blank" rel="noreferrer" className="social-link">
                <div style={{ color: s.gold }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, fontFamily: "'Cinzel', serif", color: "inherit", letterSpacing: "0.06em" }}>{label}</div>
                  <div style={{ fontSize: 13, color: s.muted, marginTop: 2, fontFamily: "'Lato', sans-serif" }}>{detail}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 18, color: s.gold, opacity: 0.6 }}>→</div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* CTA final */}
        <Reveal delay={0.3}>
          <div style={{ textAlign: "center", marginTop: 60, padding: 40, background: `linear-gradient(135deg, rgba(184,134,11,0.08), rgba(212,168,67,0.04))`, borderRadius: 12, border: "1px solid rgba(184,134,11,0.2)" }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 22, color: s.dark, marginBottom: 8 }}>Ready to Begin?</h3>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: 16, color: s.muted, marginBottom: 24 }}>Limited seats available — secure yours before they fill up</p>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="cta">Enroll on WhatsApp →</a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer style={{ background: s.dark, padding: "40px 24px 100px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: s.gold, marginBottom: 8 }}>Shukla Mehendi Arts</div>
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Traditional Touch</div>
        <div style={{ width: 40, height: 1, background: s.gold, margin: "0 auto 20px" }} />
        <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2025 Shukla Mehendi Arts · All rights reserved
        </div>
      </footer>

      {/* BOTTOM NAV (mobile) */}
      <nav className="bottom-nav" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,248,243,0.97)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(184,134,11,0.2)", padding: "8px 0 env(safe-area-inset-bottom, 8px)", justifyContent: "space-around", alignItems: "center" }}>
        {[
          { id: "Home", icon: "⌂", label: "Home" },
          { id: "About", icon: "✦", label: "About" },
          { id: "Course", icon: "📖", label: "Course" },
          { id: "Gallery", icon: "🖼", label: "Gallery" },
          { id: "Contact", icon: "☎", label: "Contact" },
        ].map(({ id, icon, label }) => (
          <button key={id} className={`nav-btn ${active === id ? "active" : ""}`} onClick={() => scrollTo(id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, fontSize: 9, padding: "6px 8px" }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
}
