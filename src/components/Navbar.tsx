"use client"

import { useEffect, useState, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

const navItems = [
  { id: "home",        label: "Home",         rune: "⌂" },
  { id: "about",       label: "About",        rune: "◈" },
  { id: "project",     label: "Projects",     rune: "◇" },
  { id: "skill",       label: "Skills",       rune: "✦" },
  { id: "certificate", label: "Certificates", rune: "✿" },
  { id: "activity",    label: "Activities",   rune: "◉" },
];

const palette = {
  home: "#a78bfa", about: "#67e8f9", project: "#86efac",
  skill: "#fda4af", certificate: "#fcd34d", activity: "#fb923c",
};

export default function Navbar() {
  const [active, setActive]       = useState<keyof typeof palette>("home");
  const [scrolled, setScrolled]   = useState(false);
  const [hovered, setHovered]     = useState<string | null>(null);
  type Ripple = { id: number; x: number; y: number };
  const [ripples, setRipples]     = useState<Ripple[]>([]);
  const [inkPos, setInkPos]       = useState({ left: 0, width: 0 });
  const menuRef                   = useRef<HTMLDivElement>(null);
  const itemRefs                  = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      navItems.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 150 && r.bottom >= 150) setActive(id as keyof typeof palette);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = itemRefs.current[active];
    const menu = menuRef.current;
    if (el && menu) {
      const mr = menu.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      setInkPos({ left: er.left - mr.left, width: er.width });
    }
  }, [active, scrolled]);

  const fireRipple = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
  };

  const color = palette[active] || "#a78bfa";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        @keyframes navDrop {
          from { opacity:0; transform:translateY(-16px) translateX(-50%) scale(.97); }
          to   { opacity:1; transform:translateY(0)     translateX(-50%) scale(1); }
        }
        @keyframes rippleOut {
          from { transform:scale(0);   opacity:.55; }
          to   { transform:scale(4);   opacity:0; }
        }
        @keyframes dotPulse {
          0%,100% { transform:scale(1);   opacity:.7; }
          50%      { transform:scale(1.6); opacity:1; }
        }
        @keyframes shimmerFlow {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes glassGlow {
          0%,100% { box-shadow: 0 8px 40px rgba(0,0,0,.55), 0 0 0px transparent; }
          50%      { box-shadow: 0 8px 40px rgba(0,0,0,.55), 0 0 28px var(--nav-color); }
        }
        * { box-sizing: border-box; }
      `}</style>

      <nav
        style={{
          "--nav-color": color + "44",
          position: "fixed",
          top: scrolled ? 14 : 0,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: scrolled ? "auto" : "100%",
          maxWidth: scrolled ? 780 : "100%",
          minWidth: scrolled ? 0 : "100%",
          borderRadius: scrolled ? 999 : 0,
          padding: scrolled ? "0 28px" : "0 8%",
          height: scrolled ? 54 : 66,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          /* ── Liquid Glass ── */
          background: "rgba(6, 6, 18, 0.42)",
          backdropFilter:       "blur(32px) saturate(200%) brightness(1.08)",
          WebkitBackdropFilter: "blur(32px) saturate(200%) brightness(1.08)",

          border:       scrolled ? `1px solid ${color}35`     : `none`,
          borderBottom: scrolled ? `1px solid ${color}35`     : `1px solid rgba(167,139,250,.1)`,

          /* Glass highlight on top edge */
          boxShadow: scrolled
            ? `0 8px 48px rgba(0,0,0,.6), 0 1px 0 rgba(255,255,255,.07) inset, 0 0 0 0.5px ${color}20`
            : `0 1px 0 rgba(255,255,255,.05) inset`,

          transition: "top .45s cubic-bezier(.22,.68,0,1.2), width .45s cubic-bezier(.22,.68,0,1.2), border-radius .45s, height .35s, border-color .4s, box-shadow .4s, padding .35s",
          animation: scrolled
            ? `glassGlow 5s ease-in-out infinite`
            : "none",
        } as React.CSSProperties & Record<string, any>}
      >

        {/* Top shimmer (scrolled only) */}
        {scrolled && (
          <div style={{
            position: "absolute", top: 0, left: "15%", right: "15%", height: 1,
            background: `linear-gradient(90deg, transparent, ${color}, rgba(255,255,255,.3), ${color}, transparent)`,
            backgroundSize: "200% 100%",
            animation: "shimmerFlow 3.5s linear infinite",
            borderRadius: 1,
            pointerEvents: "none",
          }}/>
        )}

        {/* Bottom line (full width) */}
        {!scrolled && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 1,
            background: `linear-gradient(90deg, transparent 0%, ${color}88 50%, transparent 100%)`,
            transition: "background .4s",
            pointerEvents: "none",
          }}/>
        )}

        {/* ── Menu ── */}
        <div
          ref={menuRef}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          {/* Ink pill */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: inkPos.left,
              width: inkPos.width,
              height: 36,
              transform: "translateY(-50%)",
              borderRadius: 999,
              background: `linear-gradient(135deg, ${color}28, ${color}14)`,
              border: `1px solid ${color}55`,
              backdropFilter: "blur(8px)",
              boxShadow: `0 0 22px ${color}44, inset 0 1px 0 rgba(255,255,255,.12)`,
              transition: "left .48s cubic-bezier(.22,.68,0,1.2), width .48s cubic-bezier(.22,.68,0,1.2), background .4s, border-color .4s, box-shadow .4s",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {navItems.map(({ id, label, rune }) => {
            const isActive  = active  === id;
            const isHovered = hovered === id;
            const c         = isActive ? color : isHovered ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.32)";

            return (
              <a
                key={id}
                href={`#${id}`}
                ref={el => { itemRefs.current[id] = el; }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                onClick={e => { setActive(id as keyof typeof palette); fireRipple(e); }}
                style={{
                  position: "relative",
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "7px 14px",
                  borderRadius: 999,
                  textDecoration: "none",
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "clamp(10px, 1.1vw, 12px)",
                  fontWeight: isActive ? 700 : 400,
                  color: c,
                  letterSpacing: isActive ? "0.09em" : "0.04em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  userSelect: "none",
                  transition: "color .3s, letter-spacing .3s",
                  textShadow: isActive ? `0 0 14px ${color}bb` : "none",
                }}
              >
                {/* Rune */}
                <span style={{
                  fontSize: 10,
                  opacity: isActive ? 1 : isHovered ? 0.55 : 0.2,
                  color: isActive ? color : "inherit",
                  transition: "opacity .3s",
                  lineHeight: 1,
                }}>
                  {rune}
                </span>

                {label}

                {/* Active dot */}
                {isActive && (
                  <span style={{
                    width: 4, height: 4, borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 8px ${color}`,
                    flexShrink: 0,
                    marginLeft: 1,
                    display: "inline-block",
                    animation: "dotPulse 2.2s ease-in-out infinite",
                  }}/>
                )}

                {/* Click ripple */}
                {ripples.map(rp => (
                  <span key={rp.id} style={{
                    position: "absolute",
                    left: rp.x - 10, top: rp.y - 10,
                    width: 20, height: 20,
                    borderRadius: "50%",
                    background: `${color}55`,
                    pointerEvents: "none",
                    animation: "rippleOut .65s ease forwards",
                  }}/>
                ))}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}