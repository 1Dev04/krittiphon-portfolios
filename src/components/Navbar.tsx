import { useEffect, useState, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

const NAV_ITEMS = [
  { id: "profile",            label: "Profile",            rune: "ᚠ", color: "#a78bfa" },
  { id: "award-certificates", label: "Award & Certificates", rune: "ᚢ", color: "#67e8f9" },
  { id: "experiances",        label: "Experiances",        rune: "ᚦ", color: "#86efac" },
  { id: "projects-reference", label: "Projects Reference", rune: "ᚨ", color: "#fda4af" },
  { id: "skills",             label: "Skills",             rune: "ᚱ", color: "#fcd34d" },
  { id: "other-activites",    label: "Other Activites",    rune: "ᚲ", color: "#fb923c" },
] as const;

type NavId  = typeof NAV_ITEMS[number]["id"];
type Ripple = { id: number; x: number; y: number };

const BREAKPOINT = 720;

export default function Navbar() {
  const [active,   setActive]   = useState<NavId>("profile");
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState<NavId | null>(null);
  const [ripples,  setRipples]  = useState<Ripple[]>([]);
  const [inkPos,   setInkPos]   = useState({ left: 0, width: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuRef  = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  /* ── viewport watch ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── close drawer on resize to desktop ── */
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  /* ── sync active from URL hash on mount ── */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as NavId;
    if (hash && NAV_ITEMS.some(n => n.id === hash)) {
      setActive(hash);
    }
  }, []);

  /* ── listen for popstate (back/forward navigation) ── */
  useEffect(() => {
    const onPopState = () => {
      const hash = window.location.hash.replace("#", "") as NavId;
      if (hash && NAV_ITEMS.some(n => n.id === hash)) {
        setActive(hash);
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
            // update URL hash without triggering a page jump
            const newHash = `#${id}`;
            if (window.location.hash !== newHash) {
              window.history.replaceState(null, "", newHash);
            }
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── ink slider (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;
    const el   = itemRefs.current[active];
    const menu = menuRef.current;
    if (!el || !menu) return;
    const mr = menu.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setInkPos({ left: er.left - mr.left, width: er.width });
  }, [active, scrolled, isMobile]);

  /* ── ripple ── */
  const fireRipple = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rp: Ripple = { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples(p => [...p, rp]);
    setTimeout(() => setRipples(p => p.filter(r => r.id !== rp.id)), 700);
  };

  const handleNavClick = (id: NavId, e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // prevent default jump
    setActive(id);
    fireRipple(e);
    setMenuOpen(false);

    // push a new history entry with the hash
    window.history.pushState(null, "", `#${id}`);

    // smooth scroll to the section
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeColor = NAV_ITEMS.find(n => n.id === active)?.color ?? "#a78bfa";
  const T = (props: string[], dur = ".42s", ease = "cubic-bezier(.22,.68,0,1.2)") =>
    props.map(p => `${p} ${dur} ${ease}`).join(", ");

  /* ── bar styles ── */
  const barStyle: React.CSSProperties = {
    position:  "fixed",
    top:       scrolled && !isMobile ? 14 : 0,
    left:      "50%",
    transform: "translateX(-50%)",
    zIndex:    9000,

    width:        scrolled && !isMobile ? "auto" : "100%",
    maxWidth:     scrolled && !isMobile ? 840    : "100%",
    height:       isMobile ? 56 : scrolled ? 52 : 64,
    borderRadius: scrolled && !isMobile ? 999   : 0,
    padding:      isMobile ? "0 20px" : scrolled ? "0 24px" : "0 5%",

    display: "flex", alignItems: "center",
    justifyContent: isMobile ? "space-between" : "center",

    background:           "rgba(5,5,16,.46)",
    backdropFilter:       "blur(30px) saturate(190%) brightness(1.07)",
    WebkitBackdropFilter: "blur(30px) saturate(190%) brightness(1.07)",

    border:       scrolled && !isMobile ? `1px solid ${activeColor}26` : "none",
    borderBottom: scrolled && !isMobile ? "none" : "1px solid rgba(167,139,250,.08)",

    boxShadow: scrolled && !isMobile
      ? `0 10px 50px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.08), 0 0 0 .5px ${activeColor}18`
      : `inset 0 -1px 0 rgba(255,255,255,.04)`,

    transition: T(["top","width","max-width","height","border-radius","border-color","box-shadow","padding"], ".4s"),
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
        @keyframes shimmer    { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes rippleOut  { from{transform:scale(0);opacity:.5} to{transform:scale(5);opacity:0} }
        @keyframes dotPulse   { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.8);opacity:1} }
        @keyframes drawerIn   { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawerOut  { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-8px)} }
        * { box-sizing:border-box; }
      `}</style>

      {/* ── Main bar ── */}
      <div style={barStyle}>

        {/* shimmer edge — pill/desktop */}
        {scrolled && !isMobile && (
          <div style={{
            position:"absolute", top:0, left:"10%", right:"10%", height:1.5,
            borderRadius:1, pointerEvents:"none",
            background:`linear-gradient(90deg,transparent,${activeColor},rgba(255,255,255,.22),${activeColor},transparent)`,
            backgroundSize:"200% 100%", animation:"shimmer 3.5s linear infinite",
          }}/>
        )}

        {/* bottom rule — full-width */}
        {(!scrolled || isMobile) && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:1,
            pointerEvents:"none",
            background:`linear-gradient(90deg,transparent,${activeColor}55 50%,transparent)`,
            transition:"background .4s",
          }}/>
        )}

        {/* ══ MOBILE: logo word + hamburger ══ */}
        {isMobile && (
          <>
            <span style={{
              fontFamily:"'Space Mono',monospace", fontWeight:700, fontSize:12,
              letterSpacing:".18em", color: activeColor,
              textShadow:`0 0 16px ${activeColor}88`,
              transition:"color .3s, text-shadow .3s",
            }}>
              {NAV_ITEMS.find(n => n.id === active)?.rune ?? "ᚠ"}&nbsp;1DEV
            </span>

            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background:"transparent", border:"none", cursor:"pointer",
                padding:8, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:5,
                width:38, height:38,
              }}
            >
              {[0,1,2].map(i => (
                <span key={i} style={{
                  display:"block", width: i===1 && menuOpen ? 14 : 22, height:2,
                  borderRadius:2,
                  background: activeColor,
                  boxShadow:`0 0 8px ${activeColor}88`,
                  transformOrigin:"center",
                  transform:
                    menuOpen && i===0 ? "translateY(7px) rotate(45deg)" :
                    menuOpen && i===1 ? "scaleX(0)" :
                    menuOpen && i===2 ? "translateY(-7px) rotate(-45deg)" :
                    "none",
                  transition:"transform .3s cubic-bezier(.22,.68,0,1.2), width .3s, background .3s",
                  opacity: i===1 && !menuOpen ? .55 : 1,
                }}/>
              ))}
            </button>
          </>
        )}

        {/* ══ DESKTOP: full menu strip ══ */}
        {!isMobile && (
          <div ref={menuRef} style={{ position:"relative", display:"flex", alignItems:"center", gap:1 }}>

            {/* ink pill */}
            <div aria-hidden style={{
              position:"absolute", top:"50%", left:inkPos.left, width:inkPos.width, height:35,
              transform:"translateY(-50%)", borderRadius:999,
              background:`linear-gradient(135deg,${activeColor}22,${activeColor}0e)`,
              border:`1px solid ${activeColor}40`, backdropFilter:"blur(8px)",
              boxShadow:`0 0 20px ${activeColor}2e, inset 0 1px 0 rgba(255,255,255,.1)`,
              transition: T(["left","width"],".46s") + ", " + T(["background","border-color","box-shadow"],".36s","ease"),
              pointerEvents:"none", zIndex:0,
            }}/>

            {NAV_ITEMS.map(({ id, label, rune, color }) => {
              const isActive  = active  === id;
              const isHovered = hovered === id;
              return (
                <a key={id} href={`#${id}`}
                  ref={el => { itemRefs.current[id] = el; }}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={e => handleNavClick(id, e)}
                  style={{
                    position:"relative", zIndex:1,
                    display:"flex", alignItems:"center", gap:5,
                    padding:"7px 15px", borderRadius:999,
                    textDecoration:"none", overflow:"hidden",
                    userSelect:"none", cursor:"pointer",
                    fontFamily:"'Space Mono',monospace",
                    fontSize:"clamp(9.5px,1.05vw,11.5px)",
                    fontWeight: isActive ? 700 : 400,
                    letterSpacing: isActive ? ".09em" : ".04em",
                    whiteSpace:"nowrap",
                    color: isActive ? color : isHovered ? "rgba(255,255,255,.72)" : "rgba(255,255,255,.28)",
                    textShadow: isActive ? `0 0 18px ${color}cc` : "none",
                    transition:"color .28s ease, letter-spacing .28s ease, text-shadow .28s ease",
                  }}
                >
                  <span style={{ fontSize:9, fontFamily:"serif", lineHeight:1, letterSpacing:0,
                    opacity: isActive ? 1 : isHovered ? .42 : .16,
                    color: isActive ? color : "inherit", transition:"opacity .28s, color .28s",
                  }}>{rune}</span>

                  {label}

                  {isActive && (
                    <span style={{
                      width:4, height:4, borderRadius:"50%", flexShrink:0, marginLeft:2,
                      background:color, boxShadow:`0 0 8px ${color}`,
                      display:"inline-block", animation:"dotPulse 2.5s ease-in-out infinite",
                    }}/>
                  )}

                  {ripples.map(rp => (
                    <span key={rp.id} style={{
                      position:"absolute", left:rp.x-12, top:rp.y-12,
                      width:24, height:24, borderRadius:"50%",
                      background:`${color}40`, pointerEvents:"none",
                      animation:"rippleOut .65s ease forwards",
                    }}/>
                  ))}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* ══ MOBILE DRAWER ══ */}
      {isMobile && menuOpen && (
        <>
          {/* backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position:"fixed", inset:0, zIndex:8998,
              background:"rgba(2,2,12,.55)",
              backdropFilter:"blur(6px)",
              animation:"drawerIn .25s ease both",
            }}
          />

          {/* drawer panel */}
          <div style={{
            position:"fixed", top:56, left:0, right:0, zIndex:8999,
            background:"rgba(5,5,16,.96)",
            borderBottom:`1px solid ${activeColor}33`,
            boxShadow:`0 24px 60px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.06)`,
            backdropFilter:"blur(30px) saturate(180%)",
            WebkitBackdropFilter:"blur(30px) saturate(180%)",
            padding:"12px 0 20px",
            animation:"drawerIn .28s cubic-bezier(.22,.68,0,1.2) both",
          }}>
            {/* shimmer top */}
            <div style={{
              position:"absolute", top:0, left:"8%", right:"8%", height:1,
              background:`linear-gradient(90deg,transparent,${activeColor}88,transparent)`,
              pointerEvents:"none",
            }}/>

            {NAV_ITEMS.map(({ id, label, rune, color }, i) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`}
                  onClick={e => handleNavClick(id, e)}
                  style={{
                    display:"flex", alignItems:"center", gap:14,
                    padding:"13px 28px",
                    textDecoration:"none", userSelect:"none",
                    fontFamily:"'Space Mono',monospace",
                    fontSize:12, fontWeight: isActive ? 700 : 400,
                    letterSpacing: isActive ? ".1em" : ".05em",
                    color: isActive ? color : "rgba(255,255,255,.38)",
                    textShadow: isActive ? `0 0 16px ${color}aa` : "none",
                    borderLeft: isActive ? `2px solid ${color}` : "2px solid transparent",
                    background: isActive ? `linear-gradient(90deg,${color}0c,transparent)` : "transparent",
                    transition:"all .22s ease",
                    animation:`drawerIn .3s ${i * 0.04}s ease both`,
                  }}
                >
                  <span style={{
                    width:28, height:28, borderRadius:8, flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    background: isActive ? `${color}18` : "rgba(255,255,255,.04)",
                    border:`1px solid ${isActive ? color + "44" : "rgba(255,255,255,.08)"}`,
                    fontSize:13, fontFamily:"serif", color: isActive ? color : "rgba(255,255,255,.25)",
                    transition:"all .22s ease",
                  }}>{rune}</span>

                  {label}

                  {isActive && (
                    <span style={{
                      marginLeft:"auto", width:5, height:5, borderRadius:"50%",
                      background:color, boxShadow:`0 0 8px ${color}`,
                      animation:"dotPulse 2.5s ease-in-out infinite",
                    }}/>
                  )}
                </a>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}