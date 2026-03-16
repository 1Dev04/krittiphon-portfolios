import { useEffect, useState, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useTheme, SUN, MOON, NAV_ITEMS } from "../components/themeContext";
import type { NavId } from "../components/themeContext";

type Ripple = { id: number; x: number; y: number };
const BREAKPOINT = 768;

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4.5"/>
    <line x1="12" y1="2"    x2="12" y2="5.5"/>
    <line x1="12" y1="18.5" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93"   x2="7.17" y2="7.17"/>
    <line x1="16.83" y1="16.83" x2="19.07" y2="19.07"/>
    <line x1="2"    y1="12" x2="5.5" y2="12"/>
    <line x1="18.5" y1="12" x2="22"  y2="12"/>
    <line x1="4.93" y1="19.07"  x2="7.17" y2="16.83"/>
    <line x1="16.83" y1="7.17"  x2="19.07" y2="4.93"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const { isDark, setIsDark } = useTheme();
  const tk = isDark ? MOON : SUN;

  const [active,   setActive]   = useState<NavId>("profile");
  const [scrolled, setScrolled] = useState(false);
  const [hovered,  setHovered]  = useState<NavId | null>(null);
  const [ripples,  setRipples]  = useState<Ripple[]>([]);
  const [inkPos,   setInkPos]   = useState({ left: 0, width: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const menuRef  = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const T = (p: string[], d = ".4s", e = "cubic-bezier(.22,.68,0,1.2)") =>
    p.map(x => `${x} ${d} ${e}`).join(", ");
  const getColor = (item: typeof NAV_ITEMS[number]) =>
    isDark ? item.moonColor : item.sunColor;

  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < BREAKPOINT);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  useEffect(() => {
    const h = window.location.hash.replace("#", "") as NavId;
    if (h && NAV_ITEMS.some(n => n.id === h)) setActive(h);
  }, []);

  useEffect(() => {
    const fn = () => {
      const h = window.location.hash.replace("#", "") as NavId;
      if (h && NAV_ITEMS.some(n => n.id === h)) {
        setActive(h);
        document.getElementById(h)?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", fn);
    return () => window.removeEventListener("popstate", fn);
  }, []);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 24);
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom >= 120) {
            setActive(id);
            const h = `#${id}`;
            if (window.location.hash !== h) window.history.replaceState(null, "", h);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", fn, { passive: true }); fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = itemRefs.current[active], menu = menuRef.current;
    if (!el || !menu) return;
    const mr = menu.getBoundingClientRect(), er = el.getBoundingClientRect();
    setInkPos({ left: er.left - mr.left, width: er.width });
  }, [active, scrolled, isMobile, isDark]);

  const fireRipple = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const rp: Ripple = { id: Date.now() + Math.random(), x: e.clientX - r.left, y: e.clientY - r.top };
    setRipples(p => [...p, rp]);
    setTimeout(() => setRipples(p => p.filter(x => x.id !== rp.id)), 700);
  };

  const handleNavClick = (id: NavId, e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); setActive(id); fireRipple(e); setMenuOpen(false);
    window.history.pushState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeItem  = NAV_ITEMS.find(n => n.id === active)!;
  const activeColor = getColor(activeItem);

  const barStyle: React.CSSProperties = {
    position: "fixed",
    top: scrolled && !isMobile ? 12 : 0,
    left: "50%", transform: "translateX(-50%)", zIndex: 9000,
    width:        scrolled && !isMobile ? "auto"  : "100%",
    maxWidth:     scrolled && !isMobile ? 1020    : "100%",
    height:       isMobile ? 64 : scrolled ? 60 : 72,
    borderRadius: scrolled && !isMobile ? 999     : 0,
    padding:      isMobile ? "0 20px" : scrolled ? "0 32px" : "0 4%",
    display:"flex", alignItems:"center",
    justifyContent: isMobile ? "space-between" : "center",
    background:           scrolled ? tk.barBgScroll : tk.barBg,
    backdropFilter:       "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border:       scrolled && !isMobile ? `1.5px solid ${activeColor}2e` : "none",
    borderBottom: scrolled && !isMobile ? "none" : `1.5px solid ${tk.borderBottom}`,
    boxShadow:    scrolled && !isMobile ? tk.shadowScroll : tk.shadow,
    transition: T(["top","width","max-width","height","border-radius","background","box-shadow","padding"]),
  };

  const toggleStyle: React.CSSProperties = {
    width:36, height:36, borderRadius:999, flexShrink:0,
    border:`1.5px solid ${tk.toggleBorder}`,
    background:tk.toggleBg, cursor:"pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    color:tk.toggleColor,
    boxShadow: isDark ? `0 0 14px ${tk.toggleColor}44` : "0 1px 4px rgba(0,0,0,0.06)",
    transition:"all .35s ease",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes rippleOut { from{transform:scale(0);opacity:.4} to{transform:scale(6);opacity:0} }
        @keyframes dotPulse  { 0%,100%{transform:scale(1);opacity:.85} 50%{transform:scale(2.1);opacity:1} }
        @keyframes drawerIn  { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; }
      `}</style>

      <div style={barStyle}>

        {/* shimmer top — pill */}
        {scrolled && !isMobile && (
          <div style={{
            position:"absolute", top:0, left:"8%", right:"8%", height:1.5,
            borderRadius:1, pointerEvents:"none",
            background:`linear-gradient(90deg,transparent,${activeColor}88,${tk.shimmerMid},${activeColor}88,transparent)`,
            backgroundSize:"200% 100%", animation:"shimmer 4s linear infinite",
          }}/>
        )}

        {/* bottom rule */}
        {(!scrolled || isMobile) && (
          <div style={{
            position:"absolute", bottom:0, left:0, right:0, height:1.5,
            pointerEvents:"none",
            background:`linear-gradient(90deg,transparent,${activeColor}70 50%,transparent)`,
            transition:"background .4s",
          }}/>
        )}

        {/* ═══ MOBILE ═══ */}
        {isMobile && (
          <>
            <span style={{
              fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:15,
              letterSpacing:".14em", color:tk.logoColor, textTransform:"uppercase",
              textShadow: isDark ? `0 0 20px ${activeColor}99` : "none",
              transition:"color .35s, text-shadow .35s",
            }}>
              {activeItem.rune}&nbsp;FOLIO
            </span>

            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <button style={toggleStyle} onClick={() => setIsDark(d => !d)} aria-label="Toggle theme">
                {isDark ? <SunIcon/> : <MoonIcon/>}
              </button>
              <button
                aria-label={menuOpen ? "Close" : "Menu"}
                onClick={() => setMenuOpen(o => !o)}
                style={{ background:"transparent", border:"none", cursor:"pointer",
                  padding:6, display:"flex", flexDirection:"column",
                  alignItems:"center", justifyContent:"center", gap:5.5,
                  width:40, height:40 }}
              >
                {[0,1,2].map(i => (
                  <span key={i} style={{
                    display:"block",
                    width: i===1 ? (menuOpen ? 13 : 22) : 22,
                    height:2.5, borderRadius:2,
                    background: tk.textActive,
                    boxShadow: isDark ? `0 0 8px ${activeColor}bb` : "none",
                    transformOrigin:"center",
                    transform:
                      menuOpen && i===0 ? "translateY(8px) rotate(45deg)" :
                      menuOpen && i===1 ? "scaleX(0)" :
                      menuOpen && i===2 ? "translateY(-8px) rotate(-45deg)" : "none",
                    transition:"transform .3s cubic-bezier(.22,.68,0,1.2), width .3s",
                    opacity: i===1 && !menuOpen ? .38 : 1,
                  }}/>
                ))}
              </button>
            </div>
          </>
        )}

        {/* ═══ DESKTOP ═══ */}
        {!isMobile && (
          <div ref={menuRef} style={{ position:"relative", display:"flex", alignItems:"center", gap:2 }}>

            {/* ink pill */}
            <div aria-hidden style={{
              position:"absolute", top:"50%", left:inkPos.left, width:inkPos.width, height:42,
              transform:"translateY(-50%)", borderRadius:999,
              background:tk.inkBg,
              border:`1.5px solid ${tk.inkBorder}`,
              boxShadow:tk.inkShadow,
              transition: T(["left","width"],".46s") + ", " + T(["background","border-color"],".3s","ease"),
              pointerEvents:"none", zIndex:0,
            }}/>

            {NAV_ITEMS.map(item => {
              const { id, label, rune } = item;
              const color    = getColor(item);
              const isActive = active === id;
              const isHov    = hovered === id;
              return (
                <a key={id} href={`#${id}`}
                  ref={el => { itemRefs.current[id] = el; }}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={e => handleNavClick(id, e)}
                  style={{
                    position:"relative", zIndex:1,
                    display:"flex", alignItems:"center", gap:6,
                    padding:"10px 18px", borderRadius:999,
                    textDecoration:"none", overflow:"hidden",
                    userSelect:"none", cursor:"pointer",
                    fontFamily:"'Inter',sans-serif",
                    fontSize:"clamp(13px,1.1vw,14.5px)",
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing:".01em",
                    whiteSpace:"nowrap",
                    color: isActive ? (isDark ? tk.textActive : color) : isHov ? tk.textHover : tk.textNormal,
                    textShadow: isActive && isDark ? `0 0 22px ${color}cc` : "none",
                    transition:"color .25s ease",
                  }}
                >
                  <span style={{
                    fontSize:9, lineHeight:1, fontFamily:"serif",
                    color: isActive ? color : "inherit",
                    opacity: isActive ? 1 : isHov ? .55 : isDark ? .32 : .30,
                    transition:"opacity .25s, color .25s",
                  }}>{rune}</span>

                  {label}

                  {isActive && (
                    <span style={{
                      width:5, height:5, borderRadius:"50%", flexShrink:0,
                      background:color, boxShadow:tk.dotShadow(color),
                      display:"inline-block",
                      animation:"dotPulse 2.8s ease-in-out infinite",
                    }}/>
                  )}

                  {ripples.map(rp => (
                    <span key={rp.id} style={{
                      position:"absolute", left:rp.x-14, top:rp.y-14,
                      width:28, height:28, borderRadius:"50%",
                      background:`${color}2a`, pointerEvents:"none",
                      animation:"rippleOut .7s ease forwards",
                    }}/>
                  ))}
                </a>
              );
            })}

            <div style={{
              width:1.5, height:26, margin:"0 8px",
              background: isDark ? "rgba(139,92,246,0.18)" : "rgba(30,100,60,0.18)",
              borderRadius:2, flexShrink:0,
            }}/>

            <button style={toggleStyle} onClick={() => setIsDark(d => !d)} aria-label="Toggle theme">
              {isDark ? <SunIcon/> : <MoonIcon/>}
            </button>
          </div>
        )}
      </div>

      {/* ═══ MOBILE DRAWER ═══ */}
      {isMobile && menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} style={{
            position:"fixed", inset:0, zIndex:8998,
            background:tk.backdropBg, backdropFilter:"blur(8px)",
            animation:"drawerIn .22s ease both",
          }}/>
          <div style={{
            position:"fixed", top:64, left:0, right:0, zIndex:8999,
            background:tk.drawerBg,
            borderBottom:`1.5px solid ${activeColor}22`,
            boxShadow: isDark
              ? "0 28px 64px rgba(0,0,0,.82), inset 0 1px 0 rgba(139,92,246,.07)"
              : "0 20px 56px rgba(20,60,35,.10), inset 0 1px 0 rgba(255,255,255,.95)",
            backdropFilter:"blur(32px) saturate(200%)",
            WebkitBackdropFilter:"blur(32px) saturate(200%)",
            padding:"8px 0 18px",
            animation:"drawerIn .28s cubic-bezier(.22,.68,0,1.2) both",
          }}>
            <div style={{
              position:"absolute", top:0, left:"6%", right:"6%", height:1.5,
              background:`linear-gradient(90deg,transparent,${activeColor}70,transparent)`,
              pointerEvents:"none",
            }}/>
            {NAV_ITEMS.map((item, i) => {
              const { id, label, rune } = item;
              const color    = getColor(item);
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`}
                  onClick={e => handleNavClick(id, e)}
                  style={{
                    display:"flex", alignItems:"center", gap:14,
                    padding:"15px 24px",
                    textDecoration:"none", userSelect:"none",
                    fontFamily:"'Inter',sans-serif",
                    fontSize:14, fontWeight: isActive ? 600 : 500,
                    color: isActive ? (isDark ? tk.textActive : color) : tk.textNormal,
                    textShadow: isActive && isDark ? `0 0 18px ${color}99` : "none",
                    borderLeft: isActive ? `3px solid ${color}` : "3px solid transparent",
                    background: isActive ? `linear-gradient(90deg,${color}0e,transparent)` : "transparent",
                    transition:"all .22s ease",
                    animation:`drawerIn .28s ${i * 0.04}s ease both`,
                  }}
                >
                  <span style={{
                    width:38, height:38, borderRadius:10, flexShrink:0,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:15, fontFamily:"serif",
                    background: isActive ? `${color}14` : isDark ? "rgba(139,92,246,0.05)" : "rgba(30,100,60,0.05)",
                    border:`1.5px solid ${isActive ? color+"44" : isDark ? "rgba(139,92,246,.12)" : "rgba(30,100,60,.12)"}`,
                    color: isActive ? color : tk.textNormal,
                    transition:"all .22s ease",
                  }}>{rune}</span>
                  <span style={{ flex:1 }}>{label}</span>
                  {isActive && (
                    <span style={{
                      width:7, height:7, borderRadius:"50%",
                      background:color, boxShadow:tk.dotShadow(color),
                      animation:"dotPulse 2.8s ease-in-out infinite", flexShrink:0,
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