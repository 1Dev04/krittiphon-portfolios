"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/themeContext";

type Lang = "TH" | "EN";

interface FpTheme {
  pageBg: string;
  gridLine: string;
  orbA: string; orbB: string; orbC: string;
  scanLine: string;
  bottomFade: string;
  eyebrowColor: string;
  eyebrowLine: string;
  headingColor: string;
  headingFont: string;
  headingShadow: string;
  headingSub: string;
  // accent — changes per theme
  accent: string;
  accentGlow: string;
  accentB: string;
  // hero
  heroBg: string;
  heroBorder: string;
  heroGlow: string;
  heroTitle: string;
  heroSub: string;
  heroTagBg: string;
  heroTagText: string;
  // stats
  statBg: string;
  statBorder: string;
  statTopLine: string;
  statNumberColor: string;
  statLabel: string;
  statSub: string;
  // section headers
  sectionColor: string;
  sectionLine: string;
  // planning image card
  imgCardBg: string;
  imgCardBorder: string;
  imgCardShadow: string;
  imgCaption: string;
  imgTag: string;
  imgTagBg: string;
  // timeline card
  cardBg: string;
  cardBgHov: string;
  cardYear: string;
  taskNormal: string;
  techCat: string;
  // lang toggle
  toggleWrap: string;
  toggleWrapBorder: string;
  toggleWrapShadow: string;
  toggleActiveColor: string;
  toggleInactiveColor: string;
}

/* ══════════════════════════════════════════════════════
   ☀️  SUN — Natural Green Throne
══════════════════════════════════════════════════════ */
const SUN_FP: FpTheme = {
  pageBg: "linear-gradient(160deg,#f5f7f4 0%,#eef4ee 50%,#f0f5f0 100%)",
  gridLine: "rgba(45,106,79,0.04)",
  orbA: "rgba(45,106,79,0.10)",
  orbB: "rgba(82,183,136,0.07)",
  orbC: "rgba(27,67,50,0.05)",
  scanLine: "rgba(45,106,79,0.06)",
  bottomFade: "linear-gradient(transparent,#eef4ee)",
  eyebrowColor: "#2d6a4f",
  eyebrowLine: "rgba(45,106,79,0.35)",
  headingColor: "#1a3d28",
  headingFont: "'Lora',serif",
  headingShadow: "0 1px 0 rgba(255,255,255,0.9),0 2px 12px rgba(45,106,79,0.15)",
  headingSub: "rgba(20,50,30,0.45)",
  // ── accent = forest green
  accent: "#2d6a4f",
  accentGlow: "#1a3d28",
  accentB: "#40916c",
  heroBg: "rgba(45,106,79,0.10)",
  heroBorder: "rgba(45,106,79,0.40)",
  heroGlow: "0 0 24px rgba(45,106,79,0.14)",
  heroTitle: "#1a3d28",
  heroSub: "#2d6a4f",
  heroTagBg: "rgba(45,106,79,0.12)",
  heroTagText: "#2d6a4f",
  statBg: "rgba(255,255,255,0.82)",
  statBorder: "rgba(45,106,79,0.20)",
  statTopLine: "linear-gradient(90deg,transparent,rgba(45,106,79,0.70),transparent)",
  statNumberColor: "#2d6a4f",
  statLabel: "#2d6a4f",
  statSub: "rgba(20,50,30,0.44)",
  sectionColor: "#2d6a4f",
  sectionLine: "linear-gradient(90deg,transparent,rgba(45,106,79,0.44))",
  imgCardBg: "rgba(255,255,255,0.90)",
  imgCardBorder: "rgba(45,106,79,0.28)",
  imgCardShadow: "0 8px 40px rgba(45,106,79,0.12),0 2px 12px rgba(20,60,35,0.09)",
  imgCaption: "rgba(20,50,30,0.62)",
  imgTag: "#2d6a4f",
  imgTagBg: "rgba(45,106,79,0.12)",
  cardBg: "rgba(255,255,255,0.82)",
  cardBgHov: "rgba(255,255,255,0.97)",
  cardYear: "rgba(20,50,30,0.32)",
  taskNormal: "rgba(20,50,30,0.62)",
  techCat: "rgba(20,50,30,0.34)",
  toggleWrap: "rgba(255,255,255,0.80)",
  toggleWrapBorder: "rgba(45,106,79,0.22)",
  toggleWrapShadow: "0 4px 20px rgba(20,60,35,0.10)",
  toggleActiveColor: "#1a3d28",
  toggleInactiveColor: "rgba(20,50,30,0.30)",
};

/* ══════════════════════════════════════════════════════
   🌙  MOON — Galaxy Magic Purple/Violet
══════════════════════════════════════════════════════ */
const MOON_FP: FpTheme = {
  pageBg: "radial-gradient(ellipse at 20% 50%,#0f0528 0%,#060414 40%,#020210 100%)",
  gridLine: "rgba(167,139,250,0.025)",
  orbA: "rgba(124,58,237,0.16)",
  orbB: "rgba(167,139,250,0.12)",
  orbC: "rgba(192,132,252,0.10)",
  scanLine: "rgba(167,139,250,0.22)",
  bottomFade: "linear-gradient(transparent,#020210)",
  eyebrowColor: "#a78bfa",
  eyebrowLine: "rgba(167,139,250,0.45)",
  headingColor: "#e9d5ff",
  headingFont: "'Cinzel',serif",
  headingShadow: "0 0 32px rgba(167,139,250,0.55),0 2px 8px rgba(0,0,0,0.5)",
  headingSub: "rgba(255,255,255,0.34)",
  // ── accent = violet/lavender — consistent with galaxy theme
  accent: "#a78bfa",
  accentGlow: "#7c3aed",
  accentB: "#c084fc",
  heroBg: "rgba(167,139,250,0.10)",
  heroBorder: "rgba(167,139,250,0.44)",
  heroGlow: "0 0 32px rgba(167,139,250,0.22)",
  heroTitle: "#e9d5ff",
  heroSub: "#a78bfa",
  heroTagBg: "rgba(167,139,250,0.14)",
  heroTagText: "#a78bfa",
  statBg: "rgba(255,255,255,0.04)",
  statBorder: "rgba(167,139,250,0.24)",
  statTopLine: "linear-gradient(90deg,transparent,rgba(167,139,250,0.80),transparent)",
  statNumberColor: "#a78bfa",
  statLabel: "#a78bfa",
  statSub: "rgba(200,185,255,0.50)",
  sectionColor: "#a78bfa",
  sectionLine: "linear-gradient(90deg,transparent,rgba(167,139,250,0.44))",
  imgCardBg: "rgba(255,255,255,0.04)",
  imgCardBorder: "rgba(167,139,250,0.28)",
  imgCardShadow: "0 0 56px rgba(167,139,250,0.16),0 16px 48px rgba(0,0,0,0.50)",
  imgCaption: "rgba(220,200,255,0.72)",
  imgTag: "#a78bfa",
  imgTagBg: "rgba(167,139,250,0.14)",
  cardBg: "rgba(255,255,255,0.04)",
  cardBgHov: "linear-gradient(135deg,rgba(167,139,250,0.10),rgba(255,255,255,0.04))",
  cardYear: "rgba(200,185,255,0.35)",
  taskNormal: "rgba(200,185,255,0.62)",
  techCat: "rgba(200,185,255,0.32)",
  toggleWrap: "rgba(167,139,250,0.08)",
  toggleWrapBorder: "rgba(167,139,250,0.28)",
  toggleWrapShadow: "0 4px 24px rgba(124,58,237,0.18)",
  toggleActiveColor: "#e9d5ff",
  toggleInactiveColor: "rgba(200,185,255,0.32)",
};

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const ABCSHOP = {
  name: "ABCat Shop",
  role_en: "Senior Project — Flutter + AI",
  role_th: "โปรเจกต์จบการศึกษา — Flutter + AI",
  period_en: "January – March 2026",
  period_th: "มกราคม – มีนาคม 2569",
  icon: "🐱",
  tag_en: "SENIOR PROJECT",
  tag_th: "โปรเจกต์ Senior",
  desc_en: "ABCat Shop is a Full-Stack Mobile Application built with Flutter + AI that recommends cat clothing sizes. It uses YOLO for cat detection and GPT-4.1 mini / Gemini 2.5 Flash for size analysis — covering Frontend (Flutter), Backend (FastAPI), and DevOps (Jenkins + Render).",
  desc_th: "ABCat Shop คือ Full-Stack Mobile Application พัฒนาด้วย Flutter + AI ที่ช่วยแนะนำขนาดเสื้อผ้าสำหรับแมว โดยใช้ YOLO สำหรับ Detect แมว และ GPT-4.1 mini / Gemini 2.5 Flash สำหรับ Analysis ขนาด ครบวงจรตั้งแต่ Frontend (Flutter) ถึง Backend (FastAPI) และ DevOps (Jenkins + Render)",
  planningImg: "https://res.cloudinary.com/dag73dhpl/image/upload/v1773725640/%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%9E%E0%B8%B1%E0%B8%92%E0%B8%99%E0%B8%B2_1_efrywh.png",
  youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  stats: [
    { value: "70+", label_en: "Dev Days", label_th: "วันพัฒนา", sub_en: "Jan – Mar 2026", sub_th: "ม.ค. – มี.ค. 2569" },
    { value: "12", label_en: "App Pages", label_th: "หน้าแอป", sub_en: "Home, Shop, Meow Size…", sub_th: "Home, Shop, Basket, Meow Size ฯลฯ" },
    { value: "3", label_en: "AI Models", label_th: "AI Models", sub_en: "YOLO · Gemini · GPT-4.1", sub_th: "YOLO · Gemini 2.5 Flash · GPT-4.1 mini" },
  ],
  // tech keeps its own distinctive colors — these are brand colors, not theme accent
  tech: [
    { label: "Flutter", cat: "Frontend", color: "#38bdf8" },
    { label: "Dart", cat: "Frontend", color: "#06b6d4" },
    { label: "Python", cat: "AI/ML", color: "#facc15" },
    { label: "YOLO", cat: "AI/ML", color: "#f97316" },
    { label: "Gemini 2.5 Flash", cat: "AI/ML", color: "#a78bfa" },
    { label: "GPT-4.1 mini", cat: "AI/ML", color: "#10b981" },
    { label: "OpenAI API", cat: "API", color: "#22c55e" },
    { label: "FastAPI", cat: "Backend", color: "#34d399" },
    { label: "PostgreSQL", cat: "Database", color: "#38bdf8" },
    { label: "Cloudinary", cat: "Storage", color: "#60a5fa" },
    { label: "Jenkins", cat: "DevOps", color: "#ef4444" },
    { label: "Render", cat: "Deploy", color: "#a78bfa" },
    { label: "Firebase", cat: "Auth", color: "#fbbf24" },
    { label: "Google AI Studio", cat: "API", color: "#34d399" },
    { label: "Git", cat: "Tools", color: "#f97316" },
  ],
  months: [
    {
      month_en: "January", month_th: "มกราคม", year: "2026", num: "01", icon: "🤖",
      tasks: ["13–15 Jan — Train AI Model Python + YOLO (Round 1–3) | เทรน AI Model ด้วย Python + YOLO (รอบ 1–3)", "16–23 Jan — Design & build Frontend + Backend structure | ออกแบบ & ลงมือทำ Structure 8 วัน", "24–25 Jan — Update ER Diagram & Planning Structure | อัพเดต ER Diagram & Planning", "26 Jan — Mock data Home page | Mock data หน้า Home", "27 Jan — Mock data Shop, Flutter folders | Mock data Shop + แยก Section", "28 Jan — Gemini AI poster, Mock data Coupon | Generate AI Poster ด้วย Gemini", "29 Jan — Mock data Notification, Coupon, History, Order", "30–31 Jan — Train AI YOLO Round 4–5 | เทรน YOLO รอบ 4–5"]
    },
    {
      month_en: "February (Early)", month_th: "กุมภาพันธ์ (ต้น)", year: "2026", num: "02", icon: "🔗",
      tasks: ["1–7 Feb — Connect Backend all pages + Custom Snackbar + DB v1–v4", "8 Feb — Build path transfer Backend → Frontend callback", "9 Feb — Fix VARCHAR → TEXT to prevent icon issues", "10 Feb — Update Learn More to icon on Notification", "11 Feb — Fix X button Search Page → Homepage", "12 Feb — Update Frontend V4.2"]
    },
    {
      month_en: "February (Late)", month_th: "กุมภาพันธ์ (ปลาย)", year: "2026", num: "03", icon: "🧪",
      tasks: ["13 Feb — Flow Diagram, Use Case, update Backend Home + Search", "14 Feb — Update Backend Shop, Notification", "15 Feb — Meow Size Page, research OpenAI & Jenkins", "16 Feb — Meeting with advisor, improve Favourite + Basket", "17 Feb — Setup Jenkins Sleep Time Automation", "18–22 Feb — Improve Meow Size, Favourite, Basket + Sequence Diagram", "23 Feb — Fix Alert Text, discover Gemini API", "24–28 Feb — Fix Meow Size, add History Page, Deploy, Google AI Studio V1–V5"]
    },
    {
      month_en: "March (Early)", month_th: "มีนาคม (ต้น)", year: "2026", num: "04", icon: "✨",
      tasks: ["1 Mar — Connect Google AI Studio V6", "2 Mar — Fix API Cat, ✅ Success Call Gemini 2.5 Flash", "3 Mar — Fix History Edit, Meow Size Recommendation Scan", "4–5 Mar — Fix Meow Size Recommendation Card", "6 Mar — Recommendation Card V2", "7 Mar — Recommendation Card V3"]
    },
    {
      month_en: "March (Late) — Done!", month_th: "มีนาคม (ปลาย) — สำเร็จ!", year: "2026", num: "05", icon: "🏁",
      tasks: ["8 Mar — Edit Meow Size (Recommend, Edit Cat, Backend CRUD)", "9 Mar — Switch to OpenAI GPT-4.1 mini | เปลี่ยนมาใช้ OpenAI GPT-4.1 mini", "10 Mar — Edit Meow Size (History Analysis Cat)", "🎉 11 Mar — SUCCESS PROJECT ABCat Shop"]
    },
  ],
};

/* ══════════════════════════════════════════════════════
   MONTH COLORS — per theme
   Sun = green natural shades, Moon = colorful galaxy
══════════════════════════════════════════════════════ */
const MONTH_COLORS_SUN = [
  { color: "#2d6a4f", glow: "#1a3d28" },
  { color: "#40916c", glow: "#2d6a4f" },
  { color: "#52b788", glow: "#40916c" },
  { color: "#1a5c38", glow: "#0f3320" },
  { color: "#74c69d", glow: "#52b788" },
];
const MONTH_COLORS_MOON = [
  { color: "#a78bfa", glow: "#7c3aed" },
  { color: "#67e8f9", glow: "#0891b2" },
  { color: "#818cf8", glow: "#4f46e5" },
  { color: "#fcd34d", glow: "#d97706" },
  { color: "#fb923c", glow: "#ea580c" },
];

/* ══════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════ */
function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ══════════════════════════════════════════════════════
   LANG TOGGLE
══════════════════════════════════════════════════════ */
function LangToggle({ lang, setLang, tk }: { lang: Lang; setLang: (l: Lang) => void; tk: FpTheme }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 3,
      background: tk.toggleWrap, border: `1px solid ${tk.toggleWrapBorder}`,
      borderRadius: 999, padding: "5px 6px",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      boxShadow: tk.toggleWrapShadow, position: "relative",
    }}>
      {(["EN", "TH"] as Lang[]).map(l => {
        const active = lang === l;
        return (
          <button key={l} onClick={() => setLang(l)} style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 11, fontWeight: 700, letterSpacing: ".14em",
            color: active ? tk.toggleActiveColor : tk.toggleInactiveColor,
            background: active
              ? `linear-gradient(135deg,${tk.accent}28,${tk.accent}14)`
              : "transparent",
            border: active
              ? `1px solid ${tk.accent}66`
              : "1px solid transparent",
            borderRadius: 999, padding: "6px 18px", cursor: "pointer",
            boxShadow: active ? `0 0 14px ${tk.accent}33` : "none",
            transform: active ? "scale(1.05)" : "scale(1)",
            transition: "all .28s cubic-bezier(.22,.68,0,1.2)",
          }}>{l}</button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════════════ */
function SectionHeader({ icon, label, tk }: { icon: string; label: string; tk: FpTheme }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
      <div style={{ flex: 1, height: 1, background: tk.sectionLine }} />
      <span style={{
        fontFamily: "'Cinzel',serif", fontSize: 11, color: tk.sectionColor,
        letterSpacing: ".28em", fontWeight: 700, whiteSpace: "nowrap",
        transition: "color .5s"
      }}>{icon} {label}</span>
      <div style={{
        flex: 1, height: 1,
        background: `linear-gradient(90deg,${tk.accent}44,transparent)`
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TIMELINE CARD
══════════════════════════════════════════════════════ */
function TimelineCard({ item, mc, isMobile, visible, lang, tk }: {
  item: typeof ABCSHOP.months[0];
  mc: { color: string; glow: string };
  isMobile: boolean; visible: boolean; lang: Lang; tk: FpTheme;
}) {
  const [hov, setHov] = useState(false);
  const isSuccess = item.tasks.some(t => t.includes("SUCCESS") || t.includes("🎉"));
  const monthLabel = lang === "EN" ? item.month_en : item.month_th;

  const bg = hov ? tk.cardBgHov
    : isSuccess ? (tk === SUN_FP
      ? `linear-gradient(135deg,${mc.color}10,rgba(255,255,255,0.88))`
      : `linear-gradient(135deg,${mc.color}12,rgba(255,255,255,0.04))`)
      : tk.cardBg;

  const border = `1px solid ${hov || isSuccess ? mc.color + "66" : mc.color + "28"}`;

  const shadow = hov
    ? (tk === SUN_FP
      ? `0 0 32px ${mc.color}18,0 12px 40px rgba(20,60,35,0.11),inset 0 1px 0 rgba(255,255,255,.85)`
      : `0 0 44px ${mc.color}38,0 16px 48px rgba(0,0,0,.65),inset 0 1px 0 rgba(255,255,255,.08)`)
    : isSuccess
      ? `0 0 24px ${mc.color}33,0 8px 24px rgba(0,0,0,.3)`
      : (tk === SUN_FP
        ? `0 2px 16px rgba(20,60,35,0.07),inset 0 1px 0 rgba(255,255,255,.65)`
        : `0 4px 24px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.04)`);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", borderRadius: 20,
        padding: isMobile ? "18px 16px 16px" : "22px 24px 20px",
        background: bg, border, backdropFilter: "blur(16px)",
        boxShadow: shadow,
        transform: hov ? "translateY(-5px)" : "none",
        transition: "all .38s cubic-bezier(.22,.68,0,1.2)",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: 1.5,
        background: `linear-gradient(90deg,transparent,${mc.color}${hov || isSuccess ? "cc" : "66"},transparent)`
      }} />

      {(["tl", "tr", "bl", "br"] as const).map(k => (
        <div key={k} style={{
          position: "absolute",
          top: k[0] === "t" ? 10 : "auto", bottom: k[0] === "b" ? 10 : "auto",
          left: k[1] === "l" ? 10 : "auto", right: k[1] === "r" ? 10 : "auto",
          width: 12, height: 12,
          borderTop: k[0] === "t" ? `1px solid ${mc.color}55` : "none",
          borderBottom: k[0] === "b" ? `1px solid ${mc.color}55` : "none",
          borderLeft: k[1] === "l" ? `1px solid ${mc.color}55` : "none",
          borderRight: k[1] === "r" ? `1px solid ${mc.color}55` : "none",
          pointerEvents: "none",
        }} />
      ))}

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: isMobile ? 18 : 20 }}>{item.icon}</span>
        <div>
          <div style={{
            fontFamily: "'Cinzel',serif", fontSize: isMobile ? 14 : 16, fontWeight: 700,
            color: mc.color,
            textShadow: hov ? `0 0 18px ${mc.color}cc` : `0 0 8px ${mc.color}55`,
            letterSpacing: ".06em", transition: "text-shadow .3s",
          }}>{monthLabel}</div>
          <div style={{
            fontSize: 10, fontFamily: "'Space Mono',monospace",
            color: tk.cardYear, letterSpacing: ".2em"
          }}>{item.year}</div>
        </div>
        <div style={{
          marginLeft: "auto", width: 32, height: 32, borderRadius: "50%",
          background: `${mc.color}18`, border: `1px solid ${mc.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Mono',monospace", fontSize: 11,
          color: mc.color, fontWeight: 700,
        }}>{item.num}</div>
      </div>

      <div style={{
        height: 1, marginBottom: 12,
        background: `linear-gradient(90deg,${mc.color}66,transparent)`
      }} />

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
        {item.tasks.map((t, ti) => {
          const isHL = t.includes("✅") || t.includes("🎉") || t.includes("SUCCESS");
          const display = lang === "EN"
            ? t.split("|")[0].trim()
            : t.includes("|") ? t.split("|")[1].trim() : t;
          return (
            <li key={ti} style={{
              display: "flex", alignItems: "flex-start", gap: 8,
              fontFamily: isHL ? "'Space Mono',monospace" : "'Sarabun',sans-serif",
              fontSize: isMobile ? 11 : 12,
              color: isHL ? mc.color : tk.taskNormal,
              lineHeight: 1.65, fontWeight: isHL ? 700 : 400,
              letterSpacing: isHL ? ".04em" : "0",
              animation: visible ? `fpTaskIn .4s ${.08 + ti * .055}s ease both` : "none",
              background: isHL ? `${mc.color}0e` : "transparent",
              padding: isHL ? "4px 8px" : "0",
              borderRadius: isHL ? 8 : 0,
              border: isHL ? `1px solid ${mc.color}33` : "none",
              margin: isHL ? "2px 0" : "0",
            }}>
              <span style={{
                width: isHL ? 6 : 5, height: isHL ? 6 : 5, borderRadius: "50%", flexShrink: 0,
                background: mc.color, boxShadow: `0 0 ${isHL ? 10 : 5}px ${mc.color}`,
                marginTop: 5,
              }} />
              {display}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   TIMELINE ITEM
══════════════════════════════════════════════════════ */
function TimelineItem({ item, mc, index, isMobile, isLast, lang, tk }: {
  item: typeof ABCSHOP.months[0]; mc: { color: string; glow: string };
  index: number; isMobile: boolean; isLast: boolean; lang: Lang; tk: FpTheme;
}) {
  const { ref, visible } = useVisible(0.07);
  const isRight = index % 2 === 0;

  if (isMobile) {
    return (
      <div ref={ref} style={{
        display: "flex", gap: 12,
        opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
        transition: `opacity .6s ${index * .07}s ease,transform .6s ${index * .07}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 26 }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
            background: `radial-gradient(circle,${mc.color} 0%,${mc.color}44 60%,transparent 100%)`,
            border: `2px solid ${mc.color}`,
            boxShadow: `0 0 12px ${mc.glow}88,0 0 24px ${mc.glow}44`,
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2,
            animation: visible ? `fpNodeIn .5s ${index * .07}s ease both` : "none",
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: "50%", background: "#fff",
              boxShadow: `0 0 5px ${mc.color}`
            }} />
          </div>
          {!isLast && <div style={{
            flex: 1, width: 2, marginTop: 4,
            background: `linear-gradient(180deg,${mc.color}88,transparent)`
          }} />}
        </div>
        <div style={{ flex: 1, paddingBottom: isLast ? 0 : 18 }}>
          <TimelineCard item={item} mc={mc} isMobile={isMobile} visible={visible} lang={lang} tk={tk} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 64px 1fr", alignItems: "flex-start" }}>
      <div style={{
        paddingRight: 28, paddingTop: 8,
        opacity: visible ? 1 : 0, transform: visible ? "none" : `translateX(${isRight ? -28 : 0}px)`,
        transition: `opacity .65s ${index * .1}s ease,transform .65s ${index * .1}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        {isRight && <TimelineCard item={item} mc={mc} isMobile={isMobile} visible={visible} lang={lang} tk={tk} />}
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", zIndex: 2, paddingTop: 8 }}>
        <div style={{
          width: 48, height: 48, borderRadius: "50%",
          background: `radial-gradient(circle,${mc.color}ee 0%,${mc.color}55 55%,transparent 100%)`,
          border: `2px solid ${mc.color}`,
          boxShadow: `0 0 24px ${mc.glow}99,0 0 48px ${mc.glow}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, flexShrink: 0,
          animation: visible ? `fpNodeIn .5s ${index * .1}s ease both` : "none",
        }}>{item.icon}</div>
      </div>
      <div style={{
        paddingLeft: 28, paddingTop: 8,
        opacity: visible ? 1 : 0, transform: visible ? "none" : `translateX(${!isRight ? 28 : 0}px)`,
        transition: `opacity .65s ${index * .1}s ease,transform .65s ${index * .1}s cubic-bezier(.22,.68,0,1.2)`,
      }}>
        {!isRight && <TimelineCard item={item} mc={mc} isMobile={isMobile} visible={visible} lang={lang} tk={tk} />}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════ */
export default function FeatureProjectPage() {
  const { isDark } = useTheme();
  const tk = isDark ? MOON_FP : SUN_FP;

  const [lang, setLang] = useState<Lang>("EN");
  const [switching, setSw] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { ref: headerRef, visible: headerVisible } = useVisible(0.1);
  const { ref: planRef, visible: planVisible } = useVisible(0.08);
  const { ref: techRef, visible: techVisible } = useVisible(0.1);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check(); window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const switchLang = (l: Lang) => {
    if (l === lang) return;
    setSw(true);
    setTimeout(() => { setLang(l); setSw(false); }, 220);
  };

  const t = (en: string, th: string) => lang === "EN" ? en : th;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Space+Mono:wght@400;700&family=Lora:ital,wght@0,600;1,600&family=Sarabun:wght@400;500;600;700&display=swap');
        @keyframes fpOrbDrift  { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-16px) scale(1.04)} }
        @keyframes fpScan { 0%{transform:translateY(-100vh)} 100%{transform:translateY(100vh)} }
        @keyframes fpNodeIn    { 0%{transform:scale(0) rotate(-180deg);opacity:0} 70%{transform:scale(1.15) rotate(10deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes fpTaskIn    { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fpTechReveal{ from{opacity:0;transform:scale(.8) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fpLineGrow  { from{height:0;opacity:0} to{opacity:1} }
        @keyframes fpFadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fpImgIn     { from{opacity:0;transform:scale(.97)} to{opacity:1;transform:scale(1)} }
        @keyframes fpDotPulse  { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.8);opacity:1} }
        * { box-sizing:border-box; margin:0; padding:0; }
      `}</style>

      <section id="feature-project" style={{
        minHeight: "100vh", background: tk.pageBg,
        position: "relative", overflowX: "hidden",
        padding: isMobile ? "80px 0 60px" : "100px 0 80px",
        transition: "background .5s ease",
      }}>
        {/* grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(${tk.gridLine} 1px,transparent 1px),linear-gradient(90deg,${tk.gridLine} 1px,transparent 1px)`,
          backgroundSize: "80px 80px"
        }} />

        {/* orbs */}
        {([
          { w: 500, h: 500, t: "-12%", l: "-8%", bg: tk.orbA, d: "15s", dl: "0s" },
          { w: 360, h: 360, t: "60%", r: "-7%", bg: tk.orbB, d: "19s", dl: "4s" },
          { w: 260, h: 260, t: "28%", l: "42%", bg: tk.orbC, d: "11s", dl: "3s" },
        ] as any[]).map((o, i) => (
          <div key={i} style={{
            position: "absolute", width: o.w, height: o.h, top: o.t,
            left: o.l, right: o.r, borderRadius: "50%", filter: "blur(88px)",
            background: o.bg, animation: `fpOrbDrift ${o.d} ease-in-out ${o.dl} infinite`,
            pointerEvents: "none", transition: "background .5s"
          }} />
        ))}

        {/* scan */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg,transparent,${tk.scanLine},transparent)`,
          animation: "fpScan 10s linear infinite", pointerEvents: "none", zIndex: 2,
          opacity: isDark ? 1 : .4, willChange: "transform"
        }} />

        {/* particles — dark only */}
        {isDark && Array.from({ length: 18 }, (_, i) => {
          const colors = ["#a78bfa", "#67e8f9", "#c084fc", "#818cf8", "#f0abfc", "#e879f9"];
          const c = colors[i % 6];
          return <div key={i} style={{
            position: "absolute", left: `${(i * 47.3) % 100}%`, top: `${(i * 31.7) % 100}%`,
            width: (i % 3) + 1, height: (i % 3) + 1, borderRadius: "50%",
            background: c, boxShadow: `0 0 ${(i % 3 + 2) * 3}px ${c}`,
            animation: `fpOrbDrift ${5 + i % 5}s ease-in-out ${(i * .3) % 5}s infinite`,
            pointerEvents: "none", opacity: .60,
          }} />;
        })}

        {/* CONTENT */}
        <div style={{
          position: "relative", zIndex: 3, maxWidth: 1100, margin: "0 auto",
          padding: isMobile ? "0 16px" : "0 clamp(20px,5%,60px)",
          opacity: switching ? .4 : 1, transition: "opacity .22s",
        }}>

          {/* HEADER */}
          <div ref={headerRef} style={{
            textAlign: "center", marginBottom: isMobile ? 40 : 56,
            opacity: headerVisible ? 1 : 0, transform: headerVisible ? "none" : "translateY(-24px)",
            transition: "opacity .8s ease,transform .8s cubic-bezier(.22,.68,0,1.2)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
              <div style={{ height: 1, width: isMobile ? 40 : 80, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
              <span style={{
                fontSize: 10, color: tk.eyebrowColor, letterSpacing: ".40em",
                fontFamily: "'Space Mono',monospace", transition: "color .5s"
              }}>✦ FEATURED PROJECT ✦</span>
              <div style={{ height: 1, width: isMobile ? 40 : 80, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
            </div>
            <h1 style={{
              fontSize: isMobile ? "clamp(26px,8vw,38px)" : "clamp(30px,4vw,48px)",
              fontFamily: tk.headingFont,
              fontStyle: isDark ? "normal" : "italic",
              fontWeight: 900, letterSpacing: ".08em",
              color: tk.headingColor, textShadow: tk.headingShadow,
              lineHeight: 1.1, marginBottom: 8,
              transition: "color .5s,text-shadow .5s",
            }}>ABCat Shop</h1>
            <p style={{
              fontFamily: "'Space Mono',monospace", fontSize: 11,
              color: tk.eyebrowColor, letterSpacing: ".18em", textTransform: "uppercase",
              transition: "color .5s"
            }}>
              AI-Powered eCommerce · Smart Sizing Feature
            </p>
          </div>

          {/* HERO BADGE */}
          <div style={{
            display: "flex", justifyContent: "center",
            marginBottom: isMobile ? 36 : 48, animation: "fpFadeUp .5s ease both"
          }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: isMobile ? "12px 20px" : "16px 32px", borderRadius: 999,
              background: tk.heroBg, border: `1.5px solid ${tk.heroBorder}`,
              backdropFilter: "blur(14px)", boxShadow: tk.heroGlow,
              flexWrap: isMobile ? "wrap" : "nowrap", justifyContent: "center",
            }}>
              <span style={{ fontSize: 22 }}>{ABCSHOP.icon}</span>
              <div>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: isMobile ? 13 : 15,
                  color: tk.heroTitle, fontWeight: 700, letterSpacing: ".06em",
                  transition: "color .5s"
                }}>{ABCSHOP.name}</div>
                <div style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 10,
                  color: tk.heroSub, letterSpacing: ".12em"
                }}>{t(ABCSHOP.role_en, ABCSHOP.role_th)}</div>
              </div>
              <div style={{
                padding: "4px 14px", borderRadius: 999, background: tk.heroTagBg,
                border: `1px solid ${tk.heroBorder}`, fontSize: 10, color: tk.heroTagText,
                fontFamily: "'Space Mono',monospace", letterSpacing: ".1em", fontWeight: 700
              }}>
                {t(ABCSHOP.tag_en, ABCSHOP.tag_th)}
              </div>
              <div style={{
                padding: "4px 14px", borderRadius: 999, background: tk.heroTagBg,
                border: `1px solid ${tk.heroBorder}`, fontSize: 10, color: tk.heroTagText,
                fontFamily: "'Space Mono',monospace", letterSpacing: ".1em"
              }}>
                {t(ABCSHOP.period_en, ABCSHOP.period_th)}
              </div>
              {/* YouTube */}
              <a href={ABCSHOP.youtubeUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "6px 16px", borderRadius: 999,
                  background: "rgba(255,0,0,0.12)", border: "1.5px solid rgba(255,0,0,0.35)",
                  textDecoration: "none", transition: "all .25s ease"
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,0,0,0.22)"; el.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,0,0,0.12)"; el.style.transform = "scale(1)"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#ff0000">
                  <path d="M23.5 6.2s-.23-1.65-.96-2.38c-.91-.96-1.94-.96-2.4-1.02C17.14 2.6 12 2.6 12 2.6s-5.14 0-8.14.2c-.47.06-1.49.06-2.4 1.02C.73 4.55.5 6.2.5 6.2S.27 8.13.27 10.05v1.8c0 1.92.23 3.85.23 3.85s.23 1.65.96 2.38c.91.96 2.12.93 2.65 1.03C5.73 19.3 12 19.3 12 19.3s5.14 0 8.14-.2c.47-.06 1.49-.06 2.4-1.02.73-.73.96-2.38.96-2.38s.23-1.93.23-3.85v-1.8C23.73 8.13 23.5 6.2 23.5 6.2zM9.73 14.59V8.41l6.55 3.1-6.55 3.08z" />
                </svg>
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#ff4444",
                  fontWeight: 700, letterSpacing: ".1em", whiteSpace: "nowrap"
                }}>VIDEO</span>
              </a>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div style={{
            maxWidth: 820, margin: "0 auto", marginBottom: isMobile ? 40 : 56,
            padding: isMobile ? "18px 20px" : "22px 32px", borderRadius: 16,
            background: tk.imgCardBg, border: `1.5px solid ${tk.imgCardBorder}`,
            backdropFilter: "blur(14px)", animation: "fpFadeUp .6s .1s ease both",
            transition: "background .5s,border-color .5s",
          }}>
            <p style={{
              fontFamily: "'Sarabun',sans-serif", fontSize: isMobile ? 13 : 14,
              lineHeight: 1.9, color: tk.imgCaption, textAlign: "center",
              letterSpacing: ".01em", transition: "color .5s"
            }}>
              {t(ABCSHOP.desc_en, ABCSHOP.desc_th)}
            </p>
          </div>

          {/* STATS */}
          <div style={{
            display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
            gap: isMobile ? 12 : 20, marginBottom: isMobile ? 52 : 72,
          }}>
            {ABCSHOP.stats.map((s, i) => (
              <div key={i} style={{
                textAlign: "center", padding: isMobile ? "20px 14px" : "26px 18px",
                borderRadius: 18, background: tk.statBg, border: `1.5px solid ${tk.statBorder}`,
                backdropFilter: "blur(14px)", position: "relative", overflow: "hidden",
                animation: `fpFadeUp .5s ${i * .1}s ease both`,
                transition: "background .5s,border-color .5s",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: "20%", right: "20%",
                  height: 1.5, background: tk.statTopLine
                }} />
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: isMobile ? 38 : 46,
                  fontWeight: 900, lineHeight: 1, color: tk.statNumberColor,
                  textShadow: isDark ? `0 0 20px ${tk.accent}88` : `0 0 12px ${tk.accent}44`,
                  marginBottom: 6, transition: "color .5s,text-shadow .5s"
                }}>{s.value}</div>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: 13, color: tk.statLabel,
                  fontWeight: 700, letterSpacing: ".08em", marginBottom: 4,
                  transition: "color .5s"
                }}>{t(s.label_en, s.label_th)}</div>
                <div style={{
                  fontFamily: "'Sarabun',sans-serif", fontSize: 12,
                  color: tk.statSub, transition: "color .5s"
                }}>{t(s.sub_en, s.sub_th)}</div>
              </div>
            ))}
          </div>

          {/* PLANNING STRUCTURE */}
          <div ref={planRef}>
            <SectionHeader icon="📐" label={t("PLANNING STRUCTURE", "โครงสร้างการวางแผน")} tk={tk} />
            <div style={{
              borderRadius: 20, overflow: "hidden",
              border: `1.5px solid ${tk.imgCardBorder}`,
              boxShadow: tk.imgCardShadow, background: tk.imgCardBg,
              opacity: planVisible ? 1 : 0, transform: planVisible ? "none" : "translateY(20px)",
              transition: "opacity .7s ease,transform .7s cubic-bezier(.22,.68,0,1.2)",
              backdropFilter: "blur(12px)",
            }}>
              <div style={{
                padding: "12px 20px", borderBottom: `1px solid ${tk.imgCardBorder}`,
                display: "flex", alignItems: "center", gap: 10,
                background: isDark ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.60)"
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ef4444", "#fbbf24", "#34d399"].map((c, i) =>
                    <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
                </div>
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 10,
                  color: tk.sectionColor, letterSpacing: ".14em", fontWeight: 700,
                  transition: "color .5s"
                }}>
                  ABCat Shop — {t("Planning Structure & AI Smart Sizing", "โครงสร้าง & AI Smart Sizing")}
                </span>
                <div style={{ marginLeft: "auto" }}>
                  <span style={{
                    padding: "2px 10px", borderRadius: 999,
                    background: tk.imgTagBg, border: `1px solid ${tk.imgCardBorder}`,
                    fontSize: 9, color: tk.imgTag, fontFamily: "'Space Mono',monospace",
                    letterSpacing: ".16em", fontWeight: 700
                  }}>ARCHITECTURE</span>
                </div>
              </div>
              <div style={{ position: "relative", backgroundColor: isDark ? "#0a0814" : "#f8f9f8" }}>
                {!imgLoaded && (
                  <div style={{
                    height: 300, display: "flex", alignItems: "center", justifyContent: "center",
                    color: tk.sectionColor, fontFamily: "'Space Mono',monospace",
                    fontSize: 11, letterSpacing: ".14em", gap: 8
                  }}>
                    <span style={{ animation: "fpDotPulse 1s ease-in-out infinite" }}>◈</span>
                    {t("LOADING ARCHITECTURE...", "กำลังโหลด...")}
                    <span style={{ animation: "fpDotPulse 1s .3s ease-in-out infinite" }}>◈</span>
                  </div>
                )}
                <img src={ABCSHOP.planningImg} alt="ABCat Shop Planning Structure"
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    width: "100%", display: "block", objectFit: "contain",
                    opacity: imgLoaded ? 1 : 0, transition: "opacity .5s ease",
                    animation: imgLoaded ? "fpImgIn .6s ease both" : "none"
                  }} />
              </div>
              <div style={{
                padding: "16px 24px", borderTop: `1px solid ${tk.imgCardBorder}`,
                background: isDark ? "rgba(0,0,0,0.30)" : "rgba(255,255,255,0.70)"
              }}>
                <p style={{
                  fontFamily: "'Sarabun',sans-serif", fontSize: 12,
                  color: tk.imgCaption, lineHeight: 1.7, margin: 0, transition: "color .5s"
                }}>
                  <strong style={{ color: tk.sectionColor, fontWeight: 700 }}>
                    {t("Architecture Overview:", "สถาปัตยกรรมระบบ:")}
                  </strong>{" "}
                  {t(
                    "Flutter (Frontend) · FastAPI + Python (Backend & AI) · PostgreSQL + Cloudinary · Firebase (Auth) · Jenkins (CI/CD) · Render (Deploy) · OpenAI GPT-4.1 mini + Gemini 2.5 Flash for cat detection & analysis.",
                    "Flutter · FastAPI + Python · PostgreSQL + Cloudinary · Firebase · Jenkins + Render และ OpenAI GPT-4.1 mini + Gemini 2.5 Flash สำหรับ Detect & Analysis แมว"
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* TIMELINE */}
          <div style={{ marginTop: isMobile ? 52 : 76 }}>
            <SectionHeader icon="🗓" label={t(`TIMELINE · ${ABCSHOP.name}`, `ไทม์ไลน์ · ${ABCSHOP.name}`)} tk={tk} />
            <div style={{ position: "relative" }}>
              {!isMobile && (
                <div style={{
                  position: "absolute", left: "50%", top: 28, bottom: 28,
                  width: 2, transform: "translateX(-50%)",
                  background: `linear-gradient(180deg,${(isDark ? MONTH_COLORS_MOON : MONTH_COLORS_SUN).map(m => m.color + "55").join(",")})`,

                  animation: "fpLineGrow 1.2s ease both", zIndex: 1,
                }} />
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 0 : 32 }}>
                {ABCSHOP.months.map((item, i) => (
                  <TimelineItem key={i} item={item} mc={(isDark ? MONTH_COLORS_MOON : MONTH_COLORS_SUN)[i]}
                    index={i} isMobile={isMobile}
                    isLast={i === ABCSHOP.months.length - 1}
                    lang={lang} tk={tk} />
                ))}
              </div>
            </div>
          </div>

          {/* TECH STACK */}
          <div ref={techRef} style={{ marginTop: isMobile ? 52 : 76 }}>
            <SectionHeader icon="⚙" label={t("TECH STACK", "เทคโนโลยีที่ใช้")} tk={tk} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 8 : 12, justifyContent: "center" }}>
              {ABCSHOP.tech.map((tech, i) => (
                <div key={i} style={{
                  padding: isMobile ? "7px 13px" : "9px 17px", borderRadius: 999,
                  background: `${tech.color}12`, border: `1.5px solid ${tech.color}44`,
                  backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: 7,
                  animation: techVisible ? `fpTechReveal .5s ${i * .045}s ease both` : "none",
                  opacity: techVisible ? 1 : 0,
                }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%", background: tech.color,
                    boxShadow: `0 0 8px ${tech.color}`, flexShrink: 0
                  }} />
                  <span style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: isMobile ? 10 : 11, color: tech.color,
                    fontWeight: 700, letterSpacing: ".08em"
                  }}>{tech.label}</span>
                  <span style={{
                    fontSize: 9, color: tk.techCat,
                    fontFamily: "'Space Mono',monospace", letterSpacing: ".1em",
                    textTransform: "uppercase", transition: "color .5s"
                  }}>{tech.cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* LANG TOGGLE */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: isMobile ? 48 : 64 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,transparent,${tk.eyebrowLine})` }} />
                <span style={{
                  fontFamily: "'Space Mono',monospace", fontSize: 9,
                  letterSpacing: ".22em", color: isDark ? "rgba(167,139,250,0.38)" : "rgba(45,106,79,0.35)"
                }}>
                  LANGUAGE</span>
                <div style={{ height: 1, width: 60, background: `linear-gradient(90deg,${tk.eyebrowLine},transparent)` }} />
              </div>
              <LangToggle lang={lang} setLang={switchLang} tk={tk} />
              <p style={{
                fontFamily: "'Space Mono',monospace", fontSize: 9, letterSpacing: ".16em",
                color: isDark ? "rgba(167,139,250,0.32)" : "rgba(45,106,79,0.30)", margin: 0
              }}>
                {lang === "TH" ? "กำลังแสดง: ภาษาไทย" : "Currently showing: English"}
              </p>
            </div>
          </div>

        </div>

        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
          background: tk.bottomFade, pointerEvents: "none", transition: "background .5s"
        }} />
      </section>
    </>
  );
}