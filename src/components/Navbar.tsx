import { useEffect, useState, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

/* ─── Nav items — id must match your <section id="..."> exactly ─── */
const NAV_ITEMS = [
  { id: "home",        label: "Home",        rune: "ᚠ", color: "#a78bfa" },
  { id: "about",       label: "About",       rune: "ᚢ", color: "#67e8f9" },
  { id: "project",     label: "Projects",    rune: "ᚦ", color: "#86efac" },
  { id: "skill",       label: "Skills",      rune: "ᚨ", color: "#fda4af" },
  { id: "certificate", label: "Certificate", rune: "ᚱ", color: "#fcd34d" },
  { id: "activity",    label: "Activity",    rune: "ᚲ", color: "#fb923c" },
] as const;

type NavId  = typeof NAV_ITEMS[number]["id"];
type Ripple = { id: number; x: number; y: number };

/* ════════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const [active,   setActive]   = useState<NavId>("home");
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState<NavId | null>(null);
  const [ripples,  setRipples]  = useState<Ripple[]>([]);
  const [inkPos,   setInkPos]   = useState({ left: 0, width: 0 });

  const menuRef  = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* ── scroll spy ── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── ink slider ── */
  useEffect(() => {
    const el   = itemRefs.current[active];
    const menu = menuRef.current;
    if (!el || !menu) return;
    const mr = menu.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setInkPos({ left: er.left - mr.left, width: er.width });
  }, [active, scrolled]);

  /* ── ripple ── */
  const fireRipple = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rp: Ripple = {
      id: Date.now() + Math.random(),
      x:  e.clientX - rect.left,
      y:  e.clientY - rect.top,
    };
    setRipples(prev => [...prev, rp]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== rp.id)), 700);
  };

  const activeColor = NAV_ITEMS.find(n => n.id === active)?.color ?? "#a78bfa";

  /* ── transition string helper ── */
  const T = (props: string[], dur = ".42s", ease = "cubic-bezier(.22,.68,0,1.2)") =>
    props.map(p => `${p} ${dur} ${ease}`).join(", ");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        @keyframes navIn {
          from { opacity:0; transform:translateX(-50%) translateY(-20px) scale(.95); }
          to   { opacity:1; transform:translateX(-50%) translateY(0)     scale(1);   }
        }
        @keyframes rippleOut {
          from { transform:scale(0); opacity:.5; }
          to   { transform:scale(5); opacity:0;  }
        }
        @keyframes dotPulse {
          0%,100% { transform:scale(1);   opacity:.7; }
          50%     { transform:scale(1.8); opacity:1;  }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes glowBreath {
          0%,100% { opacity:.6; }
          50%     { opacity:1;  }
        }
        * { box-sizing:border-box; }
      `}</style>

      {/* ── Bar ── */}
      <div style={{
        position:  "fixed",
        top:       scrolled ? 14 : 0,
        left:      "50%",
        transform: "translateX(-50%)",
        zIndex:    9000,

        width:    scrolled ? "auto"  : "100%",
        maxWidth: scrolled ? 840     : "100%",
        height:   scrolled ? 52      : 64,
        borderRadius: scrolled ? 999 : 0,
        padding:  scrolled ? "0 24px" : "0 5%",

        display: "flex", alignItems: "center", justifyContent: "center",

        /* liquid glass */
        background:           "rgba(5,5,16,.46)",
        backdropFilter:       "blur(30px) saturate(190%) brightness(1.07)",
        WebkitBackdropFilter: "blur(30px) saturate(190%) brightness(1.07)",

        border:       scrolled ? `1px solid ${activeColor}26`        : "none",
        borderBottom: scrolled ? "none"                               : "1px solid rgba(167,139,250,.08)",

        boxShadow: scrolled
          ? `0 10px 50px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.08), 0 0 0 .5px ${activeColor}18`
          : `inset 0 -1px 0 rgba(255,255,255,.04)`,

        animation: scrolled ? "navIn .38s cubic-bezier(.22,.68,0,1.2) both" : "none",

        transition: T(
          ["top","width","max-width","height","border-radius","border-color","box-shadow","padding"],
          ".4s"
        ),
      } as React.CSSProperties}>

        {/* shimmer edge — pill mode */}
        {scrolled && (
          <div style={{
            position: "absolute", top: 0, left: "10%", right: "10%", height: 1.5,
            borderRadius: 1, pointerEvents: "none",
            background: `linear-gradient(90deg,transparent,${activeColor},rgba(255,255,255,.22),${activeColor},transparent)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3.5s linear infinite",
          }}/>
        )}

        {/* bottom rule — full-width mode */}
        {!scrolled && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
            pointerEvents: "none",
            background: `linear-gradient(90deg,transparent,${activeColor}55 50%,transparent)`,
            transition: "background .4s",
          }}/>
        )}

        {/* ── Menu strip ── */}
        <div ref={menuRef} style={{ position: "relative", display: "flex", alignItems: "center", gap: 1 }}>

          {/* sliding ink pill */}
          <div aria-hidden style={{
            position: "absolute",
            top: "50%", left: inkPos.left, width: inkPos.width, height: 35,
            transform: "translateY(-50%)",
            borderRadius: 999,
            background: `linear-gradient(135deg,${activeColor}22,${activeColor}0e)`,
            border: `1px solid ${activeColor}40`,
            backdropFilter: "blur(8px)",
            boxShadow: `0 0 20px ${activeColor}2e, inset 0 1px 0 rgba(255,255,255,.1)`,
            transition: T(["left","width"], ".46s") + ", " +
              T(["background","border-color","box-shadow"], ".36s", "ease"),
            pointerEvents: "none", zIndex: 0,
          }}/>

          {/* items */}
          {NAV_ITEMS.map(({ id, label, rune, color }) => {
            const isActive  = active  === id;
            const isHovered = hovered === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                ref={el => { itemRefs.current[id] = el; }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={e => { setActive(id); fireRipple(e); }}
                style={{
                  position: "relative", zIndex: 1,
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "7px 15px", borderRadius: 999,
                  textDecoration: "none", overflow: "hidden",
                  userSelect: "none", cursor: "pointer",

                  fontFamily: "'Space Mono', monospace",
                  fontSize:   "clamp(9.5px, 1.05vw, 11.5px)",
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: isActive ? ".09em" : ".04em",
                  whiteSpace: "nowrap",

                  color: isActive ? color
                    : isHovered   ? "rgba(255,255,255,.72)"
                    :               "rgba(255,255,255,.28)",
                  textShadow: isActive ? `0 0 18px ${color}cc` : "none",

                  transition: "color .28s ease, letter-spacing .28s ease, text-shadow .28s ease",
                }}
              >
                {/* rune */}
                <span style={{
                  fontSize: 9, fontFamily: "serif", lineHeight: 1, letterSpacing: 0,
                  opacity:  isActive ? 1 : isHovered ? .42 : .16,
                  color:    isActive ? color : "inherit",
                  transition: "opacity .28s, color .28s",
                }}>
                  {rune}
                </span>

                {label}

                {/* active pulse dot */}
                {isActive && (
                  <span style={{
                    width: 4, height: 4, borderRadius: "50%", flexShrink: 0, marginLeft: 2,
                    background: color, boxShadow: `0 0 8px ${color}`,
                    display: "inline-block",
                    animation: "dotPulse 2.5s ease-in-out infinite",
                  }}/>
                )}

                {/* click ripples */}
                {ripples.map(rp => (
                  <span key={rp.id} style={{
                    position: "absolute",
                    left: rp.x - 12, top: rp.y - 12,
                    width: 24, height: 24, borderRadius: "50%",
                    background: `${color}40`, pointerEvents: "none",
                    animation: "rippleOut .65s ease forwards",
                  }}/>
                ))}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}