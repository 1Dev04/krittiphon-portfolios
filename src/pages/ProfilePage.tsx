import React, { useEffect, useState, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════
   TYPED HOOK
══════════════════════════════════════════════════════════════════ */
const useTyped = (strings: string[], typeSpeed = 110, backSpeed = 70, pause = 1400) => {
  const [display, setDisplay] = useState("");
  const [cursor,  setCursor]  = useState(true);
  const idx   = useRef(0);
  const char  = useRef(0);
  const dir   = useRef<"type"|"back"|"wait">("type");
  const timer = useRef<ReturnType<typeof setTimeout>|null>(null);

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
        if (char.current === 0) { idx.current = (idx.current + 1) % strings.length; dir.current = "type"; }
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

/* ══════════════════════════════════════════════════════════════════
   SOCIAL ICONS
══════════════════════════════════════════════════════════════════ */
const GitHub    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const YouTube   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const Instagram = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const Facebook  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const LinkedIn  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Mail      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const Phone     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const MapPin    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const GradCap   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;
const Calendar  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
const socials = [
  { href: "https://github.com/1Dev04",                                     icon: <GitHub/>,    color: "#e2e8f0", label: "GitHub"    },
  { href: "https://www.youtube.com/@UR1MOSS",                              icon: <YouTube/>,   color: "#ff4444", label: "YouTube"   },
  { href: "https://www.instagram.com/1devmoz/",                            icon: <Instagram/>, color: "#e1306c", label: "Instagram" },
  { href: "https://www.facebook.com/krittiphon.yoonaitham.9",              icon: <Facebook/>,  color: "#1877f2", label: "Facebook"  },
  { href: "https://www.linkedin.com/in/krittiphon-yoonaitham-a291482b1/",  icon: <LinkedIn/>,  color: "#0a66c2", label: "LinkedIn"  },
];

const roles = ["Full Stack Developer", "Game Developer", "Web Developer", "Mobile Developer"];

const stats = [
  { label: "Languages",  value: "11+", rune: "ᚠ", color: "#a78bfa" },
  { label: "Frameworks", value: "14+", rune: "ᚢ", color: "#67e8f9" },
  { label: "Projects",   value: "20+", rune: "ᚦ", color: "#86efac" },
];

const education = [
  {
    degree:  "Bachelor of Science",
    field:   "Computer Science",
    school:  " Kasetsart University, Sriracha Campus",
    abbr:    "KUSRC",
    year:    "2022 – 2026",
    gpa:     "2.70",
    color:   "#a78bfa",
    rune:    "ᚠ",
  },
];

const contacts = [
  { icon: <Mail/>,    label: "Email",    value: "krittiphon.yoon@gmail.com",  color: "#a78bfa", href: "mailto:krittiphon.yoon@gmail.com" },
  { icon: <Phone/>,   label: "Phone",    value: "+66 92-853-7178",          color: "#67e8f9", href: "tel:+66928537178" },
  { icon: <MapPin/>,  label: "Location", value: "Phra Nakhon Si Ayutthaya, Thailand",         color: "#86efac", href: "https://share.google/0W4D18HLPjVDfT0ci" },
];

const CONTENT = {
  en: {
    sub:  "1DEV Codex",
    title:"Profile",
    body: `I am a passionate and dedicated Full Stack Developer with a strong background in game development, web development, and mobile development. With a keen eye for detail and a commitment to delivering high-quality solutions, I thrive in dynamic and collaborative environments. My expertise spans across various technologies, allowing me to create innovative and efficient applications that meet the needs of users. I am constantly seeking new challenges and opportunities to grow as a developer, and I am excited to contribute my skills and creativity to impactful projects.`,
  },
  th: {
    sub:  "บันทึกแห่งเวทมนตร์",
    title:"ประวัติโดยย่อ",
    body: `ผมเป็นนักพัฒนา Full Stack ที่มีความมุ่งมั่นและทุ่มเท มีพื้นฐานที่แข็งแกร่งในด้านการพัฒนาเกม การพัฒนาเว็บไซต์ และการพัฒนาแอปพลิเคชันบนมือถือ ด้วยความใส่ใจในรายละเอียดและความมุ่งมั่นในการส่งมอบโซลูชันคุณภาพสูง ผมจึงเติบโตได้ดีในสภาพแวดล้อมที่มีพลวัตและเน้นการทำงานร่วมกัน ความเชี่ยวชาญของผมครอบคลุมเทคโนโลยีที่หลากหลาย ทำให้ผมสามารถสร้างแอปพลิเคชันที่สร้างสรรค์และมีประสิทธิภาพซึ่งตอบสนองความต้องการของผู้ใช้ได้ ผมแสวงหาความท้าทายและโอกาสใหม่ๆ อย่างต่อเนื่องเพื่อพัฒนาตนเองในฐานะนักพัฒนา`,
  },
};

/* ══════════════════════════════════════════════════════════════════
   TINY COMPONENTS
══════════════════════════════════════════════════════════════════ */
const RuneRing = ({ size, runes, duration, color, reverse = false, opacity = 1 }: {
  size: number; runes: string; duration: number; color: string; reverse?: boolean; opacity?: number;
}) => (
  <div style={{
    position:"absolute", top:"50%", left:"50%",
    width:size, height:size, marginLeft:-size/2, marginTop:-size/2,
    borderRadius:"50%", border:`1px solid ${color}18`,
    animation:`${reverse?"rRev":"rSpin"} ${duration}s linear infinite`,
    pointerEvents:"none", opacity,
  }}>
    {runes.split("").map((r,i) => {
      const a = (i/runes.length)*360;
      return <span key={i} style={{ position:"absolute", top:"50%", left:"50%", fontSize:10, color:`${color}77`, fontFamily:"serif", lineHeight:1,
        transform:`rotate(${a}deg) translateY(-${size/2}px) rotate(-${a}deg)` }}>{r}</span>;
    })}
  </div>
);

function SocialBtn({ href, icon, color, label, delay }: { href:string; icon:React.ReactNode; color:string; label:string; delay:number }) {
  const [h, sh] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        display:"flex", alignItems:"center", justifyContent:"center",
        width:40, height:40, borderRadius:11,
        background: h ? `${color}22` : "rgba(255,255,255,.04)",
        border:`1px solid ${h ? color+"77" : "rgba(255,255,255,.08)"}`,
        color: h ? color : "rgba(255,255,255,.4)",
        textDecoration:"none", backdropFilter:"blur(12px)",
        boxShadow: h ? `0 0 18px ${color}44` : "none",
        transform: h ? "translateY(-4px) scale(1.1)" : "none",
        transition:"all .28s cubic-bezier(.22,.68,0,1.2)",
        animation:`fadeUp .6s ${delay}s ease both`,
      }}>{icon}</a>
  );
}

function StatCard({ label, value, rune, color, delay }: { label:string; value:string; rune:string; color:string; delay:number }) {
  const [h, sh] = useState(false);
  return (
    <div onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4,
      padding:"14px 8px", borderRadius:14,
      background: h ? `${color}14` : "rgba(255,255,255,.04)",
      border:`1px solid ${h ? color+"55" : color+"1e"}`,
      backdropFilter:"blur(10px)",
      boxShadow: h ? `0 0 20px ${color}33` : "none",
      transform: h ? "translateY(-3px) scale(1.03)" : "none",
      transition:"all .3s cubic-bezier(.22,.68,0,1.2)",
      animation:`fadeUp .7s ${delay}s ease both`, cursor:"default",
    }}>
      <span style={{ fontSize:14, color, fontFamily:"serif", opacity:.8 }}>{rune}</span>
      <span style={{ fontSize:"clamp(18px,2.5vw,24px)", fontWeight:900, color, fontFamily:"'Cinzel',serif",
        textShadow:`0 0 16px ${color}88`, lineHeight:1 }}>{value}</span>
      <span style={{ fontSize:9, color:"rgba(255,255,255,.38)", letterSpacing:".1em",
        textTransform:"uppercase", fontFamily:"'Space Mono',monospace" }}>{label}</span>
    </div>
  );
}

/* ── Education Card ── */
function EduCard({ item, delay }: { item: typeof education[0]; delay: number }) {
  const [h, sh] = useState(false);
  return (
    <div onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)} style={{
      position:"relative", borderRadius:16, overflow:"hidden",
      padding:"18px 20px 16px",
      background: h ? `linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.03))` : "rgba(255,255,255,.04)",
      border:`1px solid ${h ? item.color+"55" : item.color+"22"}`,
      backdropFilter:"blur(14px)",
      boxShadow: h ? `0 0 28px ${item.color}22, 0 8px 32px rgba(0,0,0,.4)` : "0 4px 20px rgba(0,0,0,.3)",
      transform: h ? "translateY(-3px)" : "none",
      transition:"all .32s cubic-bezier(.22,.68,0,1.2)",
      animation:`fadeUp .7s ${delay}s ease both`,
    }}>
      {/* top accent line */}
      <div style={{ position:"absolute", top:0, left:"10%", right:"10%", height:1.5,
        background:`linear-gradient(90deg,transparent,${item.color}aa,transparent)`,
        opacity: h ? 1 : .45, transition:"opacity .3s",
      }}/>

      <div style={{ display:"flex", alignItems:"flex-start", gap:10, flexWrap:"nowrap" }}>
        {/* rune badge */}
        <div style={{
          flexShrink:0, width:38, height:38, borderRadius:10,
          display:"flex", alignItems:"center", justifyContent:"center",
          background:`${item.color}18`, border:`1px solid ${item.color}44`,
          fontSize:18, fontFamily:"serif", color:item.color,
          boxShadow:`0 0 14px ${item.color}33`,
        }}>{item.rune}</div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
            <span style={{ fontSize:11, fontWeight:700, color:item.color,
              fontFamily:"'Space Mono',monospace", letterSpacing:".08em" }}>{item.abbr}</span>
            <span style={{ display:"flex", alignItems:"center", gap:4,
              fontSize:10, color:"rgba(255,255,255,.3)", fontFamily:"'Space Mono',monospace" }}>
              <Calendar/>{item.year}
            </span>
          </div>
          <p style={{ margin:"0 0 2px", fontSize:12, fontWeight:700, color:"#e2e8f0",
            fontFamily:"'Space Mono',monospace", letterSpacing:".04em" }}>{item.degree}</p>
          <p style={{ margin:"0 0 6px", fontSize:11, color:item.color,
            fontFamily:"'Space Mono',monospace", opacity:.8 }}>{item.field}</p>
          <p style={{ margin:0, fontSize:10, color:"rgba(255,255,255,.35)",
            fontFamily:"'Space Mono',monospace", lineHeight:1.5 }}>{item.school}</p>
        </div>

        {/* GPA badge */}
        <div style={{
          flexShrink:0, padding:"3px 8px", borderRadius:999,
          background:`${item.color}14`, border:`1px solid ${item.color}33`,
          fontSize:9, color:item.color, fontFamily:"'Space Mono',monospace",
          fontWeight:700, letterSpacing:".04em", whiteSpace:"nowrap",
          alignSelf:"flex-start",
        }}>GPA {item.gpa}</div>
      </div>
    </div>
  );
}

/* ── Contact Row ── */
function ContactRow({ item, delay }: { item: typeof contacts[0]; delay: number }) {
  const [h, sh] = useState(false);
  return (
    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => sh(true)} onMouseLeave={() => sh(false)}
      style={{
        display:"flex", alignItems:"center", gap:14,
        padding:"14px 18px", borderRadius:14, textDecoration:"none",
        background: h ? `${item.color}10` : "rgba(255,255,255,.03)",
        border:`1px solid ${h ? item.color+"44" : "rgba(255,255,255,.07)"}`,
        backdropFilter:"blur(12px)",
        transform: h ? "translateX(4px)" : "none",
        boxShadow: h ? `0 0 20px ${item.color}1e` : "none",
        transition:"all .28s cubic-bezier(.22,.68,0,1.2)",
        animation:`fadeUp .6s ${delay}s ease both`,
      }}>
      <div style={{
        width:34, height:34, borderRadius:10, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        background:`${item.color}18`, border:`1px solid ${item.color}33`,
        color:item.color,
      }}>{item.icon}</div>
      <div style={{ flex:1 }}>
        <p style={{ margin:0, fontSize:9, color:"rgba(255,255,255,.3)",
          fontFamily:"'Space Mono',monospace", letterSpacing:".15em", textTransform:"uppercase" }}>{item.label}</p>
        <p style={{ margin:0, fontSize:11, color: h ? item.color : "rgba(255,255,255,.65)",
          fontFamily:"'Space Mono',monospace", fontWeight:700, transition:"color .28s", marginTop:2 }}>{item.value}</p>
      </div>
      <span style={{ fontSize:14, color:`${item.color}55`, opacity: h ? 1 : 0, transition:"opacity .28s" }}>→</span>
    </a>
  );
}

/* ── Section Label ── */
const SectionLabel = ({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
    <div style={{ width:24, height:24, borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center",
      background:`${color}18`, border:`1px solid ${color}33`, color, flexShrink:0 }}>{icon}</div>
    <span style={{ fontSize:10, color, letterSpacing:".28em", textTransform:"uppercase",
      fontFamily:"'Space Mono',monospace", fontWeight:700 }}>{label}</span>
    <div style={{ flex:1, height:1, background:`linear-gradient(90deg,${color}44,transparent)` }}/>
  </div>
);

/* ══════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════ */
export default function ProfilePage() {
  const { display, cursor } = useTyped(roles);
  const [mounted,    setMounted]   = useState(false);
  const [mousePos,   setMousePos]  = useState({ x: 0.5, y: 0.5 });
  const [lang,       setLang]      = useState<"en"|"th">("en");
  const [switching,  setSwitching] = useState(false);
  const [visible,    setVisible]   = useState(false);
  const [isMobile,   setIsMobile]  = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold:.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const switchLang = (l: "en"|"th") => {
    if (l === lang) return;
    setSwitching(true);
    setTimeout(() => { setLang(l); setSwitching(false); }, 260);
  };

  const { sub, title, body } = CONTENT[lang];
  const px = mousePos.x * 100;
  const py = mousePos.y * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&family=Sarabun:wght@400;600&display=swap');
        @keyframes rSpin   { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes rRev    { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes orbF    { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-18px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes avatarGlow { 0%,100%{box-shadow:0 0 36px #a78bfa44} 50%{box-shadow:0 0 56px #a78bfa88} }
        @keyframes scan    { 0%{top:-2%} 100%{top:102%} }
        @keyframes langIn  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        @media (max-width: 767px) {
          .profile-edu-card { flex-wrap: wrap !important; }
          .profile-edu-gpa  { align-self: flex-start; margin-top: 4px; }
        }
      `}</style>

      <section id="profile" style={{
        minHeight:"100vh",
        background:"linear-gradient(180deg,#05050e 0%,#070714 100%)",
        position:"relative", overflow:"hidden",
        fontFamily:"'Space Mono',monospace",
        padding:"80px 0 60px",
      }}>
        {/* ── BG layers ── */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(167,139,250,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,.028) 1px,transparent 1px)`,
          backgroundSize:"64px 64px" }}/>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:`radial-gradient(ellipse 55% 45% at ${px}% ${py}%,rgba(124,58,237,.13) 0%,transparent 70%)`,
          transition:"background .12s" }}/>
        {/* orbs */}
        {[
          { w:500, h:500, t:"-15%", l:"-10%", bg:"rgba(124,58,237,.16)", d:"12s", dl:"0s" },
          { w:380, h:380, t:"auto", l:"auto", r:"-8%", b:"-10%", bg:"rgba(6,182,212,.11)", d:"16s", dl:"3s" },
          { w:240, h:240, t:"38%", l:"auto", r:"14%",  bg:"rgba(236,72,153,.09)", d:"10s", dl:"6s" },
        ].map((o,i) => (
          <div key={i} style={{ position:"absolute", width:o.w, height:o.h,
            top:o.t, left:o.l, right:(o as any).r, bottom:(o as any).b,
            borderRadius:"50%", filter:"blur(75px)",
            background:o.bg, animation:`orbF ${o.d} ease-in-out ${o.dl} infinite`,
            pointerEvents:"none" }}/>
        ))}
        {/* scanline */}
        <div style={{ position:"absolute", left:0, right:0, height:2,
          background:"linear-gradient(90deg,transparent,rgba(167,139,250,.18),transparent)",
          animation:"scan 11s linear infinite", pointerEvents:"none", zIndex:2 }}/>
        {/* particles */}
        {Array.from({length:18},(_,i) => (
          <div key={i} style={{ position:"absolute",
            left:`${(i*53.3)%100}%`, top:`${(i*37.7)%100}%`,
            width:(i%3)+1, height:(i%3)+1, borderRadius:"50%",
            background:["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"][i%5],
            boxShadow:`0 0 ${(i%3+1)*4}px ${["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"][i%5]}`,
            animation:`orbF ${5+i%6}s ease-in-out ${(i*.35)%5}s infinite`, pointerEvents:"none",
          }}/>
        ))}

        {/* ══════════════════════════════════════════════════════════
            CONTENT
        ══════════════════════════════════════════════════════════ */}
        <div ref={ref} style={{
          position:"relative", zIndex:3,
          maxWidth:1120, margin:"0 auto", padding:"0 clamp(20px,6%,80px)",
          opacity: mounted && visible ? 1 : 0,
          transform: visible ? "none" : "translateY(30px)",
          transition:"opacity .6s ease, transform .7s cubic-bezier(.22,.68,0,1.2)",
          display:"grid",
          gridTemplateColumns: isMobile ? "1fr" : "300px 1fr",
          gridTemplateRows:"auto",
          gap: isMobile ? "32px" : "clamp(24px,3vw,40px) clamp(28px,4vw,52px)",
        }}>

          {/* ════ COL-LEFT TOP: Avatar + Stats ════ */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24,
            animation:"fadeUp .8s ease .1s both",
            gridColumn: isMobile ? "1" : "1",
          }}>

            {/* ── Avatar ── */}
            <div style={{ position:"relative", width: isMobile ? 180 : 220, height: isMobile ? 180 : 220 }}>
              <RuneRing size={isMobile?178:218} runes="ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗ" duration={26} color="#a78bfa" />
              <RuneRing size={isMobile?148:184} runes="ᛚᛜᛞᛟᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ"     duration={19} color="#67e8f9" reverse />
              <RuneRing size={isMobile?118:150} runes="✦◈◇✿◉⬡✦◈◇✿◉⬡✦◈"         duration={33} color="#86efac" opacity={.6} />
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                width: isMobile ? 90 : 106, height: isMobile ? 90 : 106, borderRadius:"50%", overflow:"hidden",
                border:"2.5px solid rgba(167,139,250,.5)", animation:"avatarGlow 4s ease-in-out infinite",
              }}>
                <img src="https://res.cloudinary.com/dag73dhpl/image/upload/v1773118199/Generated_Image_March_10_2026_-_11_18AM_n2k9gn.png"
                  alt="Krittiphon" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
              </div>
              <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)",
                width:124, height:124, borderRadius:"50%",
                background:"radial-gradient(circle,rgba(124,58,237,.26) 0%,transparent 70%)",
                pointerEvents:"none" }}/>
            </div>

            {/* ── Name + role ── */}
            <div style={{ textAlign:"center", animation:"fadeUp .8s ease .25s both" }}>
              {/* PORTFOLIOS label above name */}
              <div style={{ marginBottom:6 }}>
                <span style={{
                  fontFamily:"'Cinzel',serif",
                  fontSize:"clamp(18px,4vw,26px)",
                  fontWeight:900,
                  letterSpacing:".12em",
                  background:"linear-gradient(135deg,#f1f5f9 0%,#a78bfa 30%,#67e8f9 65%,#f1f5f9 100%)",
                  backgroundSize:"200% 100%",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
                  animation:"shimmer 5s linear 1.5s infinite",
                  display:"block",
                }}>PORTFOLIOS</span>
                <div style={{ height:1, background:"linear-gradient(90deg,transparent,#a78bfa88,#67e8f944,transparent)", marginTop:4 }}/>
              </div>
              <h1 style={{
                fontFamily:"'Cinzel',serif", fontSize:"clamp(13px,3.5vw,18px)", fontWeight:700,
                color:"#e2e8f0", letterSpacing:".16em", textTransform:"uppercase",
                textShadow:"0 0 24px rgba(167,139,250,.4)", marginBottom:6,
              }}>Krittiphon Yoonaitham</h1>
              <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(167,139,250,.5),transparent)", marginBottom:10 }}/>
              <p style={{ fontSize:11, color:"rgba(255,255,255,.4)", letterSpacing:".06em" }}>
                I&apos;m a{" "}
                <span style={{ color:"#a78bfa", fontWeight:700, textShadow:"0 0 14px #a78bfa88" }}>
                  {display}
                  <span style={{ display:"inline-block", width:2, height:"0.85em",
                    background:"#a78bfa", marginLeft:2, verticalAlign:"middle",
                    opacity:cursor?1:0, transition:"opacity .1s", boxShadow:"0 0 6px #a78bfa" }}/>
                </span>
              </p>
              <p style={{ fontSize:9, color:"rgba(255,255,255,.18)", letterSpacing:".22em",
                textTransform:"uppercase", marginTop:8 }}>✦ Crafting Digital Realms ✦</p>
            </div>

            {/* ── Socials ── */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
              {socials.map(({href,icon,color,label},i) => (
                <SocialBtn key={label} href={href} icon={icon} color={color} label={label} delay={.5+i*.06}/>
              ))}
            </div>

            {/* ── Stats ── */}
            <div style={{ display:"flex", gap:8, width:"100%" }}>
              {stats.map((s,i) => <StatCard key={s.label} {...s} delay={.6+i*.1}/>)}
            </div>
          </div>

          {/* ════ COL-RIGHT TOP: About text ════ */}
          <div style={{ display:"flex", flexDirection:"column", gap:18,
            animation:"fadeUp .8s ease .2s both",
            width:"100%",
          }}>

            {/* eyebrow */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ height:1, width:32, background:"linear-gradient(90deg,#a78bfa,transparent)" }}/>
              <span style={{ fontSize:10, color:"#a78bfa", letterSpacing:".3em", textTransform:"uppercase",
                fontFamily:"'Space Mono',monospace", opacity: switching ? 0 : 1, transition:"opacity .26s" }}>{sub}</span>
              <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#a78bfa22,transparent)" }}/>
            </div>

            {/* title */}
            <h2 style={{
              fontFamily:"'Cinzel',serif", fontSize: isMobile ? "clamp(22px,7vw,32px)" : "clamp(24px,3.5vw,40px)", fontWeight:900,
              background:"linear-gradient(135deg,#f1f5f9 0%,#a78bfa 35%,#67e8f9 70%,#f1f5f9 100%)",
              backgroundSize:"200% 100%",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              animation:"shimmer 5s linear 1s infinite",
              letterSpacing:".04em", lineHeight:1.1,
              opacity: switching ? 0 : 1, transition:"opacity .26s",
            }}>{title}</h2>

            {/* divider */}
            <div style={{ height:1, background:"linear-gradient(90deg,#a78bfa55,#67e8f922,transparent)" }}/>

            {/* body */}
            <div style={{ opacity: switching ? 0 : 1, transform: switching ? "translateY(5px)" : "none",
              transition:"opacity .26s, transform .26s",
              animation: switching ? "none" : "langIn .3s ease",
            }}>
              <p style={{
                fontSize: isMobile ? 11 : 12, lineHeight:1.9, color:"rgba(255,255,255,.52)",
                fontFamily: lang==="th" ? "'Sarabun',sans-serif" : "'Space Mono',monospace",
                letterSpacing: lang==="th" ? ".02em" : ".01em",
              }}>{body}</p>
            </div>

            {/* lang toggle */}
            <div style={{ display:"inline-flex", padding:4, borderRadius:999,
              background:"rgba(255,255,255,.04)", border:"1px solid rgba(167,139,250,.2)",
              backdropFilter:"blur(12px)", width:"fit-content" }}>
              {(["th","en"] as const).map(l => (
                <button key={l} onClick={() => switchLang(l)} style={{
                  padding:"5px 20px", borderRadius:999, cursor:"pointer",
                  fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, letterSpacing:".1em",
                  background: lang===l ? "linear-gradient(135deg,rgba(167,139,250,.32),rgba(103,232,249,.18))" : "transparent",
                  color: lang===l ? "#a78bfa" : "rgba(255,255,255,.28)",
                  border: lang===l ? "1px solid rgba(167,139,250,.4)" : "1px solid transparent",
                  boxShadow: lang===l ? "0 0 14px rgba(167,139,250,.25),inset 0 1px 0 rgba(255,255,255,.1)" : "none",
                  transition:"all .3s cubic-bezier(.22,.68,0,1.2)",
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>

          {/* ════ COL-LEFT BOTTOM: Contact ════ */}
          <div style={{ animation:"fadeUp .8s ease .35s both", width:"100%" }}>
            <SectionLabel icon={<Phone/>} label="Contact" color="#67e8f9"/>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {contacts.map((c,i) => <ContactRow key={c.label} item={c} delay={.5+i*.08}/>)}
            </div>
          </div>

          {/* ════ COL-RIGHT BOTTOM: Education ════ */}
          <div style={{ animation:"fadeUp .8s ease .3s both", width:"100%" }}>
            <SectionLabel icon={<GradCap/>} label="Education" color="#a78bfa"/>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {education.map((e,i) => <EduCard key={e.abbr} item={e} delay={.45+i*.1}/>)}
            </div>
          </div>

        </div>

        {/* bottom fade */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:70,
          background:"linear-gradient(transparent,#05050e)", pointerEvents:"none" }}/>
      </section>
    </>
  );
}