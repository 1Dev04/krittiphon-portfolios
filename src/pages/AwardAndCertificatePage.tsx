import { useEffect, useState, useRef, useCallback } from "react";

/* ══════════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════════ */
type Tab = "frontend" | "backend" | "other";

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
const awards = [
  {
    title: "Completed an Internship in the Full Stack Developer",
    org: "Clicknext Co.,Ltd.",
    year: "2 May 2025 - 31 October 2025",
    color: "#a78bfa",
    img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773244452/IMG_3239_xmjvrx.jpg",
  },
  {
    title: "นิสิตวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์ ศรีราชาคว้ารางวัลจากโครงการ Hack to the Max",
    org: "Hack to the Max: Digital Infrastructure",
    year: "6 - 7 November 2024",
    color: "#67e8f9",
    img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773245022/Screenshot_2026-03-11_225936_b7fnul.png",
  },
  {
    title: "Fraud Monitoring",
    org: "National ITMX Hackathon",
    year: "2024",
    color: "#86efac",
    img: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773243732/Screenshot_2024-10-29_003709_rzxdrh.png",
  },
];

/* ── cert type with optional image ── */
type Cert = {
  image?: string;
  title: string;
  desc: string;
  tag: string;
  color: string;
};

const certificates: Record<Tab, Cert[]> = {
  frontend: [
    {
      image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285639/React_cjm6x6.png",
      title: "Basic React",
      desc: "Completed Basic React training to enhance digital skills for students.",
      tag: "FRONTEND", color: "#7dd3fc",
    },
    {
      image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285721/powerBi_rdluo7.jpg",
      title: "Power BI",
      desc: "Completed Power BI basic training to enhance digital skills for students.",
      tag: "FRONTEND", color: "#7dd3fc",
    },
    {
      image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285725/GoogleC_ycotsm.png",
      title: "Cloud API",
      desc: "Completed Cloud API training to enhance digital skills for students.",
      tag: "FRONTEND", color: "#7dd3fc",
    },
  ],
  backend: [
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285798/jenkins_qv0rqa.jpg", title: "Jenkins",          desc: "Joined the Jenkins corporate training program.",                                                         tag: "BACKEND", color: "#a78bfa" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285790/Golang_u37fgw.jpg", title: "Ultimate Golang",  desc: "Completed Golang backend course with Udemy.",                                                             tag: "BACKEND", color: "#a78bfa" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285803/Java_g0imtf.jpg", title: "Java Programming", desc: "Completed Java Programming with Born to Dev. Built CheeseCake_Cafe with JAVA & PostgreSQL.",              tag: "BACKEND", color: "#a78bfa" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285794/C_uxveew.jpg", title: "C Programming",    desc: "Completed Zero To One: C Programming with Born to Dev. Built CakeCafe_C project.",                        tag: "BACKEND", color: "#a78bfa" },
  ],
  other: [
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773286121/IMG_3244_vs9z52.jpg", title: "Clicknext Co.,Ltd.",           desc: "Completed an internship in the Full Stack Developer",                    tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285936/Fusion_rrfhil.jpg", title: "ICP Hubs Thailand",           desc: "Has successfully participation in Chain Fusion Hacker House",                    tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285949/Hack_o3svyr.png", title: "National ITMX",           desc: "Internship Traine Full Stack Developer",                                               tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285927/KBTG_xadmrz.jpg", title: "Krung Thai Bank",           desc: "ธนาคารกรุงไทย | ผ่านการอบรม",                                               tag: "SPECIAL", color: "#fbbf24" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285954/A14_qvjsss.png", title: "Chula Mooc",                desc: "Exploring Digital Technology Landscape | การสำรวจดิจิทัลเทคโนโลยี",        tag: "SPECIAL", color: "#fbbf24" },
    { image: "", title: "",   desc: "",  tag: "AI",      color: "#818cf8" },
    { image: "", title: "", desc: "",  tag: "AI",      color: "#818cf8" },
    { image: "", title: "",    desc: "",  tag: "AI",      color: "#818cf8" },
    { image: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773285932/Link_mu0uhx.jpg", title: "Network Cabling",           desc: "Link American Standard: Network Cabling for Engineering",                  tag: "OTHER",   color: "#34d399" },
  ],
};

/* ══════════════════════════════════════════════════════════════════
   AWARD SLIDE SECTION  (unchanged)
══════════════════════════════════════════════════════════════════ */
function AwardSection({ isMobile }: { isMobile: boolean }) {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [popup,   setPopup]   = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((n: number) => {
    setCurrent((n + awards.length) % awards.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(current + 1), 3200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [current, paused, go]);

  const award = awards[current];

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <span style={{ fontSize: 18, color: "#fcd34d" }}>🏆</span>
        <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#fcd34d", letterSpacing: ".35em", textTransform: "uppercase", fontWeight: 700 }}>Awards & Achievements</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#fcd34d55,transparent)" }} />
      </div>

      <div
        style={{
          position: "relative", borderRadius: 24, overflow: "hidden",
          height: isMobile ? 260 : 380,
          cursor: "pointer",
          border: `1px solid ${award.color}44`,
          boxShadow: `0 0 60px ${award.color}22, 0 20px 60px rgba(0,0,0,.6)`,
          transition: "border-color .5s, box-shadow .5s",
        }}
        onClick={() => { setPopup(current); setPaused(true); }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <img key={current} src={award.img} alt={award.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", animation: "slideIn .55s cubic-bezier(.22,.68,0,1.2) both" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(5,5,14,.92) 0%, rgba(5,5,14,.3) 55%, transparent 100%)", pointerEvents: "none" }} />

        {[["top-left","tl"],["top-right","tr"],["bottom-left","bl"],["bottom-right","br"]].map(([cls,k]) => (
          <div key={k} style={{
            position: "absolute",
            top: cls.includes("top") ? 12 : "auto",
            bottom: cls.includes("bottom") ? 12 : "auto",
            left: cls.includes("left") ? 12 : "auto",
            right: cls.includes("right") ? 12 : "auto",
            width: 18, height: 18,
            borderTop: cls.includes("top") ? `1.5px solid ${award.color}88` : "none",
            borderBottom: cls.includes("bottom") ? `1.5px solid ${award.color}88` : "none",
            borderLeft: cls.includes("left") ? `1.5px solid ${award.color}88` : "none",
            borderRight: cls.includes("right") ? `1.5px solid ${award.color}88` : "none",
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,.5)", border: `1px solid ${award.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: award.color, backdropFilter: "blur(8px)", pointerEvents: "none" }}>⊕</div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? "20px 18px" : "28px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 9, color: award.color, fontFamily: "'Space Mono',monospace", letterSpacing: ".2em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 999, background: `${award.color}18`, border: `1px solid ${award.color}33` }}>{award.org}</span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontFamily: "'Space Mono',monospace" }}>{award.year}</span>
          </div>
          <h3 style={{ margin: 0, fontFamily: "'Cinzel',serif", fontSize: isMobile ? 16 : 22, fontWeight: 700, color: "#f1f5f9", letterSpacing: ".04em", textShadow: `0 0 20px ${award.color}66` }}>{award.title}</h3>
        </div>

        {!paused && (
          <div style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: award.color, animation: "progressBar 3.2s linear forwards", boxShadow: `0 0 8px ${award.color}` }} />
        )}

        {["←","→"].map((arr, ai) => (
          <button key={arr} onClick={(e) => { e.stopPropagation(); go(current + (ai === 0 ? -1 : 1)); setPaused(true); }}
            style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [ai === 0 ? "left" : "right"]: 14, width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,.55)", border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.7)", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", transition: "all .2s" }}>{arr}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }}>
        {awards.map((a, i) => (
          <button key={i} onClick={() => { setCurrent(i); setPaused(true); }} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 999, background: i === current ? a.color : "rgba(255,255,255,.15)", boxShadow: i === current ? `0 0 10px ${a.color}88` : "none", border: "none", cursor: "pointer", transition: "all .35s cubic-bezier(.22,.68,0,1.2)", padding: 0 }} />
        ))}
      </div>

      {popup !== null && (
        <div onClick={() => setPopup(null)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.88)", backdropFilter: "blur(18px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .25s ease both" }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "relative", maxWidth: 860, width: "100%", borderRadius: 20, overflow: "hidden", border: `1px solid ${awards[popup].color}55`, boxShadow: `0 0 80px ${awards[popup].color}33, 0 30px 80px rgba(0,0,0,.8)`, animation: "popIn .35s cubic-bezier(.22,.68,0,1.2) both" }}>
            <img src={awards[popup].img} alt={awards[popup].title} style={{ width: "100%", display: "block", maxHeight: "80vh", objectFit: "contain", background: "#070714" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px", background: "linear-gradient(0deg,rgba(5,5,14,.95) 0%,transparent 100%)" }}>
              <h3 style={{ margin: 0, fontFamily: "'Cinzel',serif", fontSize: 20, color: "#f1f5f9", fontWeight: 700 }}>{awards[popup].title}</h3>
              <p style={{ margin: "4px 0 0", fontSize: 11, color: awards[popup].color, fontFamily: "'Space Mono',monospace" }}>{awards[popup].org} · {awards[popup].year}</p>
            </div>
            <button onClick={() => setPopup(null)} style={{ position: "absolute", top: 12, right: 12, width: 32, height: 32, borderRadius: "50%", background: "rgba(0,0,0,.7)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
            {["←","→"].map((arr, ai) => (
              <button key={arr} onClick={() => setPopup((popup + (ai===0?-1:1) + awards.length) % awards.length)}
                style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", [ai===0?"left":"right"]: 12, width: 40, height: 40, borderRadius: "50%", background: "rgba(0,0,0,.65)", border: "1px solid rgba(255,255,255,.15)", color: "#fff", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>{arr}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAGIC BOOK CERTIFICATE MODAL
══════════════════════════════════════════════════════════════════ */
function MagicBookPage({ cert, isOpen, onClose, isMobile }: {
  cert: Cert | null;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}) {
  if (!cert) return null;
  const hasImg = !!cert.image;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(3,2,12,.92)", backdropFilter: "blur(20px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "opacity .4s",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "relative",
          width: isMobile ? "100%" : hasImg ? 780 : 620,
          maxWidth: hasImg ? 780 : 620,
          perspective: "1400px",
          animation: isOpen ? "bookOpen .65s cubic-bezier(.22,.68,0,1.2) both" : "none",
        }}
      >
        {/* Book shadow */}
        <div style={{
          position: "absolute", bottom: -30, left: "10%", right: "10%", height: 30,
          background: `radial-gradient(ellipse,${cert.color}44 0%,transparent 70%)`,
          filter: "blur(15px)", pointerEvents: "none",
        }} />

        {/* Book cover */}
        <div style={{
          background: "linear-gradient(135deg,#0d0820 0%,#150d35 40%,#0a1525 100%)",
          borderRadius: 16,
          border: `1px solid ${cert.color}44`,
          boxShadow: `0 0 60px ${cert.color}22, 0 0 120px ${cert.color}11, inset 0 1px 0 rgba(255,255,255,.06)`,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: hasImg && !isMobile ? "row" : "column",
        }}>
          {/* Spine line */}
          <div style={{
            position: "absolute", top: 0, left: 36, bottom: 0, width: 1,
            background: `linear-gradient(180deg,transparent,${cert.color}44,transparent)`,
            zIndex: 1,
          }} />

          {/* Page lines texture */}
          {Array.from({length:8},(_,i) => (
            <div key={i} style={{
              position: "absolute", left: 0, right: 0, height: 1,
              top: `${12 + i * 11}%`,
              background: "rgba(167,139,250,.025)",
              pointerEvents: "none", zIndex: 1,
            }} />
          ))}

          {/* Wax seal */}
          <div style={{
            position: "absolute", top: isMobile ? -18 : -22, left: "50%", transform: "translateX(-50%)",
            width: isMobile ? 44 : 56, height: isMobile ? 44 : 56, borderRadius: "50%",
            background: `radial-gradient(circle,${cert.color} 0%,${cert.color}88 50%,transparent 100%)`,
            border: `2px solid ${cert.color}`,
            boxShadow: `0 0 20px ${cert.color}88, 0 0 40px ${cert.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: isMobile ? 18 : 22, color: "#fff",
            zIndex: 5,
          }}>✦</div>

          {/* Corner marks */}
          {[["top-left","tl"],["top-right","tr"],["bottom-left","bl"],["bottom-right","br"]].map(([cls,k]) => (
            <div key={k} style={{
              position: "absolute",
              top: cls.includes("top") ? 16 : "auto",
              bottom: cls.includes("bottom") ? 16 : "auto",
              left: cls.includes("left") ? 16 : "auto",
              right: cls.includes("right") ? 16 : "auto",
              width: 16, height: 16,
              borderTop: cls.includes("top") ? `1px solid ${cert.color}55` : "none",
              borderBottom: cls.includes("bottom") ? `1px solid ${cert.color}55` : "none",
              borderLeft: cls.includes("left") ? `1px solid ${cert.color}55` : "none",
              borderRight: cls.includes("right") ? `1px solid ${cert.color}55` : "none",
              zIndex: 2, pointerEvents: "none",
            }} />
          ))}

          {/* ── IMAGE PANEL (left on desktop, top on mobile) ── */}
          {hasImg && (
            <div style={{
              position: "relative",
              width: isMobile ? "100%" : "48%",
              flexShrink: 0,
              minHeight: isMobile ? 200 : 320,
              overflow: "hidden",
              borderRight: !isMobile ? `1px solid ${cert.color}22` : "none",
              borderBottom: isMobile ? `1px solid ${cert.color}22` : "none",
            }}>
              <img
                src={cert.image}
                alt={cert.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(.92) saturate(1.05)",
                }}
              />
              {/* image overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: !isMobile
                  ? `linear-gradient(90deg,transparent 70%,#0d0820 100%)`
                  : `linear-gradient(0deg,#0d0820 0%,transparent 60%)`,
                pointerEvents: "none",
              }} />
              {/* tag on image */}
              <div style={{
                position: "absolute", top: 12, left: 12,
                padding: "3px 10px", borderRadius: 999,
                background: `${cert.color}22`, border: `1px solid ${cert.color}44`,
                backdropFilter: "blur(8px)",
                fontSize: 8, color: cert.color, fontFamily: "'Space Mono',monospace",
                letterSpacing: ".2em", fontWeight: 700,
              }}>{cert.tag}</div>
            </div>
          )}

          {/* ── TEXT PANEL ── */}
          <div style={{
            flex: 1,
            padding: isMobile ? "32px 24px 28px" : "48px 40px 40px",
            display: "flex", flexDirection: "column",
            justifyContent: "center",
            position: "relative", zIndex: 2,
            marginTop: !hasImg ? 16 : 0,
          }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 24, marginTop: !hasImg ? 16 : 0 }}>
              <p style={{
                margin: "0 0 10px",
                fontFamily: "'Space Mono',monospace", fontSize: 9,
                color: `${cert.color}99`, letterSpacing: ".4em", textTransform: "uppercase",
              }}>✦ &nbsp; Certificate of Completion &nbsp; ✦</p>
              <h2 style={{
                margin: 0, fontFamily: "'Cinzel',serif",
                fontSize: isMobile ? "clamp(18px,5vw,24px)" : hasImg ? 22 : 30,
                fontWeight: 900, letterSpacing: ".06em",
                background: `linear-gradient(135deg,#f1f5f9 0%,${cert.color} 40%,#f1f5f9 100%)`,
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "shimmer 5s linear infinite",
                lineHeight: 1.25,
              }}>{cert.title}</h2>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${cert.color}44)` }} />
              <span style={{ color: cert.color, fontSize: 12 }}>ᚠᚢᚦ</span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${cert.color}44,transparent)` }} />
            </div>

            {/* Tag badge */}
            {!hasImg && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                <span style={{
                  padding: "4px 16px", borderRadius: 999,
                  background: `${cert.color}14`, border: `1px solid ${cert.color}44`,
                  fontSize: 9, color: cert.color, fontFamily: "'Space Mono',monospace",
                  letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700,
                }}>⬡ &nbsp; {cert.tag}</span>
              </div>
            )}

            {/* Description */}
            <p style={{
              margin: "0 0 24px",
              fontSize: isMobile ? 12 : 13,
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              color: "rgba(255,255,255,.58)",
              lineHeight: 1.9,
              textAlign: "center",
              letterSpacing: ".02em",
            }}>{cert.desc}</p>

            {/* Bottom seal */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${cert.color}22)` }} />
              <div style={{ width: 38, height: 38, borderRadius: "50%", border: `1px solid ${cert.color}44`, background: `${cert.color}0e`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: cert.color }}>ᚠ</div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${cert.color}22,transparent)` }} />
            </div>

            <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 8, color: "rgba(255,255,255,.18)", fontFamily: "'Space Mono',monospace", letterSpacing: ".18em" }}>1DEV ARCANE CODEX — KNOWLEDGE RECORD</p>
          </div>
        </div>

        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: -14, right: -14,
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(5,5,14,.9)", border: `1px solid ${cert.color}44`,
          color: cert.color, fontSize: 14, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 14px ${cert.color}44`,
          zIndex: 10,
        }}>✕</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CERT CARD
══════════════════════════════════════════════════════════════════ */
function CertCard({ cert, index, onOpen, isMobile }: {
  cert: Cert; index: number;
  onOpen: (c: Cert) => void; isMobile: boolean;
}) {
  const [h, sh] = useState(false);
  const hasImg = !!cert.image;

  return (
    <div
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      onClick={() => onOpen(cert)}
      style={{
        position: "relative", borderRadius: 16,
        overflow: "hidden", cursor: "pointer",
        background: h
          ? `linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.03))`
          : "rgba(255,255,255,.04)",
        border: `1px solid ${h ? cert.color+"55" : cert.color+"22"}`,
        backdropFilter: "blur(14px)",
        boxShadow: h ? `0 0 28px ${cert.color}22, 0 12px 36px rgba(0,0,0,.5)` : "0 4px 20px rgba(0,0,0,.3)",
        transform: h ? "translateY(-4px)" : "none",
        transition: "all .32s cubic-bezier(.22,.68,0,1.2)",
        animation: `cardReveal .55s ${index * .07}s ease both`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div style={{
        position: "relative",
        width: "100%",
        height: hasImg ? (isMobile ? 160 : 180) : 0,
        overflow: "hidden",
        flexShrink: 0,
        background: hasImg ? "transparent" : "none",
      }}>
        {hasImg && (
          <>
            <img
              src={cert.image}
              alt={cert.title}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", display: "block",
                transform: h ? "scale(1.06)" : "scale(1)",
                transition: "transform .5s cubic-bezier(.22,.68,0,1.2)",
                filter: "brightness(.85) saturate(1.1)",
              }}
            />
            {/* bottom fade */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
              background: `linear-gradient(0deg,rgba(5,5,14,.95) 0%,transparent 100%)`,
              pointerEvents: "none",
            }} />
            {/* shimmer on hover */}
            {h && (
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg,transparent 40%,${cert.color}18 60%,transparent 80%)`,
                backgroundSize: "200% 200%",
                animation: "shimmer 1.8s linear infinite",
                pointerEvents: "none",
              }} />
            )}
          </>
        )}

        {/* Tag — always on image area (or at top of card if no image) */}
        <div style={{
          position: hasImg ? "absolute" : "relative",
          top: hasImg ? 10 : "auto",
          left: hasImg ? 10 : "auto",
          margin: hasImg ? 0 : "18px 0 0 18px",
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "2px 9px", borderRadius: 20,
          background: `${cert.color}18`, border: `1px solid ${cert.color}44`,
          backdropFilter: hasImg ? "blur(8px)" : "none",
          zIndex: 2,
        }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: cert.color, boxShadow: `0 0 5px ${cert.color}` }} />
          <span style={{ fontSize: 8, color: cert.color, fontFamily: "'Space Mono',monospace", letterSpacing: ".18em", fontWeight: 700 }}>{cert.tag}</span>
        </div>
      </div>

      {/* ── TEXT AREA ── */}
      <div style={{
        padding: hasImg ? "14px 18px 16px" : "18px 18px 16px",
        display: "flex", flexDirection: "column", flex: 1,
        position: "relative",
      }}>
        {/* top accent (no-image cards) */}
        {!hasImg && (
          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: 1.5,
            background: `linear-gradient(90deg,transparent,${cert.color}99,transparent)`,
            opacity: h ? 1 : .4, transition: "opacity .3s",
          }} />
        )}

        {/* Corner marks (no-image cards) */}
        {!hasImg && [["top-left","tl"],["top-right","tr"]].map(([cls,k]) => (
          <div key={k} style={{
            position: "absolute", top: 10,
            left: cls.includes("left") ? 10 : "auto",
            right: cls.includes("right") ? 10 : "auto",
            width: 12, height: 12,
            borderTop: `1px solid ${cert.color}44`,
            borderLeft: cls.includes("left") ? `1px solid ${cert.color}44` : "none",
            borderRight: cls.includes("right") ? `1px solid ${cert.color}44` : "none",
          }} />
        ))}

        <h3 style={{
          margin: "0 0 6px", fontFamily: "'Cinzel',serif",
          fontSize: isMobile ? 13 : 14, fontWeight: 700,
          color: h ? "#f1f5f9" : "#e2d9f3",
          letterSpacing: ".04em", lineHeight: 1.3,
          transition: "color .25s",
        }}>{cert.title}</h3>

        <p style={{
          margin: "0 0 14px", fontSize: 11, color: "rgba(255,255,255,.42)",
          fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.65,
          flex: 1,
        }}>{cert.desc}</p>

        {/* Open hint */}
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 8.5, color: h ? cert.color : "rgba(255,255,255,.2)",
          fontFamily: "'Space Mono',monospace", letterSpacing: ".15em",
          transition: "color .3s",
        }}>
          <span style={{ fontSize: 11 }}>📖</span> OPEN SCROLL
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   CERTIFICATE SECTION
══════════════════════════════════════════════════════════════════ */
function CertificateSection({ isMobile }: { isMobile: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("frontend");
  const [openCert,  setOpenCert]  = useState<Cert | null>(null);
  const [bookOpen,  setBookOpen]  = useState(false);

  const tabs: { key: Tab; label: string; glyph: string; color: string }[] = [
    { key: "frontend", label: "Front-End", glyph: "◈", color: "#7dd3fc" },
    { key: "backend",  label: "Back-End",  glyph: "⬡", color: "#a78bfa" },
    { key: "other",    label: "Others",    glyph: "✦", color: "#fbbf24" },
  ];

  const openBook = (cert: Cert) => {
    setOpenCert(cert);
    setTimeout(() => setBookOpen(true), 10);
  };
  const closeBook = () => {
    setBookOpen(false);
    setTimeout(() => setOpenCert(null), 400);
  };

  const currentCerts = certificates[activeTab];

  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      {/* Section label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <span style={{ fontSize: 18, color: "#a78bfa" }}>📜</span>
        <span style={{ fontFamily: "'Cinzel',serif", fontSize: 11, color: "#a78bfa", letterSpacing: ".35em", textTransform: "uppercase", fontWeight: 700 }}>Certificates</span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,#a78bfa55,transparent)" }} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {tabs.map(t => {
          const active = activeTab === t.key;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
              padding: isMobile ? "8px 16px" : "9px 24px", borderRadius: 40,
              border: active ? `1px solid ${t.color}88` : "1px solid rgba(255,255,255,.1)",
              background: active ? `linear-gradient(135deg,${t.color}22,${t.color}11)` : "rgba(255,255,255,.03)",
              color: active ? t.color : "rgba(255,255,255,.3)",
              fontFamily: "'Cinzel',serif", fontSize: isMobile ? 10 : 12,
              letterSpacing: ".1em", cursor: "pointer",
              backdropFilter: "blur(10px)",
              boxShadow: active ? `0 0 16px ${t.color}22` : "none",
              transition: "all .3s cubic-bezier(.22,.68,0,1.2)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ fontSize: 10 }}>{t.glyph}</span>{t.label}
            </button>
          );
        })}
      </div>

      {/* Cards grid — auto col width responds to screen */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : "repeat(auto-fill, minmax(280px, 1fr))",
        gap: isMobile ? 14 : 18,
      }}>
        {currentCerts.map((cert, i) => (
          <CertCard key={`${activeTab}-${i}`} cert={cert} index={i} onOpen={openBook} isMobile={isMobile} />
        ))}
      </div>

      <MagicBookPage cert={openCert} isOpen={bookOpen} onClose={closeBook} isMobile={isMobile} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
export default function AwardAndCertificatePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [visible,  setVisible]  = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        @keyframes orbF       { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-18px)} }
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes scan       { 0%{top:-2%} 100%{top:102%} }
        @keyframes slideIn    { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
        @keyframes cardReveal { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn     { from{opacity:0} to{opacity:1} }
        @keyframes popIn      { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
        @keyframes bookOpen   {
          0%  { opacity:0; transform: perspective(1200px) rotateY(-50deg) scale(.85); }
          60% { transform: perspective(1200px) rotateY(6deg) scale(1.02); }
          100%{ opacity:1; transform: perspective(1200px) rotateY(0deg) scale(1); }
        }
        @keyframes progressBar { from{width:0} to{width:100%} }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      <section id="award-certificates" style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg,#05050e 0%,#070714 100%)",
        position: "relative", overflow: "hidden",
        fontFamily: "'Space Mono',monospace",
        padding: "90px 0 80px",
      }}>
        {/* BG grid */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(167,139,250,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.028) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />

        {/* Orbs */}
        <div style={{ position: "absolute", width: 480, height: 480, top: "-12%", right: "-8%", borderRadius: "50%", filter: "blur(80px)", background: "rgba(124,58,237,.15)", animation: "orbF 14s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 360, height: 360, bottom: "-8%", left: "-6%", borderRadius: "50%", filter: "blur(70px)", background: "rgba(6,182,212,.10)", animation: "orbF 18s ease-in-out 4s infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 220, height: 220, top: "40%", right: "18%", borderRadius: "50%", filter: "blur(60px)", background: "rgba(253,164,175,.08)", animation: "orbF 11s ease-in-out 7s infinite", pointerEvents: "none" }} />

        {/* Scanline */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,rgba(167,139,250,.18),transparent)", animation: "scan 11s linear infinite", pointerEvents: "none", zIndex: 2 }} />

        {/* Particles */}
        {Array.from({length: 18}, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 53.3) % 100}%`, top: `${(i * 37.7) % 100}%`,
            width: (i % 3) + 1, height: (i % 3) + 1, borderRadius: "50%",
            background: ["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"][i % 5],
            boxShadow: `0 0 ${(i%3+1)*4}px ${["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"][i%5]}`,
            animation: `orbF ${5+i%6}s ease-in-out ${(i*.35)%5}s infinite`, pointerEvents: "none",
          }} />
        ))}

        {/* Content */}
        <div ref={ref} style={{
          position: "relative", zIndex: 3,
          maxWidth: 1060, margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 clamp(20px,5%,60px)",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition: "opacity .7s ease, transform .7s cubic-bezier(.22,.68,0,1.2)",
          display: "flex", flexDirection: "column", gap: isMobile ? 56 : 80,
        }}>
          {/* Page header */}
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 14 }}>
              <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,transparent,#a78bfa)" }} />
              <span style={{ fontSize: 10, color: "#a78bfa", letterSpacing: ".4em", fontFamily: "'Space Mono',monospace" }}>✦ 1DEV Code ✦</span>
              <div style={{ height: 1, width: 60, background: "linear-gradient(90deg,#a78bfa,transparent)" }} />
            </div>
            <h1 style={{
              fontFamily: "'Cinzel',serif", fontSize: isMobile ? "clamp(22px,7vw,32px)" : "clamp(24px,3.5vw,40px)", fontWeight: 900,
              letterSpacing: ".1em",
              background: "linear-gradient(135deg,#f1f5f9 0%,#a78bfa 30%,#67e8f9 65%,#f1f5f9 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: "shimmer 5s linear 1s infinite",
            }}>AWARD & CERTIFICATE</h1>
          </div>

          <AwardSection isMobile={isMobile} />

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(167,139,250,.3))" }} />
            <span style={{ color: "rgba(167,139,250,.4)", fontSize: 12, letterSpacing: ".2em" }}>ᚠ ᚢ ᚦ</span>
            <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(167,139,250,.3),transparent)" }} />
          </div>

          <CertificateSection isMobile={isMobile} />
        </div>

        {/* Bottom fade */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(transparent,#05050e)", pointerEvents: "none" }} />
      </section>
    </>
  );
}