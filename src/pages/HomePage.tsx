

import React, { useEffect, useState, useRef } from "react";

/* ── Typed text hook ─────────────────────────────────────────────── */
const useTyped = (strings: string[], typeSpeed = 110, backSpeed = 70, pause = 1400) => {
  const [display, setDisplay] = useState("");
  const [cursor, setCursor]   = useState(true);
  const idx   = useRef(0);
  const char  = useRef(0);
  const dir   = useRef<"type" | "back" | "wait">("type");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      const word = strings[idx.current];
      if (dir.current === "type") {
        char.current++;
        setDisplay(word.slice(0, char.current));
        if (char.current === word.length) {
          dir.current = "wait";
          timer.current = setTimeout(() => { dir.current = "back"; tick(); }, pause);
          return;
        }
      } else if (dir.current === "back") {
        char.current--;
        setDisplay(word.slice(0, char.current));
        if (char.current === 0) {
          idx.current = (idx.current + 1) % strings.length;
          dir.current = "type";
        }
      }
      timer.current = setTimeout(tick, dir.current === "back" ? backSpeed : typeSpeed);
    };
    timer.current = setTimeout(tick, 600);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);

  return { display, cursor };
};

/* ── Social icons (inline SVG) ───────────────────────────────────── */
const GitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);
const YouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const Instagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const Facebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

interface Social {
  href: string;
  icon: React.ReactNode;
  color: string;
  label: string;
}

const socials: Social[] = [
  { href: "https://github.com/1Dev04",                                       icon: <GitHub/>,    color: "#e2e8f0", label: "GitHub" },
  { href: "https://www.youtube.com/@UR1MOSS",                                icon: <YouTube/>,   color: "#ff4444", label: "YouTube" },
  { href: "https://www.instagram.com/1devmoz/",                              icon: <Instagram/>, color: "#e1306c", label: "Instagram" },
  { href: "https://www.facebook.com/krittiphon.yoonaitham.9",                icon: <Facebook/>,  color: "#1877f2", label: "Facebook" },
  { href: "https://www.linkedin.com/in/krittiphon-yoonaitham-a291482b1/",    icon: <LinkedIn/>,  color: "#0a66c2", label: "LinkedIn" },
];

const roles = ["Full Stack Developer", "Game Developer", "Web Developer", "Mobile Developer"];

/* ── Orb ─────────────────────────────────────────────────────────── */
const Orb = ({ style }: { style: React.CSSProperties }) => (
  <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none", ...style }} />
);

/* ── Rune ring ───────────────────────────────────────────────────── */
interface RuneRingProps {
  size: number;
  runes: string;
  duration: number;
  color: string;
  reverse?: boolean;
}

const RuneRing = ({ size, runes, duration, color, reverse }: RuneRingProps) => (
  <div style={{
    position: "absolute", top: "50%", left: "50%",
    width: size, height: size,
    marginLeft: -size / 2, marginTop: -size / 2,
    borderRadius: "50%",
    border: `1px solid ${color}22`,
    animation: `${reverse ? "runeRev" : "runeSpin"} ${duration}s linear infinite`,
    pointerEvents: "none",
  }}>
    {runes.split("").map((r, i) => {
      const angle = (i / runes.length) * 360;
      return (
        <span key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          fontSize: 12, color: `${color}88`,
          transform: `rotate(${angle}deg) translateY(-${size / 2}px) rotate(-${angle}deg)`,
          transformOrigin: "0 0",
          fontFamily: "serif",
          lineHeight: 1,
        }}>{r}</span>
      );
    })}
  </div>
);

/* ── SocialBtn ───────────────────────────────────────────────────── */
interface SocialBtnProps {
  href: string;
  icon: React.ReactNode;
  color: string;
  label: string;
  delay: number;
}

function SocialBtn({ href, icon, color, label, delay }: SocialBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 44, height: 44, borderRadius: 12,
        background: hov ? `${color}22` : "rgba(255,255,255,.04)",
        border: `1px solid ${hov ? color + "77" : "rgba(255,255,255,.08)"}`,
        color: hov ? color : "rgba(255,255,255,.45)",
        textDecoration: "none",
        backdropFilter: "blur(12px)",
        boxShadow: hov ? `0 0 20px ${color}44, inset 0 1px 0 rgba(255,255,255,.1)` : "none",
        transform: hov ? "translateY(-5px) scale(1.08)" : "translateY(0) scale(1)",
        transition: "all .3s cubic-bezier(.22,.68,0,1.2)",
        animationDelay: `${delay}s`,
        animation: "socialIn .6s ease both",
        cursor: "pointer",
      }}
    >
      {icon}
    </a>
  );
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  const { display, cursor } = useTyped(roles);
  const [mounted, setMounted]   = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const px = mousePos.x * 100;
  const py = mousePos.y * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap');

        @keyframes runeSpin  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes runeRev   { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes logoReveal{ from{opacity:0;letter-spacing:.6em;filter:blur(12px)} to{opacity:1;letter-spacing:.06em;filter:blur(0)} }
        @keyframes orbFloat  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.05)} }
        @keyframes socialIn  { from{opacity:0;transform:translateY(16px) scale(.8)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes shimmerText{
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes glowLine  { 0%,100%{opacity:.4;transform:scaleX(.7)} 50%{opacity:1;transform:scaleX(1)} }
        @keyframes avatarGlow{ 0%,100%{box-shadow:0 0 40px #a78bfa44,0 0 80px #7c3aed22} 50%{box-shadow:0 0 60px #a78bfa88,0 0 120px #7c3aed44} }
        @keyframes hexPulse  { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.7;transform:scale(1.04)} }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      <section id="home" style={{
        minHeight: "100vh",
        background: "#05050e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Space Mono', monospace",
        padding: "80px 8% 60px",
      }}>

        {/* ── Background ── */}
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(167,139,250,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.035) 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }} />

        {/* Dynamic radial from mouse */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 50% 40% at ${px}% ${py}%, rgba(124,58,237,.14) 0%, transparent 70%)`,
          transition: "background .15s",
        }} />

        {/* Orbs */}
        <Orb style={{ width: 500, height: 500, top: "-15%", left: "-10%", background: "rgba(124,58,237,.18)", animation: "orbFloat 12s ease-in-out infinite" }} />
        <Orb style={{ width: 400, height: 400, bottom: "-10%", right: "-8%", background: "rgba(6,182,212,.12)", animation: "orbFloat 15s ease-in-out 3s infinite" }} />
        <Orb style={{ width: 250, height: 250, top: "40%", right: "15%", background: "rgba(236,72,153,.1)", animation: "orbFloat 10s ease-in-out 6s infinite" }} />

        {/* Particles */}
        {Array.from({ length: 22 }, (_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 41.3) % 100}%`, top: `${(i * 67.7) % 100}%`,
            width: (i % 3) + 1, height: (i % 3) + 1,
            borderRadius: "50%",
            background: (["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"] as const)[i % 5],
            boxShadow: `0 0 ${(i % 3 + 1) * 4}px ${(["#a78bfa", "#67e8f9", "#86efac", "#fda4af", "#fcd34d"] as const)[i % 5]}`,
            animation: `orbFloat ${5 + i % 6}s ease-in-out ${(i * 0.4) % 5}s infinite`,
            pointerEvents: "none" as const,
          }} />
        ))}

        {/* ── Main content ── */}
        <div style={{
          position: "relative", zIndex: 3,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 0,
          textAlign: "center",
          opacity: mounted ? 1 : 0,
          transition: "opacity .5s",
        }}>

          {/* Avatar orb with rune rings */}
          <div style={{ position: "relative", width: 180, height: 180, marginBottom: 40 }}>
            <RuneRing size={178} runes="ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗ" duration={24} color="#a78bfa" />
            <RuneRing size={150} runes="ᛚᛜᛞᛟᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈ" duration={18} color="#67e8f9" reverse />
            <RuneRing size={122} runes="✦◈◇✿◉⬡✦◈◇✿◉⬡✦◈◇✿" duration={30} color="#a78bfa" />

            {/* Avatar image */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 88, height: 88, borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(167,139,250,.5)",
              animation: "avatarGlow 4s ease-in-out infinite",
              background: "rgba(10,10,30,.8)",
            }}>
              <img
                src="https://res.cloudinary.com/dag73dhpl/image/upload/v1772344095/Screenshot_2026-03-01_124257_u6m2sr.png"
                alt="logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Hex glow bg */}
            <div style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: 110, height: 110,
              background: "radial-gradient(circle, rgba(124,58,237,.3) 0%, transparent 70%)",
              animation: "hexPulse 3s ease-in-out infinite",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />
          </div>

          {/* Logo title */}
          <div style={{
            marginBottom: 16,
            animation: "logoReveal 1.2s cubic-bezier(.22,.68,0,1.2) .2s both",
          }}>
            <h1 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(32px,5.5vw,64px)",
              fontWeight: 900,
              letterSpacing: ".06em",
              background: "linear-gradient(135deg, #f1f5f9 0%, #a78bfa 30%, #67e8f9 65%, #f1f5f9 100%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: "shimmerText 5s linear 1.5s infinite",
              lineHeight: 1.05,
            }}>
              PORTFOLIOS
            </h1>
            {/* Glow line under title */}
            <div style={{
              marginTop: 8,
              height: 1,
              background: "linear-gradient(90deg,transparent,#a78bfa99,#67e8f944,transparent)",
              animation: "glowLine 3s ease-in-out infinite",
            }} />
          </div>

          {/* Name */}
          <div style={{ animation: "fadeUp .8s ease .5s both" }}>
            <h2 style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(14px,2.2vw,22px)",
              fontWeight: 600,
              color: "#e2e8f0",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              textShadow: "0 0 30px rgba(167,139,250,.4)",
              marginBottom: 4,
            }}>
              Krittiphon Yoonaitham
            </h2>
            <div style={{
              height: 1,
              background: "linear-gradient(90deg,transparent,rgba(167,139,250,.5),transparent)",
              margin: "6px auto 0", maxWidth: 260,
            }} />
          </div>

          {/* Typed role */}
          <div style={{ animation: "fadeUp .8s ease .7s both", marginTop: 16, marginBottom: 6 }}>
            <h3 style={{
              fontSize: "clamp(12px,1.6vw,16px)",
              color: "rgba(255,255,255,.45)",
              fontFamily: "'Space Mono', monospace",
              fontWeight: 400,
              letterSpacing: ".08em",
            }}>
              I&apos;m a{" "}
              <span style={{
                color: "#a78bfa",
                textShadow: "0 0 18px #a78bfa88",
                fontWeight: 700,
                letterSpacing: ".06em",
              }}>
                {display}
                <span style={{
                  display: "inline-block", width: 2, height: "1em",
                  background: "#a78bfa", marginLeft: 2,
                  verticalAlign: "middle",
                  opacity: cursor ? 1 : 0,
                  transition: "opacity .1s",
                  boxShadow: "0 0 8px #a78bfa",
                }} />
              </span>
            </h3>
          </div>

          {/* Tag line */}
          <div style={{ animation: "fadeUp .8s ease .85s both", marginBottom: 36 }}>
            <p style={{
              fontSize: "clamp(9px,1vw,11px)",
              color: "rgba(255,255,255,.2)",
              letterSpacing: ".25em",
              textTransform: "uppercase",
              fontFamily: "'Space Mono', monospace",
            }}>
              ✦ &nbsp; Crafting Digital Realms &nbsp; ✦
            </p>
          </div>

          {/* Social icons */}
          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
            animation: "fadeUp .8s ease 1s both",
          }}>
            {socials.map(({ href, icon, color, label }, i) => (
              <SocialBtn key={label} href={href} icon={icon} color={color} label={label} delay={i * 0.07} />
            ))}
          </div>

        </div>

        {/* Bottom fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: "linear-gradient(transparent,#05050e)",
          pointerEvents: "none",
        }} />
      </section>
    </>
  );
}