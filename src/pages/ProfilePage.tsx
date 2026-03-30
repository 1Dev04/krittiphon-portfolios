import React, { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "../components/themeContext";

/* ══════════════════════════════════════════════════════════════════
   TYPED HOOK
══════════════════════════════════════════════════════════════════ */
const useTyped = (strings: string[], typeSpeed = 100, backSpeed = 60, pause = 1600) => {
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
    timer.current = setTimeout(tick, 800);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(t);
  }, []);
  return { display, cursor };
};

/* ══════════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════════ */
const GitHub    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const YouTube   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>;
const Instagram = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>;
const Facebook  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const LinkedIn  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const Mail      = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const PhoneIco  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const MapPin    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const GradCap   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="15" height="15"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>;

/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
const ROLES = ["Full Stack Developer", "Game Developer", "Web Developer", "Mobile Developer"];

const SOCIALS = [
  { href:"https://github.com/1Dev04",                                    Icon:GitHub,    color:"#c9d1d9", label:"GitHub"    },
  { href:"https://www.youtube.com/@UR1MOSS",                             Icon:YouTube,   color:"#ff4444", label:"YouTube"   },
  { href:"https://www.instagram.com/1devmoz/",                           Icon:Instagram, color:"#e1306c", label:"Instagram" },
  { href:"https://www.facebook.com/krittiphon.yoonaitham.9",             Icon:Facebook,  color:"#1877f2", label:"Facebook"  },
  { href:"https://www.linkedin.com/in/krittiphon-yoonaitham-a291482b1/", Icon:LinkedIn,  color:"#0a66c2", label:"LinkedIn"  },
];

const STATS = [
  { label:"Languages",  value:"11+", moonAccent:"#a78bfa", sunAccent:"#2d6a4f" },
  { label:"Frameworks", value:"14+", moonAccent:"#67e8f9", sunAccent:"#40916c" },
  { label:"Projects",   value:"20+", moonAccent:"#86efac", sunAccent:"#1b7a4a" },
];

const CONTACTS = [
  { Icon:Mail,    label:"Email",    value:"krittiphon.yoon@gmail.com",          moonAccent:"#a78bfa", sunAccent:"#2d6a4f", href:"mailto:krittiphon.yoon@gmail.com" },
  { Icon:PhoneIco,label:"Phone",    value:"+66 92-853-7178",                    moonAccent:"#67e8f9", sunAccent:"#40916c", href:"tel:+66928537178" },
  { Icon:MapPin,  label:"Location", value:"Phra Nakhon Si Ayutthaya, Thailand", moonAccent:"#86efac", sunAccent:"#1b7a4a", href:"https://share.google/0W4D18HLPjVDfT0ci" },
];

const EDU = {
  degree:"Bachelor of Science", field:"Computer Science",
  school:"Kasetsart University, Sriracha Campus", abbr:"KU · SRIRACHA",
  year:"2022 – 2026",
};

const CONTENT = {
  en:{
    eyebrow:"Portfolio · 2026",
    title:"Profile",
    body:"I am a Full Stack Developer with experience building game, web, mobile, and enterprise-level systems. I have worked on an SMS Marketing platform, contributing across backend, frontend, API development, and DevOps workflows. I have hands-on experience designing production-ready systems, including scalable APIs, database management, and CI/CD pipelines for continuous deployment. I have also developed AI-integrated projects, such as an eCommerce platform with smart sizing and image processing features. As a recent graduate, I am eager to apply my skills, continue learning, and contribute to building impactful, production-grade systems.",
  },
  th:{
    eyebrow:"พอร์ตโฟลิโอ · 2026",
    title:"ประวัติโดยย่อ",
    body:"ผมเป็นนักพัฒนา Full Stack ที่มีประสบการณ์ในการสร้างเกม เว็บ โมบายล์ และระบบระดับองค์กร ผมเคยทำงานในแพลตฟอร์มการตลาด SMS โดยมีส่วนร่วมในด้าน Backend, Frontend, การพัฒนา API และเวิร์กโฟลว์ DevOps ผมมีประสบการณ์ตรงในการออกแบบระบบที่พร้อมใช้งานจริง รวมถึง API ที่ปรับขนาดได้ การจัดการฐานข้อมูล และไปป์ไลน์ CI/CD สำหรับการใช้งานอย่างต่อเนื่อง ผมยังเคยพัฒนาโครงการที่ผสานรวม AI เช่น แพลตฟอร์มอีคอมเมิร์ซที่มีฟีเจอร์การปรับขนาดอัจฉริยะและการประมวลผลภาพ ในฐานะบัณฑิตจบใหม่ ผมกระตือรือร้นที่จะใช้ทักษะของตนเอง เรียนรู้เพิ่มเติม และมีส่วนร่วมในการสร้างระบบที่มีประสิทธิภาพและใช้งานได้จริง",
  },
};

/* ══════════════════════════════════════════════════════════════════
   THEME PALETTES for ProfilePage
══════════════════════════════════════════════════════════════════ */
const T = {
  sun: {
    pageBg:        "#f5f7f4",
    sectionBg:     "linear-gradient(160deg,#eef4ee 0%,#f5f7f4 50%,#e8f0e8 100%)",
    gridLine:      "rgba(45,106,79,0.055)",
    radial:        "rgba(45,106,79,0.10)",
    orbA:          "rgba(45,106,79,0.13)",
    orbB:          "rgba(82,183,136,0.09)",
    orbC:          "rgba(27,67,50,0.08)",
    scanLine:      "rgba(45,106,79,0.10)",
    particleSet:   ["#2d6a4f","#40916c","#74c69d","#1b4332","#52b788"],
    // left panel
    panelBg:       "linear-gradient(170deg,#e8f2ec 0%,#deeee5 100%)",
    panelBorder:   "rgba(45,106,79,0.18)",
    imgOverlay:    "linear-gradient(to top,rgba(30,70,40,0.55) 0%,transparent 50%)",
    nameShadow:    "0 2px 24px rgba(27,67,50,0.18)",
    // right panel
    cardBg:        "rgba(255,255,255,0.82)",
    cardBorder:    "rgba(45,106,79,0.14)",
    cardShadow:    "0 2px 16px rgba(27,67,50,0.07)",
    cardHoverBg:   "rgba(255,255,255,0.96)",
    cardHoverBorder:(c:string)=>`${c}44`,
    cardHoverShadow:(c:string)=>`0 4px 28px ${c}22`,
    // text
    headGrad:      "linear-gradient(120deg,#1a3d28 0%,#2d6a4f 50%,#40916c 100%)",
    eyebrowColor:  "#2d6a4f",
    bodyText:      "rgba(25,55,35,0.68)",
    dimText:       "rgba(25,55,35,0.38)",
    labelText:     "rgba(25,55,35,0.48)",
    accent:        "#2d6a4f",
    accentB:       "#40916c",
    accentC:       "#1b4332",
    divider:       "rgba(45,106,79,0.20)",
    divider2:      "rgba(82,183,136,0.12)",
    // lang toggle
    toggleBg:      "rgba(255,255,255,0.65)",
    toggleBorder:  "rgba(45,106,79,0.18)",
    activeLangBg:  "rgba(45,106,79,0.12)",
    activeLangBorder:"rgba(45,106,79,0.35)",
    activeLangText:"#1b4332",
    inactiveLangText:"rgba(25,55,35,0.32)",
    // social
    socialBg:      "rgba(255,255,255,0.55)",
    socialBorder:  "rgba(45,106,79,0.14)",
    socialColor:   "rgba(25,55,35,0.38)",
    // stat
    statBg:        "rgba(255,255,255,0.65)",
    statBorder:    (c:string)=>`${c}28`,
    statLabelColor:"rgba(25,55,35,0.42)",
    // section label
    sectionIcon:   (c:string)=>`${c}18`,
    sectionBorder: (c:string)=>`${c}30`,
    // bottom fade
    bottomFade:    "linear-gradient(transparent,#e8f0e8)",
  },
  moon: {
    pageBg:        "#05050e",
    sectionBg:     "linear-gradient(160deg,#05050e 0%,#070714 50%,#060410 100%)",
    gridLine:      "rgba(167,139,250,0.030)",
    radial:        "rgba(124,58,237,0.13)",
    orbA:          "rgba(124,58,237,0.16)",
    orbB:          "rgba(6,182,212,0.11)",
    orbC:          "rgba(236,72,153,0.09)",
    scanLine:      "rgba(167,139,250,0.14)",
    particleSet:   ["#a78bfa","#67e8f9","#86efac","#fda4af","#fcd34d"],
    panelBg:       "linear-gradient(170deg,#0d0b1e 0%,#0a0818 100%)",
    panelBorder:   "rgba(139,92,246,0.20)",
    imgOverlay:    "linear-gradient(to top,rgba(5,4,20,0.72) 0%,transparent 45%)",
    nameShadow:    "0 2px 30px rgba(139,92,246,0.35)",
    cardBg:        "rgba(255,255,255,0.04)",
    cardBorder:    "rgba(139,92,246,0.14)",
    cardShadow:    "0 2px 16px rgba(0,0,0,0.30)",
    cardHoverBg:   "rgba(255,255,255,0.07)",
    cardHoverBorder:(c:string)=>`${c}55`,
    cardHoverShadow:(c:string)=>`0 4px 28px ${c}28`,
    headGrad:      "linear-gradient(120deg,#f1f5f9 0%,#a78bfa 45%,#67e8f9 100%)",
    eyebrowColor:  "#a78bfa",
    bodyText:      "rgba(220,210,255,0.62)",
    dimText:       "rgba(200,185,255,0.32)",
    labelText:     "rgba(200,185,255,0.48)",
    accent:        "#a78bfa",
    accentB:       "#67e8f9",
    accentC:       "#86efac",
    divider:       "rgba(139,92,246,0.30)",
    divider2:      "rgba(103,232,249,0.12)",
    toggleBg:      "rgba(255,255,255,0.04)",
    toggleBorder:  "rgba(139,92,246,0.18)",
    activeLangBg:  "rgba(139,92,246,0.18)",
    activeLangBorder:"rgba(139,92,246,0.40)",
    activeLangText:"#c4b5fd",
    inactiveLangText:"rgba(196,181,253,0.32)",
    socialBg:      "rgba(255,255,255,0.04)",
    socialBorder:  "rgba(255,255,255,0.08)",
    socialColor:   "rgba(255,255,255,0.35)",
    statBg:        "rgba(255,255,255,0.04)",
    statBorder:    (c:string)=>`${c}28`,
    statLabelColor:"rgba(200,185,255,0.42)",
    sectionIcon:   (c:string)=>`${c}18`,
    sectionBorder: (c:string)=>`${c}30`,
    bottomFade:    "linear-gradient(transparent,#05050e)",
  },
} as const;

/* ── Particles (memoised positions) ── */
const PARTICLES = Array.from({length:22},(_,i)=>({
  left:`${(i*47.3+11)%100}%`, top:`${(i*31.7+7)%100}%`,
  size:(i%3)+1, dur:`${4+i%5}s`, delay:`${(i*.28)%4}s`, ci:i%5,
}));

/* ══════════════════════════════════════════════════════════════════
   SMALL SUB-COMPONENTS
══════════════════════════════════════════════════════════════════ */
function SocialBtn({href,Icon,color,label,delay,tk}:{
  href:string; Icon:()=>React.ReactElement; color:string; label:string; delay:number;
  tk:typeof T.sun|typeof T.moon;
}) {
  const [h,sh]=useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{
        width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
        background:h?`${color}20`:tk.socialBg,
        border:`1px solid ${h?color+"66":tk.socialBorder}`,
        color:h?color:tk.socialColor,
        textDecoration:"none",backdropFilter:"blur(10px)",
        boxShadow:h?`0 0 16px ${color}44`:"none",
        transform:h?"translateY(-3px) scale(1.08)":"none",
        transition:"all .26s cubic-bezier(.22,.68,0,1.2)",
        animation:`fuFadeUp .5s ${delay}s ease both`,
      }}><Icon/></a>
  );
}

function StatPill({label,value,accent,tk,delay}:{
  label:string; value:string; accent:string;
  tk:typeof T.sun|typeof T.moon; delay:number;
}) {
  const [h,sh]=useState(false);
  return (
    <div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)} style={{
      flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,
      padding:"12px 6px",borderRadius:12,cursor:"default",
      background:h?`${accent}14`:tk.statBg,
      border:`1px solid ${h?accent+"44":tk.statBorder(accent)}`,
      backdropFilter:"blur(8px)",
      boxShadow:h?`0 0 18px ${accent}22`:tk.cardShadow,
      transform:h?"translateY(-2px)":"none",
      transition:"all .28s cubic-bezier(.22,.68,0,1.2)",
      animation:`fuFadeUp .6s ${delay}s ease both`,
    }}>
      <span style={{fontSize:"clamp(17px,2.2vw,22px)",fontWeight:900,color:accent,
        fontFamily:"'Cinzel',serif",lineHeight:1,textShadow:`0 0 14px ${accent}88`}}>{value}</span>
      <span style={{fontSize:9,color:tk.statLabelColor,letterSpacing:".12em",
        textTransform:"uppercase",fontFamily:"'Inter',sans-serif"}}>{label}</span>
    </div>
  );
}

function ContactCard({Icon,label,value,accent,href,tk,delay}:{
  Icon:()=>React.ReactElement; label:string; value:string; accent:string;
  href:string; tk:typeof T.sun|typeof T.moon; delay:number;
}) {
  const [h,sh]=useState(false);
  return (
    <a href={href} target={href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
      onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)}
      style={{
        display:"flex",alignItems:"center",gap:12,
        padding:"12px 16px",borderRadius:12,textDecoration:"none",
        background:h?tk.cardHoverBg:tk.cardBg,
        border:`1px solid ${h?tk.cardHoverBorder(accent):tk.cardBorder}`,
        backdropFilter:"blur(12px)",
        boxShadow:h?tk.cardHoverShadow(accent):tk.cardShadow,
        transform:h?"translateX(3px)":"none",
        transition:"all .26s cubic-bezier(.22,.68,0,1.2)",
        animation:`fuFadeUp .5s ${delay}s ease both`,
      }}>
      <div style={{
        width:32,height:32,borderRadius:9,flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"center",
        background:`${accent}18`,border:`1px solid ${accent}33`,color:accent,
      }}><Icon/></div>
      <div style={{flex:1,minWidth:0}}>
        <p style={{margin:0,fontSize:9,color:tk.labelText,fontFamily:"'Inter',sans-serif",
          letterSpacing:".14em",textTransform:"uppercase"}}>{label}</p>
        <p style={{margin:"2px 0 0",fontSize:11,color:h?accent:tk.bodyText,
          fontFamily:"'Inter',monospace",fontWeight:600,
          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
          transition:"color .24s"}}>{value}</p>
      </div>
      <span style={{fontSize:12,color:`${accent}55`,opacity:h?1:0,transition:"opacity .24s",flexShrink:0}}>→</span>
    </a>
  );
}

function EduCard({tk,accent}:{tk:typeof T.sun|typeof T.moon;accent:string}) {
  const [h,sh]=useState(false);
  return (
    <div onMouseEnter={()=>sh(true)} onMouseLeave={()=>sh(false)} style={{
      position:"relative",borderRadius:14,overflow:"hidden",
      padding:"16px 18px",
      background:h?tk.cardHoverBg:tk.cardBg,
      border:`1px solid ${h?tk.cardHoverBorder(accent):tk.cardBorder}`,
      backdropFilter:"blur(14px)",
      boxShadow:h?tk.cardHoverShadow(accent):tk.cardShadow,
      transform:h?"translateY(-2px)":"none",
      transition:"all .28s cubic-bezier(.22,.68,0,1.2)",
      animation:"fuFadeUp .6s .4s ease both",
    }}>
      <div style={{position:"absolute",top:0,left:"8%",right:"8%",height:1.5,
        background:`linear-gradient(90deg,transparent,${accent}88,transparent)`,
        opacity:h?1:.35,transition:"opacity .28s"}}/>
      <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
        <div style={{
          flexShrink:0,width:40,height:40,borderRadius:10,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:`${accent}18`,border:`1px solid ${accent}40`,
          color:accent,boxShadow:`0 0 12px ${accent}30`,
        }}><GradCap/></div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3,flexWrap:"wrap"}}>
            <span style={{fontSize:10,fontWeight:700,color:accent,fontFamily:"'Inter',sans-serif",letterSpacing:".06em"}}>{EDU.abbr}</span>
            <span style={{fontSize:9,color:tk.dimText,fontFamily:"'Inter',monospace"}}>{EDU.year}</span>
          </div>
          <p style={{margin:"0 0 2px",fontSize:12,fontWeight:700,color:tk.accent,fontFamily:"'Inter',sans-serif"}}>{EDU.degree}</p>
          <p style={{margin:"0 0 4px",fontSize:11,color:accent,fontFamily:"'Inter',sans-serif",opacity:.85}}>{EDU.field}</p>
          <p style={{margin:0,fontSize:10,color:tk.dimText,fontFamily:"'Inter',sans-serif",lineHeight:1.6}}>{EDU.school}</p>
        </div>
        
      </div>
    </div>
  );
}

function SectionLabel({Icon,label,color,tk}:{Icon:()=>React.ReactElement;label:string;color:string;tk:typeof T.sun|typeof T.moon}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
      <div style={{
        width:22,height:22,borderRadius:6,flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"center",
        background:tk.sectionIcon(color),border:`1px solid ${tk.sectionBorder(color)}`,color,
      }}><Icon/></div>
      <span style={{fontSize:9,color,letterSpacing:".24em",textTransform:"uppercase",
        fontFamily:"'Inter',sans-serif",fontWeight:700}}>{label}</span>
      <div style={{flex:1,height:1,background:`linear-gradient(90deg,${color}44,transparent)`}}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
export default function ProfilePage() {
  const { isDark } = useTheme();
  const tk = isDark ? T.moon : T.sun;

  const { display, cursor } = useTyped(ROLES);
  const [mounted,  setMounted]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [mouse,    setMouse]    = useState({x:0.5,y:0.5});
  const [lang,     setLang]     = useState<"en"|"th">("en");
  const [switching,setSwitching]= useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // mouse parallax
  const onMouseMove = useCallback((e:MouseEvent)=>{
    setMouse({x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight});
  },[]);

  useEffect(()=>{
    setMounted(true);
    const check=()=>setIsMobile(window.innerWidth<768);
    check(); window.addEventListener("resize",check);
    window.addEventListener("mousemove",onMouseMove);
    return ()=>{ window.removeEventListener("resize",check); window.removeEventListener("mousemove",onMouseMove); };
  },[onMouseMove]);

  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{threshold:.05});
    if(contentRef.current) obs.observe(contentRef.current);
    return ()=>obs.disconnect();
  },[]);

  const switchLang=(l:"en"|"th")=>{
    if(l===lang) return;
    setSwitching(true);
    setTimeout(()=>{ setLang(l); setSwitching(false); },240);
  };

  const { eyebrow, title, body } = CONTENT[lang];

  // parallax offset — gentle
  const px = (mouse.x-0.5)*18;
  const py = (mouse.y-0.5)*12;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;500;600;700&family=Sarabun:wght@400;500;600&display=swap');
        @keyframes fuFadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fuOrb     { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-14px) scale(1.04)} }
        @keyframes fuScan    { 0%{top:-1%} 100%{top:101%} }
        @keyframes fuShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fuDrift   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes fuPulse   { 0%,100%{opacity:.75;transform:scale(1)} 50%{opacity:1;transform:scale(1.9)} }
        @keyframes fuGlow    { 0%,100%{opacity:.6} 50%{opacity:1} }
        * { box-sizing:border-box; }
      `}</style>

      <section ref={sectionRef} id="profile" style={{
        minHeight:"100vh",
        background:tk.sectionBg,
        position:"relative",overflow:"hidden",
        padding:isMobile?"80px 0 100px":"72px 0 100px",
        transition:"background .5s ease",
      }}>

        {/* ── grid ── */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:`linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize:"60px 60px",transition:"background-image .5s"}}/>

        {/* ── radial mouse glow ── */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",
          background:`radial-gradient(ellipse 52% 44% at ${mouse.x*100}% ${mouse.y*100}%,${tk.radial} 0%,transparent 68%)`,
          transition:"background .08s"}}/>

        {/* ── orbs ── */}
        {([
          {w:480,h:480,t:"-12%",l:"-8%",c:tk.orbA,d:"13s",dl:"0s"},
          {w:360,h:360,t:"auto",l:"auto",r:"-6%",b:"-8%",c:tk.orbB,d:"17s",dl:"2.5s"},
          {w:220,h:220,t:"40%", l:"auto",r:"12%", c:tk.orbC,d:"11s",dl:"5s"},
        ] as any[]).map((o,i)=>(
          <div key={i} style={{
            position:"absolute",width:o.w,height:o.h,
            top:o.t,left:o.l,right:o.r,bottom:o.b,
            borderRadius:"50%",filter:"blur(70px)",background:o.c,
            animation:`fuOrb ${o.d} ease-in-out ${o.dl} infinite`,
            pointerEvents:"none",transition:"background .5s",
          }}/>
        ))}

        {/* ── scan line ── */}
        <div style={{
          position:"absolute",left:0,right:0,height:1.5,
          background:`linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
          animation:"fuScan 12s linear infinite",pointerEvents:"none",zIndex:2,
        }}/>

        {/* ── particles ── */}
        {PARTICLES.map((p,i)=>(
          <div key={i} style={{
            position:"absolute",left:p.left,top:p.top,
            width:p.size,height:p.size,borderRadius:"50%",
            background:tk.particleSet[p.ci],
            boxShadow:`0 0 ${p.size*4}px ${tk.particleSet[p.ci]}`,
            animation:`fuDrift ${p.dur} ease-in-out ${p.delay} infinite`,
            pointerEvents:"none",opacity:isDark?.9:.45,
            transition:"opacity .5s",
          }}/>
        ))}

        {/* ══════════════ CONTENT GRID ══════════════ */}
        <div ref={contentRef} style={{
          position:"relative",zIndex:3,
          maxWidth:1180,margin:"0 auto",
          padding:"0 clamp(16px,5%,64px)",
          display:"grid",
          gridTemplateColumns:isMobile?"1fr":"1fr 1fr",
          gap:isMobile?"0":"0",
          minHeight:"calc(100vh - 172px)",
          opacity:mounted&&visible?1:0,
          transition:"opacity .7s ease",
        }}>

          {/* ════════════════════════════════
              LEFT — Full-height image panel
          ════════════════════════════════ */}
          <div style={{
            position:"relative",
            borderRadius:isMobile?"20px 20px 0 0":"20px 0 0 20px",
            overflow:"hidden",
            minHeight:isMobile?340:480,
            background:tk.panelBg,
            border:`1px solid ${tk.panelBorder}`,
            borderRight:isMobile?undefined:"none",
            animation:"fuFadeUp .8s .05s ease both",
            // parallax shift on the panel
            transform:`translate(${px*0.4}px,${py*0.3}px)`,
            transition:"transform .12s ease-out, background .5s, border-color .5s",
          }}>
            {/* full-bleed image */}
            <img
              src="https://res.cloudinary.com/dag73dhpl/image/upload/v1773118199/Generated_Image_March_10_2026_-_11_18AM_n2k9gn.png"
              alt="Krittiphon Yoonaitham"
              style={{
                position:"absolute",inset:0,width:"100%",height:"100%",
                objectFit:"cover",objectPosition:"center top",
                animation:"fuGlow 6s ease-in-out infinite",
              }}
            />

            {/* gradient overlay — bottom name area */}
            <div style={{
              position:"absolute",inset:0,
              background:tk.imgOverlay,
              transition:"background .5s",
            }}/>

            {/* accent corner lines */}
            <div style={{position:"absolute",top:16,left:16,width:32,height:32,
              borderTop:`2px solid ${tk.accent}`,borderLeft:`2px solid ${tk.accent}`,
              borderRadius:"4px 0 0 0",opacity:.6}}/>
            <div style={{position:"absolute",bottom:16,right:16,width:32,height:32,
              borderBottom:`2px solid ${tk.accentB}`,borderRight:`2px solid ${tk.accentB}`,
              borderRadius:"0 0 4px 0",opacity:.6}}/>

            {/* name overlay at bottom — always dark so text is readable on any photo */}
            <div style={{
              position:"absolute",bottom:0,left:0,right:0,
              padding:"56px 22px 22px",
              background:"linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.72) 40%,rgba(0,0,0,0.28) 70%,transparent 100%)",
            }}>
              {/* PORTFOLIOS label */}
              <span style={{
                display:"block",marginBottom:5,
                fontFamily:"'Cinzel',serif",
                fontSize:"clamp(10px,1.6vw,13px)",
                fontWeight:700,letterSpacing:".24em",
                color: isDark ? "#67e8f9" : "#74c69d",
                textShadow:"0 1px 8px rgba(0,0,0,0.8)",
              }}>PORTFOLIOS</span>

              <h1 style={{
                fontFamily:"'Cinzel',serif",
                fontSize:"clamp(15px,2vw,19px)",
                fontWeight:900,
                color:"#ffffff",
                letterSpacing:".10em",textTransform:"uppercase",
                textShadow:"0 2px 12px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,1)",
                margin:"0 0 5px",
              }}>Krittiphon Yoonaitham</h1>

              {/* typed role */}
              <p style={{
                margin:"0 0 14px",fontSize:"clamp(10px,1.2vw,12px)",
                color:"rgba(255,255,255,0.90)",letterSpacing:".04em",
                fontFamily:"'Inter',monospace",
                textShadow:"0 1px 6px rgba(0,0,0,0.8)",
              }}>
                <span style={{color:isDark?"#c4b5fd":"#86efac",fontWeight:600}}>
                  {display}
                  <span style={{
                    display:"inline-block",width:1.5,height:"0.9em",
                    background:isDark?"#c4b5fd":"#86efac",
                    marginLeft:2,verticalAlign:"middle",
                    opacity:cursor?1:0,transition:"opacity .1s",
                  }}/>
                </span>
              </p>

              {/* socials */}
              <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
                {SOCIALS.map(({href,Icon,color,label},i)=>(
                  <SocialBtn key={label} href={href} Icon={Icon} color={color} label={label}
                    delay={.3+i*.05} tk={tk}/>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════
              RIGHT — Content panel
          ════════════════════════════════ */}
          <div style={{
            borderRadius:isMobile?"0 0 20px 20px":"0 20px 20px 0",
            overflow:"hidden",
            background:isDark?"rgba(8,6,24,0.82)":"rgba(255,255,255,0.78)",
            border:`1px solid ${tk.panelBorder}`,
            borderLeft:isMobile?undefined:"none",
            backdropFilter:"blur(20px) saturate(160%)",
            WebkitBackdropFilter:"blur(20px) saturate(160%)",
            padding:isMobile?"28px 22px 24px":"36px 36px 32px",
            display:"flex",flexDirection:"column",gap:20,
            animation:"fuFadeUp .8s .15s ease both",
            transform:`translate(${px*-0.25}px,${py*-0.18}px)`,
            transition:"transform .12s ease-out, background .5s, border-color .5s",
          }}>

            {/* ── eyebrow ── */}
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{height:1,width:24,background:`linear-gradient(90deg,${tk.accent},transparent)`}}/>
              <span style={{
                fontSize:9,color:tk.eyebrowColor,letterSpacing:".28em",
                textTransform:"uppercase",fontFamily:"'Inter',sans-serif",fontWeight:600,
                opacity:switching?0:1,transition:"opacity .22s, color .5s",
              }}>{eyebrow}</span>
              <div style={{flex:1,height:1,background:`linear-gradient(90deg,${tk.accent}22,transparent)`}}/>
            </div>

            {/* ── heading ── */}
            <h2 style={{
              margin:0,
             fontFamily: isDark ? "'Cinzel', serif" : "'Lora', serif",
              fontSize:isMobile?"clamp(26px,8vw,36px)":"clamp(28px,3.8vw,44px)",
              fontWeight:900,lineHeight:1.05,letterSpacing:".03em",
              color: isDark ? "#e9d5ff" : "#1a3d28",
              textShadow: isDark
                ? "0 0 32px rgba(167,139,250,0.55), 0 2px 8px rgba(0,0,0,0.5)"
                : "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(45,106,79,0.18)",
              opacity:switching?0:1,
              transition:"opacity .22s, color .5s, text-shadow .5s",
            }}>{title}</h2>

            {/* ── divider ── */}
            <div style={{height:1,background:`linear-gradient(90deg,${tk.divider},${tk.divider2},transparent)`,transition:"background .5s"}}/>

            {/* ── body text ── */}
            <p style={{
              margin:0,
              fontSize:isMobile?12:13,lineHeight:1.85,
              color:tk.bodyText,
              fontFamily:lang==="th"?"'Sarabun',sans-serif":"'Inter',sans-serif",
              letterSpacing:lang==="th"?".02em":".01em",
              opacity:switching?0:1,
              transform:switching?"translateY(4px)":"none",
              transition:"opacity .22s, transform .22s, color .5s",
            }}>{body}</p>

            {/* ── lang toggle ── */}
            <div style={{
              display:"inline-flex",padding:3,borderRadius:999,
              background:tk.toggleBg,border:`1px solid ${tk.toggleBorder}`,
              backdropFilter:"blur(10px)",width:"fit-content",
              transition:"background .5s,border-color .5s",
            }}>
              {(["en","th"] as const).map(l=>(
                <button key={l} onClick={()=>switchLang(l)} style={{
                  padding:"5px 18px",borderRadius:999,cursor:"pointer",
                  fontFamily:"'Inter',sans-serif",fontSize:11,fontWeight:700,letterSpacing:".08em",
                  background:lang===l?tk.activeLangBg:"transparent",
                  color:lang===l?tk.activeLangText:tk.inactiveLangText,
                  border:lang===l?`1px solid ${tk.activeLangBorder}`:"1px solid transparent",
                  boxShadow:lang===l?`0 0 12px ${tk.accent}22`:"none",
                  transition:"all .28s cubic-bezier(.22,.68,0,1.2)",
                }}>{l.toUpperCase()}</button>
              ))}
            </div>

            {/* ── stats ── */}
            <div style={{display:"flex",gap:8}}>
              {STATS.map((s,i)=>(
                <StatPill key={s.label} label={s.label} value={s.value}
                  accent={isDark?s.moonAccent:s.sunAccent} tk={tk} delay={.3+i*.08}/>
              ))}
            </div>

            {/* ── divider ── */}
            <div style={{height:1,background:`linear-gradient(90deg,${tk.divider},transparent)`,transition:"background .5s"}}/>

            {/* ── contact ── */}
            <div>
              <SectionLabel Icon={PhoneIco} label="Contact" color={isDark?"#67e8f9":"#2d6a4f"} tk={tk}/>
              <div style={{display:"flex",flexDirection:"column",gap:7}}>
                {CONTACTS.map((c,i)=>(
                  <ContactCard key={c.label} Icon={c.Icon} label={c.label} value={c.value}
                    accent={isDark?c.moonAccent:c.sunAccent}
                    href={c.href} tk={tk} delay={.2+i*.06}/>
                ))}
              </div>
            </div>

            {/* ── education ── */}
            <div>
              <SectionLabel Icon={GradCap} label="Education" color={isDark?"#a78bfa":"#2d6a4f"} tk={tk}/>
              <EduCard tk={tk} accent={isDark?"#a78bfa":"#2d6a4f"}/>
            </div>

          </div>
        </div>

        {/* ── bottom fade ── */}
        <div style={{
          position:"absolute",bottom:0,left:0,right:0,height:80,
          background:tk.bottomFade,pointerEvents:"none",
          transition:"background .5s",
        }}/>
      </section>
    </>
  );
}